/*



 * @lc app=leetcode.cn id=434 lang=javascript
 *
 * [434] 字符串中的单词数
 */
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
    let arr = s.split(' ')
    arr = arr.filter(a => a)
    return arr.length
};
// @lc code=end
console.log(countSegments("                "))
