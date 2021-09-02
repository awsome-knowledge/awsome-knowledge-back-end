/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */
/**
 * @param {number} x
 * @return {number}
 */
// 在JavaScript中模拟溢出真的有意义吗?JS中没有int。Number类型是浮点类型。如果必须模拟溢出，“整数”单元格大小应该定义为任务中的某个值，例如双单词。
var reverse = function (x) {
    // if (x > 0) {
    //     let arr = x.split('')
    //     arr.reverse()
    //     let str = arr.join('')
    //     return str
    // } else {
    //     let arr = x.replace('-', '').split('')
    //     arr.reverse()
    //     let str = arr.join('')
    //     return '-' + str
    // }
    // ~~按位取反再取反
    let res = 0
    while (x !== 0) {
        // 取余数
        let digit = x % 10
        console.log('digit', digit)
        // 取反再取反
        x = ~~(x / 10)
        console.log('x', x)
        // 余数乘以10加上除数
        res = res * 10 + digit
        // 超出32位的有符号整数的范围返回0
        if (res < Math.pow(-2, 31) || res > Math.pow(2, 31) - 1) {
            return 0
        }
    }
    return res
};
console.log(reverse(123))
