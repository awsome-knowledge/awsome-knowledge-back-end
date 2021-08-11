/*
 * @lc app=leetcode.cn id=1822 lang=javascript
 *
 * [1822] 数组元素积的符号
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 var arraySign = function (nums) {
    let product = nums.reduce((a, b) => a * b)
    return product > 0 ? 1 : (product < 0 ? -1 : 0)
};
// @lc code=end
console.log(arraySign( [-1,1,-1,1,-1]))