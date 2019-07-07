/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 初始化空map和变量left
    let map = {}
    var left = 0
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
    // 将字符串s分割组装成数组
    // 这个函数返回每个字符最大的索引值
    // 如"abcabcbb"，返回的map就是{'a':3,'b':7,'c':5}
    return s.split('').reduce((max, v, i) => {
        left = map[v] >= left ? map[v] + 1 : left
        map[v] = i
        return Math.max(max, i - left + 1)
    }, 0)
};

