/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */
// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    // n=0直接返回1
    if (n === 0) return 1
    //n<0时 x的n次方等于1除以x的-n次方
    if (n < 0) {
        return 1 / myPow(x, -n)
    }
    //n是奇数时 x的n次方 = x*x的n-1次方
    if (n % 2) {
        return x * myPow(x, n - 1)
    }
    return myPow(x * x, n / 2) //n是偶数，使用分治，一分为二，等于x*x的n/2次方 
}

// 使用二分法

// 1. 问题分析
// 分：将2^n转为 (2^ 2/n) * (2^ 2/n)
// 解：求2^2/n
// 合：(2^ 2/n) * (2^ 2/n)

// 递归
// @lc code=end
console.log(myPow(2.00000, -2))