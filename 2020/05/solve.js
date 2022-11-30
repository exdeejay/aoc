exports.split = true;
exports.solve1 = function (input) {
    let highest = -1;
    for (let s of input) {
        let row = s.slice(0, 7);
        row = row.replace(/F/g, '0').replace(/B/g, '1');
        row = parseInt(row, 2);
        let col = s.slice(7);
        col = col.replace(/L/g, '0').replace(/R/g, '1');
        col = parseInt(col, 2);

        let id = row * 8 + col;
        if (id > highest) {
            highest = id;
        }
    }

    console.log(highest);
};

exports.solve2 = function (input) {
    input
        .map((s) => parseInt(s.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2))
        .sort((a, b) => a - b)
        .forEach((val, i, arr) => {
            if (i != 0 && arr[i + 1] - val == 2) {
                console.log(val + 1);
            }
        });
};
