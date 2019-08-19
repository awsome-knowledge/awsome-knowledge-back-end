/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    x = Number(x)
    let left = 1,
        right = Math.floor((x / 2)) + 1,
        mid = 0
    while (left <= right) {
        mid = Math.floor((left + right) / 2)

        if (mid * mid > x) {
            right = mid - 1
        } else if (mid * mid < x) {
            left += 1
        } else {
            return mid
        }
    }
    return right
};