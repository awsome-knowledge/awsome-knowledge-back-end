/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    let arr = nums1.concat(nums2)
    arr.sort((a, b) => a - b)
    let len = arr.length, mid = Math.floor(len / 2)
    if (len % 2 === 0) {
        // 长度为偶数
        return (arr[mid - 1] + arr[mid]) / 2
    } else {
        return arr[mid]
        // 长度为奇数
    }
};
// @lc code=end
console.log(findMedianSortedArrays([2], []))
