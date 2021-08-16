/*
 * @lc app=leetcode.cn id=172 lang=javascript
 *
 * [172] 阶乘后的零
 */
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

//  解题思路
//  凑结尾是0，那么就是 2 *5 这种，或者 4 * 5都可以的，主要是找5，
//  比如输入20，简化为 （5、10、15、20）, 就是这样，不停的可以被5整除的数，
//  但是像25这种，可以产生2个0，125可以产生3个0
 
var trailingZeroes = function (n) {
    let r = 0
    while (n > 1) {
        n = parseInt(n / 5)
        r += n  
    }
    return r
};
// @lc code=end
console.log(trailingZeroes(125))