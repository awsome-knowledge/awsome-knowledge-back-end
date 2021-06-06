/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    const n = nums1.length + nums2.length
    console.log(n)
    const arr = nums1.concat(nums2).sort((a, b) => a - b )
    console.log(arr)
    if (n % 2 == 0) {
        // 偶数
        return (arr[n / 2] + arr[n / 2 - 1]) / 2
    } else {
        // 奇数
        return arr[Math.floor(n / 2)]
    }
};


// @lc code=end

// const a =[1,3]
// const b=[2]
// console.log(findMedianSortedArrays(a,b))