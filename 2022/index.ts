import * as fs from 'node:fs/promises';
import * as https from 'node:https';
import { argv, exit, env } from 'process';

async function fetchInput(day: number) {
    let path = `${String(day).padStart(2, '0')}/input.txt`;
    try {
        return await fs.readFile(path, 'utf8')
    } catch (err) {
        if (env['AOC_SESSION'] === undefined) {
            throw new Error('AOC_SESSION environment variable not defined, cannot download input!')
        }
        let content = await new Promise<string>((resolve, reject) => {
            https.get(
                `https://adventofcode.com/2022/day/${day}/input`,
                {
                    headers: {
                        'User-Agent': 'https://github.com/exdeejay/aoc - DJ#4623 on discord',
                        'Cookie': `session=${env['AOC_SESSION']}`,
                    },
                },
                (res) => {
                    if (res.statusCode !== 200) {
                        reject(res.statusCode);
                    }
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => resolve(data));
                }
            );
        });
        await fs.writeFile(path, content);
        return content;
    }
}

interface Solver {
    solve1: (input: string) => void;
    solve2?: (input: string) => void;
}

const defaultSolver = `function solve1(input: string) {
    let lines = input.split('\\n');
}
`;

async function fetchOrCreateSolver(day: number): Promise<Solver> {
    let path = `./${String(day).padStart(2, '0')}/solve.ts`;
    try {
        await fs.stat(path);
    } catch (err) {
        await fs.writeFile(path, defaultSolver);
        console.log(`Solve file created at ${path}, good luck!`);
        exit(0);
    }
    return require(path.slice(0, path.length - 3));
}

async function main() {
    let day;
    if (argv.length == 2) {
        day = new Date().getDate();
    } else if (argv.length == 3) {
        day = parseInt(argv[2]);
        if (isNaN(day) || day < 1 || day > 31) {
            console.log('Invalid day! Please enter a number between 1 and 31');
            exit(1);
        }
    } else {
        console.log('Usage: node . [day number]');
        exit(0);
    }

    let path = `${String(day).padStart(2, '0')}/`;
    try {
        await fs.stat(path);
    } catch (err) {
        await fs.mkdir(path);
    }

    console.log(`Fetching input for day ${day}...`);
    let input = await fetchInput(day);
    console.log(`Fetching solver for day ${day}...`);
    let solver = await fetchOrCreateSolver(day);

    try {
        console.log('Running solve1...');
        solver.solve1(input);
        if (solver.solve2 !== undefined) {
            console.log('Running solve2...');
            solver.solve2(input);
        }
    } catch (err) {
        console.error('Encountered error while running solution:');
        console.error(err);
    }
}

main();
