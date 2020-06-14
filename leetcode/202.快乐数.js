/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  let a = new Set()
  while(n !==1){
    if (a.has(n)) {
      break;
    } else {
      a.add(n)
    }
    let m = 0
    while(n) {
      y = n % 10
      n = n / 10 | 0
      m += y * y
    }
    n = m
  }
  return n === 1
};
// @lc code=end

