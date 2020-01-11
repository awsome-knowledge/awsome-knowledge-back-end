/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
// Math.floor() 返回小于或等于一个给定数字的最大整数。
var isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            sqr = new Set()
        for (let j = 0; j < 9; j++) {
            let rowc = board[i][j]
            let colc = board[j][i]
            let sqrc = board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + j % 3]
            if (row.has(rowc) || col.has(colc) || sqr.has(sqrc)) return false
            if (rowc !== '.') row.add(rowc)
            if (colc !== '.') col.add(colc)
            if (sqrc !== '.') sqr.add(sqrc)
        }
    }
    return true
};
