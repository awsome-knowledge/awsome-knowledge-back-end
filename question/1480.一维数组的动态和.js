/*
 * @lc app=leetcode.cn id=1480 lang=javascript
 *
 * [1480] 一维数组的动态和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// map 该方法创建一个新数组，是该数组中每个元素调用依次提供的函数后的返回值。
// 该方法不改变原数组，该方法有返回值
// forEach 该方法没有返回值，其余可以说和map相似
var runningSum = function (nums) {
    let res = nums.map((n, index) => {
        let sum = n
        for (let i = 0; i < index; i++) {
            sum += nums[i]
        }
        return sum
    })
    return res
};
// @lc code=end
console.log(runningSum([1, 2, 3, 4]))
// @lc code=end

