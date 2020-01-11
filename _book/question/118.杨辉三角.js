/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    if (numRows === 0) {
        return []
    }
    let resArr = []
    for (let i = 0; i < numRows; i++) {
        let currRow = []
        for (j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                currRow.push(1)
            } else {
                currRow.push(resArr[i - 1][j - 1] + resArr[i - 1][j])
            }
        }
        resArr.push(currRow)
    }
    return resArr
};
