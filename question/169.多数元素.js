/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function (nums) {
    // map对象
    const len = nums.length
    let map = new Map()
    // 遍历存储各个数字出现的次数
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            map.set(nums[i], 1)
        }
    }
    // 遍历map找出数字
    for (let [key, value] of map) {
        if (value > len / 2) {
            return key
        }
    }
};
// @lc code=end

