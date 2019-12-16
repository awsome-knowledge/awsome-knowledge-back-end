/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
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
 * @param {number} n
 * @return {ListNode}
 */
// var removeNthFromEnd = function(head, n) {
//     let nodes = [],current = head;
//     while(current){
//         nodes.push(current);
//         current = current.next;
//     }
//     let originLen = nodes.length;
//     nodes.splice(nodes.length - n,1);
//     if(nodes.length === 0)
//         return null;
//     if(n === 1){
//         nodes[nodes.length - 1].next = null;
//     }else if(n  < originLen){
//         nodes[nodes.length - n].next = nodes[nodes.length - n + 1];
//     }
//     return nodes[0];
// };

var removeNthFromEnd = function(head, n) {
    let first = head, second = head;
    while (n > 0) {
      first = first.next
      n--
    }
    if (!first) return head.next;     // 删除的是头节点
    while (first.next) {
      first = first.next;
      second = second.next;
    }
    second.next = second.next.next;
    return head
}
