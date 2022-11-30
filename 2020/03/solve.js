/**
 * @param {string[]} grid
 * @param {number} dx
 * @param {number} dy
 */
function solveForSlope(grid, dx, dy) {
    let x = dx;
    let y = dy;
    let trees = 0;
    while (y < grid.length) {
        if (grid[y][x % grid[0].length] == '#') {
            trees++;
        }
        x += dx;
        y += dy;
    }
    return trees;
}

exports.split = true;
exports.solve1 = function (input) {
    console.log(solveForSlope(input, 3, 1));
};

exports.solve2 = function (input) {
    console.log(
        `${
            solveForSlope(input, 1, 1) *
            solveForSlope(input, 3, 1) *
            solveForSlope(input, 5, 1) *
            solveForSlope(input, 7, 1) *
            solveForSlope(input, 1, 2)
        }`
    );
};
