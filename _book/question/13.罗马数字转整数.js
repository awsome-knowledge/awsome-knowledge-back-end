/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var arrRoman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    var arrInt = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    var res = 0
    var arrRes = []
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < arrRoman.length; j++) {
            if (s[i] === arrRoman[j]) {
                res += arrInt[j]
                arrRes.push(arrInt[j])
            }
        }
    }
    for (let i = 0; i < arrRes.length; i++) {
        if (arrRes[i] < arrRes[i + 1]) {
            res -= 2 * arrRes[i]
        }
    }
    return res
};
