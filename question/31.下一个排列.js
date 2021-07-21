/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    // 定义下标，默认倒数第二个数，给最后一个数空间
    let i = nums.length - 2
    // 循环判断下标是否小于0，是否小于后边的数
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        // 否则i往前走
        i--
    }
    if (i >= 0) {
        let j = nums.length - 1
        // 循环从最后面开始判断，后面的值大于nums[i]
        while (j >= 0 && nums[j] <= nums[i]) {
            // 否则j往前走
            j--
        }
        // 找到后，交换两者，大的在前,实现变大
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    //如果 i = -1，说明是递减排列，如[3,2,1],没有下一排列，反转那么返回[1,2,3]
    let l = i + 1
    let r = nums.length - 1
    while (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]]
        l++
        r--
    }
    return nums
};
// @lc code=end

console.log(nextPermutation([3, 2, 1]))