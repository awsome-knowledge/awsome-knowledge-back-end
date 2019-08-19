/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let max=-Number.MAX_VALUE
    let sum=0

    for(let i of nums){
        if(sum<0){
            sum=0
        }
        sum+=i
        max=Math.max(max,sum)
    }
    return max
};
