/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    let res = [],
        tmp = []
    let current = root
    while (current || tmp.length > 0) {
        while (current) {
            res.push(current.val)
            tmp.push(current)
            current = current.left
        }
        current = tmp.pop()
        current = current.right
    }
    return res
};