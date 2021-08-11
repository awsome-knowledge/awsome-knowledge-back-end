/*
 * @lc app=leetcode.cn id=1491 lang=javascript
 *
 * [1491] 去掉最低工资和最高工资后的工资平均值
 */

// @lc code=start
/**
 * @param {number[]} salary
 * @return {number}
 */
 var average = function (salary) {
    let max = Math.max(...salary)
    let min = Math.min(...salary)
    let maxIndex = salary.findIndex(a => a === max)
    salary.splice(maxIndex, 1)
    let minIndex = salary.findIndex(a => a === min)
    salary.splice(minIndex, 1)
    return salary.reduce((a, b) => a + b) / salary.length
};
// @lc code=end
console.log(average([6000, 5000, 4000, 3000, 2000, 1000]))


