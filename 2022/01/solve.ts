export function solve1(input: string) {
    let lines = input.split('\n');
    let max = 0;
    let current = 0;
    for (let line of lines) {
        if (isNaN(parseInt(line))) {
            max = Math.max(max, current);
            current = 0;
        } else {
            current += parseInt(line);
        }
    }
    console.log(max);
}

export function solve2(input: string) {
    let lines = input.split('\n');
    let all = [];
    let current = 0;
    for (let line of lines) {
        if (isNaN(parseInt(line))) {
            all.push(current);
            current = 0;
        } else {
            current += parseInt(line);
        }
    }
    console.log(all.sort((a, b) => a - b).slice(-3).reduce((prev, cur) => prev + cur));
}
