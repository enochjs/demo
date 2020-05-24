/*
 * @lc app=leetcode.cn id=633 lang=javascript
 *
 * [633] 平方数之和
 */

// @lc code=start
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
  for (let a = 0; a * a <= c; a++) {
    let b = Math.sqrt(c - a * a);
    if (parseInt(b) === b)
        return true;
  }
  return false
};
// @lc code=end

