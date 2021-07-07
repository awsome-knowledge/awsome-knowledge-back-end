/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    // var max = 0
    // var min = 0
    // var arrArea = []
    // for (let i in height) {
    //     for (let j = 1; height.length - j > i; j++) {
    //         min = Math.min(height[height.length - j], height[i])
    //         area = min * (height.length - j - i)
    //         arrArea.push(area)
    //     }
    // }
    // for (let j in arrArea) {
    //     max = Math.max(arrArea[j], max)
    // }
    let maxArea = 0
    let i = 0
    let j = height.length - 1
    // i>=j结束循环
    while (i < j) {
        // 3件事
        // 1. 取两端的最小值
        // 2. 取出两个端点的距离
        // 3. 面积和之前的面积比较取最大值
        maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i))
        if (height[i] > height[j]) {
            // 左边大，右边往左边靠
            j--
        } else if (height[i] < height[j]) {
            // 右边大，左边往左边靠
            i++
        } else {
            // 相等，两边一起往中间靠
            j--
            i++
        }
    }
    return maxArea
};