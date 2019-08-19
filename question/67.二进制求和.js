/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    a = a.split('').reverse().join('')
    b = b.split('').reverse().join('')
    let length = a.length > b.length ? a.length : b.length
    let res = []
    for (let i = 0; i < length; i++) {
        numa = Number(a[i] || 0)
        numb = Number(b[i] || 0)

        let current = Number(res[i] || 0) + numa + numb
        if (current >= 2) {
            res[i] = current % 2
            res.push(1)
        } else {
            res[i] = current
        }
    }
    return res.reverse().join('')
};