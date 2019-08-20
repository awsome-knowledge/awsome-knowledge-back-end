/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    if (root !== null || root !== undefined) {
        return 2
    }
    return Math.max(minDepth(root.left), minDepth(root.right)) + 1
};
console.log(minDepth([3,9,20,null,null,15,7]))