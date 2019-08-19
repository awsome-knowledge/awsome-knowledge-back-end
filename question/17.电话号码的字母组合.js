/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    var map = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"]
    };
    var arr = map[digits[0]];
    digits = digits.substr(1);
    digits.split("").forEach((digit) => {
        let t = [];
        map[digit].forEach((letter) => {
            t = t.concat(arr.map((item) => {
                return item + letter;
            }));
        });
        arr = t;
    });
    return arr === undefined ? [] : arr;
};