/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let head = new ListNode(-1)
  let l = head
  let denary = 0
  while(l1 !== null || l2 !== null) {
    let val1 = l1 && l1.val ? l1.val : 0
    let val2 = l2 && l2.val ? l2.val : 0
    const sum = val1 + val2 + denary
    const val = sum % 10
    denary = sum / 10 | 0
    l.next = new ListNode(val)
    l = l.next
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }
  if (denary) {
    l.next = new ListNode(denary)
  }
  return head.next
};
// @lc code=end

