/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
    let arr = s.split('')
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1)
        } else {
            map.set(arr[i], 1)
        }
    }
    let find = []
    for ([key, val] of map) {
        if (val === 1) {
            find.push(key)
        }
    }
    let index = find.length > 0 ? arr.length : -1
    if(index!==-1){
        for (let j = 0; j < find.length; j++) {
            index = Math.min(index, arr.findIndex(a => a === find[j]))
        }
    }
    return index
};
// @lc code=end
console.log(firstUniqChar("leetcode"))