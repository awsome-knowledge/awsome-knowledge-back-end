/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
var inorderTraversal = function (root) {
    const stack = [];
    const res = [];
  
    while (root || stack.length) {
      if (root) {
        stack.push(root);
        root = root.left;
      } else {
        root = stack.pop();
        res.push(root.val);
        root = root.right;
      }
    }
  
    return res;
};

