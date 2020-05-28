/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
var reverseList = function(head) {
  let newHead = new ListNode(-1);
  while (head != null) {
    let next = head.next;
    head.next = newHead.next;
    newHead.next = head;
    head = next;
  }
  return newHead.next; 
};
// @lc code=end

