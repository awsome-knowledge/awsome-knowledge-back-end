/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */
/**
 * @param {tmpring} s
 * @return {boolean}
 */

var isValid = function(s) {
    var tmp = []
    for(var l of s)
        if ((i="({[]})".indexOf(l))>-1)
            if (tmp[tmp.length-1]+i===5)
                tmp.length--;
            else
                tmp.push(i);
    return tmp.length===0
};
