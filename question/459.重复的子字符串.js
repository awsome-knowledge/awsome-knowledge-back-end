/*



 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */
// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
 var repeatedSubstringPattern = function (s) {
    let str = s + s
    let res = str.slice(1, -1)
    let index = res.indexOf(s)
    return index>=0
};
// @lc code=end
console.log(repeatedSubstringPattern("aaaa"))