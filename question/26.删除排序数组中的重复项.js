/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // console.log(nums)
    // 1.遍历
    for (i = 0; i < nums.length; i++) {
        // 2.上一个数和下一个数进行等价比较
        if (nums[i] == nums[i+1]) {
            // 3.相等则删掉这个数，下一个数往前进一位
            nums.splice(i, 1);
            i--;
        }
    }
};
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
