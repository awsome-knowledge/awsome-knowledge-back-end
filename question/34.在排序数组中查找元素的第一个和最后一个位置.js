/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let arr=[]
    let left=nums.indexOf(target)
    let right=nums.lastIndexOf(target)
    arr.push(left)
    arr.push(right)
    return arr
};
