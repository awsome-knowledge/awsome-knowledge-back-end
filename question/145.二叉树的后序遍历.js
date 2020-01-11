/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
var postorderTraversal = function (root) {
    let res = [],
        tmp = []
    // 标记为上一个访问的节点
    let last = null
    let current = root
    while (current || tmp.length > 0) {
        while (current) {
            tmp.push(current)
            current = current.left
        }
        current = tmp[tmp.length - 1]
        if (!current.right || current.right == last) {
            current = tmp.pop()
            res.push(current.val)
            last = current
            // 继续弹栈
            current = null
        } else {
            current = current.right
        }
    }
    return res
};