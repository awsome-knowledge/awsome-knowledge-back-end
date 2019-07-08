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
    if (x > 0) {
        let arr = x.split('')
        arr.reverse()
        let str = arr.join('')
        return str
    } else {
        let arr = x.replace('-', '').split('')
        arr.reverse()
        let str = arr.join('')
        return '-' + str
    }
};

