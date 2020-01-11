/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let tmp = null
    let newHead = null
    while (head !== null) {
        tmp = head
        head = head.next
        tmp.next = newHead
        newHead = tmp
    }
    return newHead
};