/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let sum = 0
    let a1 = []
    let a2 = []
    let a3 = []
    let a4 = []
    let index
    if (nums.length <= 3) {
        sum = nums.reduce((prev, next) => {
            return prev + next
        })
        return sum
    }
    nums = nums.sort((a, b) => {
        return a - b
    })
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1, k = nums.length - 1; j < k;) {
            if ((nums[i] + nums[j] + nums[k]) === target) {
                return target
            } else if ((nums[i] + nums[j] + nums[k]) > target) {
                a1.push(nums[i] + nums[j] + nums[k])
                k--
            } else {
                a1.push(nums[i] + nums[j] + nums[k])
                j++
            }
        }
    }

    a1.forEach(item => {
        a2.push(Math.abs(item - target))
        a4.push(Math.abs(item - target))
    })


    a3 = a2.sort((a, b) => {
        return a - b
    })

    index = a4.indexOf(a3[0])
    return a1[index]

};