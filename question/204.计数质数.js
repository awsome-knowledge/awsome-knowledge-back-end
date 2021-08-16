/*
 * @lc app=leetcode.cn id=204 lang=javascript
 *
 * [204] 计数质数
 */
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    let arr = [], count = 0
    for (let i = 0; i < n + 1; i++) {
        arr[i] = true // 标记初始化
    }
    for (let i = 2; i < n; i++) {
        if (arr[i]) { // 如果i是质数
            // 将质数的倍数删除
            for (let j = i + i; j < n; j = j + i) {
                arr[j] = false // i的n倍数肯定不是质数
            }
            count++
        }
    }
    return count
};
// @lc code=end
console.log(countPrimes(499979))