/*
 * @lc app=leetcode.cn id=1662 lang=javascript
 *
 * [1662] 检查两个字符串数组是否相等
 */

// @lc code=start
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
 var arrayStringsAreEqual = function (word1, word2) {
    let str1 = word1.join('')
    let str2 = word2.join('')
    return str1 === str2 ? true : false
};
// @lc code=end
console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"]))