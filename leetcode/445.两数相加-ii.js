/*
 * @lc app=leetcode.cn id=445 lang=javascript
 *
 * [445] 两数相加 II
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
  const l1Stack = buildStack(l1)
  const l2Stack = buildStack(l2)
  // const result = 
  let head = null
  let carry = 0
  while(l1Stack.length || l2Stack.length || carry !== 0) {
    let x = l1Stack.pop() || 0
    let y = l2Stack.pop() || 0
    const sum = x + y + carry
    let val = sum % 10
    carry = sum / 10 | 0
    const node = new ListNode(val)
    node.next = head
    head = node
  }
  return head
};

function buildStack (link) {
  let l = link
  const stack = []
  while (l != null) {
    stack.push(l.val);
    l = l.next;
  }
  return stack
}

// @lc code=end

