/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (nums.indexOf(target) >= 0) {
        return nums.indexOf(target)
    }
    nums.push(target)
    return nums.sort(function(a,b){
        return a-b
    }).indexOf(target)
};