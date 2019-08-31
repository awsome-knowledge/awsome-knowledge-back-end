/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 * @return {boolean}
 */


var isBalanced = function (root) {
    function middle(node) {
        if (!node) {
            return 0
        }
        let left = middle(node.left)
        let right = middle(node.right)
        if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
            return -1
        }
        return Math.max(left, right) + 1
    }
    return middle(root) != -1
};