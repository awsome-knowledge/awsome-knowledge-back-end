/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // 声明一个字典
    let map = {}
    // 循环遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 目标值与当前值做差
        let tep = target - nums[i]
        // 差值是否在字典中
        let val = map.hasOwnProperty(tep)
        // 如果找到，就返回他们的数组下标
        if (val) {
            return [map[tep], i]
        }
        // 如果没找到，塞入字典中
        map[nums[i]] = i
    }
};

