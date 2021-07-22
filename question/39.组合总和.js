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
    // 1. 先将数组从小到大排序
    candidates.sort((a, b) => a - b)
    //走过的路径
    let buffer = []
    let res = []
    // 开始查找
    search(0, target)
    // 返回结果
    return res
    // 递归
    function search(start, target) {
        //等于0s时，正确答案，假如当前走过的路径
        // 目标值等于0，说明buffer中的值加起来刚好等于目标值，将buffer深拷贝塞入res
        if (target === 0) return res.push(buffer.slice())
        // 剪枝：如果target已经小于0，那么该层往后继续找也不是正确结果，直接返回
        if (target < 0) return
        // 开始值等于原始数组长度，直接返回
        if (start === candidates.length) return
        //记录当前的路径，开始往下试错
        // 将原始数组的start下标对应的值塞入buffer
        buffer.push(candidates[start])
        //当前路径往下试错：回溯
        // 继续查找buffer中剩余的差值
        search(start, target - candidates[start])
        // 将buffer最后的数据删掉
        buffer.pop()
        //不管当前路径是否正确，都要回退到上一个值，走另一条路试试
        search(start + 1, target)
    }
};
