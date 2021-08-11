/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 翻转字符串里的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function (s) {
    let arr = []
    s.split(' ').map(a => {
        if (a) {
            arr.push(a)
        }
    })
    return arr.reverse().join(' ')
};
// @lc code=end
console.log(reverseWords("  Bob    Loves  Alice   "))