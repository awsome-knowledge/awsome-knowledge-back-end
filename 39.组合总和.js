/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    candidates.sort((a, b) => a - b)
    let buffer = []
    let res = []
    search(0, target)
    return res

    function search(start, target) {
        if (target === 0) return res.push(buffer.slice()) 
        if (target < 0) return
        if (start === candidates.length) return
        buffer.push(candidates[start])
        search(start, target - candidates[start])
        buffer.pop()
        search(start + 1, target)
    }
};
