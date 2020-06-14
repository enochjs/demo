/*
 * @lc app=leetcode.cn id=190 lang=javascript
 *
 * [190] 颠倒二进制位
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
  let s = ''
  console.log(',,,,', n)
  for (let i = 0; i < n.length; i++) {
    // const element = array[i];
    s[i] = n[n.length - i - 1]
  }
  console.log('.....s', s)
  return s
};
// @lc code=end

