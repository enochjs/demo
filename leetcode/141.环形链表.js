/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
var hasCycle = function(head) {
  if (head === null) {
    return false
  }
  let l1 = head;
  let l2 = head.next;
  while(l1 !== null && l2!== null && l2.next !== null) {
    if (l1 === l2) {
      return true
    }
    l1 = l1.next
    l2 = l2.next.next
  }
  return false;
};
// @lc code=end

