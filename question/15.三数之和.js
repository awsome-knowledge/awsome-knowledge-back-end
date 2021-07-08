/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let arr = []
    for (let i = 0; i < nums.length-2; i++) {
        for (let j = i + 1; j < nums.length-1; j++) {
            for (let x = j + 1; x < nums.length; x++) {
                if ((nums[i] + nums[j] + nums[x])===0) {
                    arr.push([nums[i], nums[j], nums[x]])
                }
            }
        }
    }
    return arr
};

