/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 报数
 */
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let start = '1',
        result = '',
        tmp = 1
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < start.length; j++) {
            if (start[j] !== start[j + 1] || j == start.length - 1) {
                result +=tmp +  start[j]
                tmp = 1
            } else {
                tmp += 1
            }
        }
        start = result
        result = ''
    }
    return start
};
