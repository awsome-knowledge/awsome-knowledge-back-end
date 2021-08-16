/*
 * @lc app=leetcode.cn id=1047 lang=javascript
 *
 * [1047] 删除字符串中的所有相邻重复项
 */
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
 var removeDuplicates = function (s) {
    let arr = s.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
            arr.splice(i, 1)
            arr.splice(i, 1)
        }
    }
    for (let i = arr.length; i >= 0; i--) {
        if (arr[i] === arr[i - 1]) {
            arr.splice(i, 1)
            arr.splice(i - 1, 1)
        }
    }
    return arr.join('')
};
// @lc code=end
console.log(removeDuplicates("abbbbaaaca"))