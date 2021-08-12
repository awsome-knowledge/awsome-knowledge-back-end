/*



 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function (s) {
    let arr = s.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('').reverse().join('')
    }
    return arr.join(' ')
};
// @lc code=end
console.log(reverseWords("Let's take LeetCode contest"))