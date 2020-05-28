/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let l1 = headA
  let l2 = headB
  while(l1 !== l2) {
    l1 = l1 === null ? headB : l1.next
    l2 = l2 === null ? headA : l2.next
  }
  return l1
};
// @lc code=end

