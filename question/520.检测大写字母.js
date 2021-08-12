/*



 * @lc app=leetcode.cn id=520 lang=javascript
 *
 * [520] 检测大写字母
 */
// @lc code=start
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    let arr = word.split('')
    let res = arr.filter(a => {
        if (a.toLocaleUpperCase() === a) {
            return a
        }
    })
    // 单词中所有字母都不是大写
    // 首字母大写
    // 全部字母都是大写
    return res.length === 0 || res.length === 1 && word[0].toLocaleUpperCase() === word[0] || word.length === res.length ? true : false
};
// @lc code=end
console.log(detectCapitalUse("FG"))