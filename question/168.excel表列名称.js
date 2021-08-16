/*
 * @lc app=leetcode.cn id=168 lang=javascript
 *
 * [168] Excel表列名称
 */
// @lc code=start
/**
 * @param {number} columnNumber
 * @return {string}
 */
 var convertToTitle = function (columnNumber) {
    let S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let res = ''
    while (columnNumber > 0) {
        // 余数
        let mod = (columnNumber - 1) % 26
        // 循环取
        columnNumber = Math.floor((columnNumber - 1) / 26)
        res = S[mod] + res
    }
    return res
};
// @lc code=end
console.log(convertToTitle(701))