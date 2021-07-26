/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = function (nums) {
    // 初始值是二维数组
    let res = [
        []
    ]
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        let temp = []
        // 遍历结果集
        for (let j = 0; j < res.length; j++) {
            // 结果集合并数组中的当前值，在塞进临时数组
            temp.push(res[j].concat(nums[i]))
        }
       res= res.concat(temp)
    }
    return res
};
// @lc code=end

