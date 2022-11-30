const headReg = /(\w+ \w+) bags contain/;
const containsReg = /(\d+) (\w+ \w+) bags?/g;

exports.split = true;
exports.solve1 = function (input) {
    let rules = [];
    for (let r of input) {
        let rule = {};
        rule.color = headReg.exec(r)[1];
        rule.children = [];
        let contains;
        while ((contains = containsReg.exec(r)) != null) {
            rule.children.push(contains[2]);
        }
        rules.push(rule);
    }

    let canContainGold = [];
    let q = ['shiny gold'];
    while (q.length != 0) {
        let search = q.pop();
        for (let rule of rules) {
            if (
                rule.children.includes(search) &&
                !canContainGold.includes(rule.color)
            ) {
                canContainGold.push(rule.color);
                q.push(rule.color);
            }
        }
    }

    console.log(canContainGold.length);
};

exports.solve2 = function (input) {
    let rules = [];
    for (let r of input) {
        let rule = {};
        rule.color = headReg.exec(r)[1];
        rule.children = [];
        let contains;
        while ((contains = containsReg.exec(r)) != null) {
            rule.children.push({
                color: contains[2],
                amount: Number(contains[1]),
            });
        }
        rules.push(rule);
    }

    console.log(numBagsRecursive('shiny gold', rules) - 1); // ???
};

function numBagsRecursive(color, rules) {
    for (let rule of rules) {
        if (rule.color == color) {
            let amount = 1;
            for (let c of rule.children) {
                amount += c.amount * numBagsRecursive(c.color, rules);
            }
            return amount;
        }
    }
}
