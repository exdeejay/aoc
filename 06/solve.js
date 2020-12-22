exports.solve1 = function (input) {
    let groups = input.split('\n\n');
    let unique = 0;
    for (let g of groups) {
        let encountered = [];
        for (let c of g) {
            if (c != '\n' && !encountered.includes(c)) {
                unique++;
                encountered.push(c);
            }
        }
    }

    console.log(unique);
};

exports.solve2 = function (input) {
    let groups = input.split('\n\n');
    let unique = 0;
    for (let g of groups) {
        let people = g.split('\n');
        let possible = Array.from(people[0]);
        for (let j = 0; j < possible.length; j++) {
            for (let i = 1; i < people.length; i++) {
                if (people[i] != '' && !people[i].includes(possible[j])) {
                    possible.splice(j, 1);
                    j--;
                    break;
                }
            }
        }

        unique += possible.length;
    }

    console.log(unique);
};
