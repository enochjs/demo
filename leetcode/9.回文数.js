/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  let y = 0
  let mid = x
  if (x < 0) {
    return false
  }
  while (mid !== 0) {
    let s = mid % 10
    y = y * 10 + s
    mid = mid / 10 | 0
  }
  return x === y
  // while(x < y) {
    
  // }
};
// @lc code=end

