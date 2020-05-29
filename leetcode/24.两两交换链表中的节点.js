/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
var swapPairs = function(head) {
  if (head === null) {
    return null
  }
  let l1 = head
  let l2 = head.next
  if (l2 === null) {
    return l1
  }
  let next = head.next.next
  l2.next = l1
  l1.next = swapPairs(next)
  return l2
};
// @lc code=end

