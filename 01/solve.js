exports.split = true;
exports.solve1 = function (input) {
    let nums = input.map((val) => Number(val));
    console.log('Checking for numbers that sum to 2020...');
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == 2020) {
                console.log(
                    `Found a match! ${i}:${nums[i]}, ${j}:${
                        nums[j]
                    }, product: ${nums[i] * nums[j]}`
                );
                return;
            }
        }
    }
};

exports.solve2 = function (input) {
    let nums = input.map((val) => Number(val));
    console.log('Checking for numbers that sum to 2020...');
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 2020) {
                    console.log(
                        `Found a match! product: ${nums[i] * nums[j] * nums[k]}`
                    );
                    return;
                }
            }
        }
    }
};
