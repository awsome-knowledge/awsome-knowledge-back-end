/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    let res

    function middle(node) {
        if (node) {
            middle(node.left)
            if (--k === 0) {
                res = node.val
            }
            middle(node.right)
        }
    }
    middle(root)

    return res
};
