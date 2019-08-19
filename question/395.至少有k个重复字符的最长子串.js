/*
 * @lc app=leetcode.cn id=395 lang=javascript
 *
 * [395] 至少有K个重复字符的最长子串
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
    let map = new Map()
    let j = 1
    let total = 0
    for (let i = 0; i < s.length; i++) {
        if (map.size === 0) {
            map.set(s[i], j)
        } else
        if (map.has(s[i])) {
            j = map.get(s[i])
            j++
            map.set(s[i], j)

        } else {
            j = 1
            map.set(s[i], j)
        }
    }
    map.forEach(item => {
        if (item >= k) {
            total += item
        }
    })
    return total
};
