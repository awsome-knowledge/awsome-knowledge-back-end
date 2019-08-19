/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    nums1.splice(m)
    nums2.splice(n)
    for (let i in nums2) {
        nums1.splice(m + i, 0, nums2[i])
    }
    return nums1.sort((a, b) => {
        return a - b
    })
};