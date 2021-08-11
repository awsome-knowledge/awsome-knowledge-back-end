/*
 * @lc app=leetcode.cn id=1929 lang=javascript
 *
 * [1929] 数组串联
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var getConcatenation = function (nums) {
    return nums.concat(nums)
};
// @lc code=end
console.log(getConcatenation([1,2,1]))
// @lc code=end

