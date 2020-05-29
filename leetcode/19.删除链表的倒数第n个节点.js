/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 */

// @lc code=start
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
var removeNthFromEnd = function(head, n) {
  let l1 = head
  let l2 = head
  while(n--) {
    l1 = l1.next
  }
  if (l1 === null) {
    return head.next
  }
  while(l1.next !== null) {
    l1 = l1.next
    l2 = l2.next
  }
  l2.next = l2.next.next
  return head
};
// @lc code=end

