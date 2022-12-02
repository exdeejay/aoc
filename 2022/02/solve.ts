export function solve1(input: string) {
    let lines = input.split('\n');
    let score = 0;
    for (let line of lines) {
        if (line == '') {
            continue;
        }
        let [first, second] = line.split(' ');
        let firstChoice = ['A', 'B', 'C'].indexOf(first);
        let secondChoice = ['X', 'Y', 'Z'].indexOf(second);
        score += secondChoice + 1;
        if (firstChoice === secondChoice) {
            score += 3;
        } else if ((firstChoice + 1) % 3 === secondChoice) {
            score += 6;
        }
    }

    console.log(score);
    
}

export function solve2(input: string) {
    let lines = input.split('\n');
    let score = 0;
    for (let line of lines) {
        if (line == '') {
            continue;
        }
        let [first, second] = line.split(' ');
        let firstChoice = ['A', 'B', 'C'].indexOf(first);
        let outcome = ['X', 'Y', 'Z'].indexOf(second);
        switch (outcome) {
            case 0:
                score += ((firstChoice + 2) % 3) + 1;
                score += 0;
                break;
            case 1:
                score += firstChoice + 1;
                score += 3;
                break;
            case 2:
                score += ((firstChoice + 1) % 3) + 1;
                score += 6;
                break;
        }
    }

    console.log(score);
    
}
