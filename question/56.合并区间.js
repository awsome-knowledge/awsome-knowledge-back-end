/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function (intervals) {
    // 数组为空，返回空
    if (intervals.length === 0) {
        return []
    }
    // 数组首位进行从小到大排序
    intervals.sort((a, b) => a[0] - b[0])
    // 取出数组第一位
    let pre = intervals[0]
    let cur = []
    let res = []
    // 从第二位开始遍历数组
    for (let i = 1; i < intervals.length; i++) {
        // 取出第二位后的数据
        cur = intervals[i]
        // 如果前者的右端值>=后者的左端值
        if (pre[1] >= cur[0]) {
            // 前者的左端值不变，右端值取两者最大
            pre[1] = Math.max(pre[1], cur[1])
        } else {
            // 不连续，就将前者塞入结果集
            res.push(pre)
            // 后者替上
            pre = cur
        }
    }
    // 将最后一个塞上
    res.push(pre)
    return res

};


