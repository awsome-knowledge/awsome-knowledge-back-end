/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length === 0) {
        return ''
    }
    return strs.reduce((former, latter) => {
        let i = 0

        while (former[i] && latter[i] && former[i] === latter[i]) {
            i++
        }
        return former.slice(0, i)

    })
};