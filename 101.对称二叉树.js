/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
var isSymmetric = function (root) {
    function middle(p, q) {
        if (p == null && q == null) return true
        if (p == null || q == null) return false
        return p.val == q.val && middle(p.left, q.right) && middle(p.right, q.left)
    }
    return middle(root, root)
};