const regex = /(\w+):(\S+)/g;

exports.solve1 = function (input) {
    let required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let passports = input.split('\n\n');

    let valid = 0;
    for (let ppt of passports) {
        let found = Array(required.length).fill(0);
        let match;
        let index;
        while ((match = regex.exec(ppt)) !== null) {
            let id = match[1];
            index = required.indexOf(id);
            if (index != -1) {
                found[index] = 1;
            }
        }

        if (found.reduce((a, b) => a + b) == required.length) {
            valid++;
        }
    }

    console.log(valid);
};

const yrReg = /^\d{4}$/;
const hgtReg = /^(\d+)(cm|in)$/;
const hclReg = /^#[0-9a-f]{6}$/;
const eclReg = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
const pidReg = /^\d{9}$/;
exports.solve2 = function (input) {
    let required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let passports = input.split('\n\n');

    let valid = 0;
    for (let ppt of passports) {
        let found = Array(required.length).fill(0);
        let match;
        while ((match = regex.exec(ppt)) !== null) {
            let id = match[1];
            let val = match[2];
            let index = required.indexOf(id);
            if (index != -1) {
                let years, reg;
                switch (id) {
                    case 'byr':
                        years = [1920, 2002];
                    case 'iyr':
                        years = years || [2010, 2020];
                    case 'eyr':
                        years = years || [2020, 2030];
                        if (!yrReg.test(val)) {
                            continue;
                        }
                        let year = parseInt(val);
                        if (val < years[0] || val > years[1]) {
                            continue;
                        }
                        break;

                    case 'hgt':
                        let arr = val.match(hgtReg);
                        if (arr == null) {
                            continue;
                        }
                        let height = parseInt(arr[1]);
                        if (arr[2] == 'cm' && (height < 150 || height > 193)) {
                            continue;
                        }
                        if (arr[2] == 'in' && (height < 59 || height > 76)) {
                            continue;
                        }
                        break;

                    case 'hcl':
                        reg = hclReg;
                    case 'ecl':
                        reg = reg || eclReg;
                    case 'pid':
                        reg = reg || pidReg;
                        if (!reg.test(val)) {
                            continue;
                        }
                        break;
                }
                found[index] = 1;
            }
        }

        if (found.reduce((a, b) => a + b) == required.length) {
            valid++;
        }
    }

    console.log(valid);
};
