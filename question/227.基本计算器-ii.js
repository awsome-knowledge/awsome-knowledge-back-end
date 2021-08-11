/*
 * @lc app=leetcode.cn id=227 lang=javascript
 *
 * [227] 基本计算器 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function (s) {
    return Math.floor(eval(s)) 
};
// @lc code=end
console.log(calculate(" 3/2 "))