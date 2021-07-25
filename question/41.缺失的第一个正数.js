/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // 1.从小到大排序 
    nums.sort((a, b) => a - b)
    // 2.去重
    nums = [...new Set(nums)]
    // 3.过滤正整数
    nums = nums.filter(n => n > 0)
    // 4.空数组返回1
    if (nums.length === 0) {
        return 1
    }
    // 5.遍历数组长度，判断下标是否等于该位置上的数值，若不等于就返回下标
    for (let i = 0; i < nums.length; i++) {
        if (i + 1 !== nums[i]) {
            return i + 1
        }
    }
    // 6.没找到，则返回数组中最大值+1，也就是数组长度+1
    // return Math.max(...nums) + 1
    return nums.length + 1
};
// @lc code=end

console.log(firstMissingPositive([0, 2, 2, 1, 1]))