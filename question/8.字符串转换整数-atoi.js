/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */
/**
 * @param {string} str
 * @return {number}
 */
// Math.min() 返回零个或更多个数值的最小值。
// Math.max() 返回零个或更多个数值的最大值。
var myAtoi = function (str) {
    let intStr = parseInt(str) || 0
    let minStr = Math.min(intStr, 2147483647)
    return Math.max(minStr, -2147483648)
};