const fs = require('fs');
const https = require('https');
const { argv, exit } = require('process');

function printUsage() {
    console.log('Usage: node . <day number>');
}

function pad(number, length) {
    let str = String(number);
    while (str.length != length) {
        str = '0' + str;
    }
    return str;
}

async function fetchInput(day) {
    let path = `./${day}/input.txt`;
    if (!fs.existsSync(path)) {
        let strippedDay = parseInt(day);
        let resp = await new Promise((resolve) => {
            https.get(
                `https://adventofcode.com/2020/day/${strippedDay}/input`,
                {
                    headers: {
                        cookie:
                            'session=53616c7465645f5f061041a9df5946441a7288f76a921252a48fcb1dea56c5140fd7e3dacbe7fe6b16b1afbfa1654016',
                    },
                },
                (res) => {
                    let data = '';
                    res.on('data', (chunk) => (data += chunk));
                    res.on('end', () => resolve(data));
                }
            );
        });
        fs.writeFileSync(path, resp);
    }
}

async function main() {
    if (argv.length != 3) {
        printUsage();
        exit(0);
    }

    let padded = pad(argv[2], 2);
    try {
        await fetchInput(padded);
    } catch (err) {
        console.error('Could not fetch input, please manually download');
    }
    let solver = require(`./${padded}/solve`);
    let input = fs.readFileSync(`./${padded}/input.txt`, 'utf8');
    if ('split' in solver && solver.split == true) {
        input = input.split('\n');
    }
    try {
        if ('solve1' in solver) {
            console.log('Running solve1...');
            solver.solve1(input);
        }
        if ('solve2' in solver) {
            console.log('Running solve2...');
            solver.solve2(input);
        }
    } catch (err) {
        console.error('Encountered error while running solution:');
        console.error(err);
    }
}

main();
