const regex = /(\d+)-(\d+) (\w): (.*)/;

function xor(a, b) {
    return (a || b) && !(a && b);
}

function countChars(input, char) {
    let sum = 0;
    for (let c of input) {
        if (c == char) {
            sum++;
        }
    }
    return sum;
}

exports.split = true;
exports.solve1 = function (input) {
    let valid = 0;
    for (let i = 0; i < input.length; i++) {
        let matches = input[i].match(regex);
        let numChars = countChars(matches[4], matches[3]);
        if (numChars >= matches[1] && numChars <= matches[2]) {
            valid++;
        }
    }
    console.log(valid);
};

exports.solve2 = function (input) {
    let valid = 0;
    for (let i = 0; i < input.length; i++) {
        let matches = input[i].match(regex);
        let [_, pos1, pos2, char, pass] = matches;
        if (xor(pass[pos1 - 1] == char, pass[pos2 - 1] == char)) {
            valid++;
        }
    }
    console.log(valid);
};
