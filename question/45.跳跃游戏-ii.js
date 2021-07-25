/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    // 单步最大搜索长度
    let maxReach = 0;
    // 跳跃步数
    let step = 0;
    // 最远距离
    let end = 0;
    // 遍历数组
    for (let i = 0; i < nums.length - 1; i++) {
        // 单步最远距离=当前位置的值+下标
        maxReach = Math.max(maxReach, nums[i] + i);
        // console.log('maxReach====', maxReach)
        // console.log('i====', i)
        // 如果下标等于最远距离，往前再跳一个，步数+1
        if (i === end) {
            step++;
            end = maxReach;
            // console.log('end====', end)
        }
    }

    return step;
};
// @lc code=end
console.log(jump([2, 3, 0, 1, 4]))
