/*



 * @lc app=leetcode.cn id=657 lang=javascript
 *
 * [657] 机器人能否返回原点
 */
// @lc code=start
/**
 * @param {string} moves
 * @return {boolean}
 */
 var judgeCircle = function (moves) {
    let obj = {
        R: 1,
        L: -1,
        U: 20,
        D: -20
    }
    let arr = moves.split('')
    let res = 0
    for (let i = 0; i < arr.length; i++) {
        res += obj[arr[i]]
    }
    return res === 0 ? true : false
};
// @lc code=end
console.log(judgeCircle("LL"))