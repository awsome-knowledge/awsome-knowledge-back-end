/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    if (s === '') {
        return 0
    }
    let last = s.split(' ')
    last = last.filter(item => {
        return item !== ''
    })
    let index = last.length - 1
    if (index >= 0) {
        return last[index].length
    }else{
        return 0
    }
};
