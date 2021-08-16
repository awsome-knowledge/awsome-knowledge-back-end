/*
 * @lc app=leetcode.cn id=224 lang=javascript
 *
 * [224] 基本计算器
 */
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function (s) {
    return eval(s)
};
// @lc code=end
console.log(calculate("(1+(4+5+2)-3)+(6+8)"))