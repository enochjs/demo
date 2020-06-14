/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  let newHead = new ListNode(-1)
  newHead.next = head
  let pre = newHead
  while (head !== null) {
    if (head.val === val) {
      pre.next = head.next
    } else {
      pre = head
    }
    head = head.next
  }
  return newHead.next
};
// @lc code=end

