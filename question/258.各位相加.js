/*
 * @lc app=leetcode.cn id=258 lang=javascript
 *
 * [258] 各位相加
 */
// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
 var addDigits = function (num) {
    let str = num.toString()
    let sum = 0
    // 终止条件：结果为一位数返回
    if (str.length === 1) {
        return Number(str)
    }
    // 累计和
    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i])
    }
    // 递归
    return addDigits(sum)
};
// @lc code=end
console.log(addDigits(40))