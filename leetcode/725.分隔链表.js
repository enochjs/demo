/*
 * @lc app=leetcode.cn id=725 lang=javascript
 *
 * [725] 分隔链表
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
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(root, k) {
  let N = 0;
  let cur = root;
  while (cur != null) {
      N++;
      cur = cur.next;
  }
  let mod = N % k;
  let size = N / k | 0;
  let ret = new Array(k).fill(null);
  cur = root;
  for (let i = 0; cur != null && i < k; i++) {
    ret[i] = cur;
    let curSize = size + (mod-- > 0 ? 1 : 0);
    for (let j = 0; j < curSize - 1; j++) {
        cur = cur.next;
    }
    let next = cur.next;
    cur.next = null;
    cur = next;
  }


  return ret;
};

// @lc code=end

