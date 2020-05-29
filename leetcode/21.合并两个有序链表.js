/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
var mergeTwoLists = function(l1, l2) {
  // const 

  let head = newList = new ListNode(-1)
  while(l1 !== null && l2 !== null) {
    // console.log('.....', l1.val, l2.val, newList.val)
    if (l1.val <= l2.val) {
      newList.next = l1
      l1 = l1.next
    } else {
      newList.next = l2
      l2 = l2.next
    }
    // console.log('.....', newList.val, newList.next.val)
    newList = newList.next
  }
  if (l1 !== null) {
    newList.next = l1
  }
  if (l2 !== null) {
    newList.next = l2
  }
  return head.next
};
// @lc code=end

