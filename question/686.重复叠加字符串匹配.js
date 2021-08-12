/*



 * @lc app=leetcode.cn id=686 lang=javascript
 *
 * [686] 重复叠加字符串匹配
 */
// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
 var repeatedStringMatch = function (a, b) {
    // 字符串相同
    if (a.indexOf(b) > -1) {
        return 1
    }
    let str = ''
    let count = 0
    while (true) {
        // 未在叠加后的字符串找到
        if (str.indexOf(b) < 0) {
            str += a
            count++
        } else {
            // 在叠加后的字符串找到
            break
        }
        // 叠加太长无意义
        if (count > 10000) {
            count = -1
            break
        }
    }
    return count
};
// @lc code=end
console.log(repeatedStringMatch("aaaaaaaaaaaaaaaaaaaaaab", "ba"))