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
    let map = {}
    for (let i = 0; i < nums.length; i++) {
        let tep = target - nums[i]
        let val = map.hasOwnProperty(tep)
        if (val) {
            return [map[tep], i]
        }
        map[nums[i]] = i
    }
};

const n=[1, 3, 6, 8, 4]
const t=14

console.log(twoSum(n,t))

// 执行顺序
// 0 map[1]=0
// 1 map[3]=1
// 2 map[6]=2
// return [2,3]