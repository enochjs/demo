/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
var isPalindrome = function(head) {
  if (head == null || head.next == null) return true;
  let fast = head
  let slow = head
  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  if (fast != null) slow = slow.next;
  cut(head, slow);
  return isEqual(head, reverse(slow));

};

function cut(head, cutNode) {
  while (head.next !== cutNode) {
    head = head.next;
  }
  head.next = null;
}

function isEqual(l1, l2) {
  while (l1 != null && l2 != null) {
    if (l1.val != l2.val) return false;
    l1 = l1.next;
    l2 = l2.next;
  }
  return true;
}

function reverse(head) {
  let l = head
  let newHead = null;
  while (l != null) {
      let nextNode = l.next;
      l.next = newHead;
      newHead = l;
      l = nextNode;
  }
  return newHead;
}
// @lc code=end

