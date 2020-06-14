/*
 * @lc app=leetcode.cn id=172 lang=javascript
 *
 * [172] 阶乘后的零
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {

  let zeroCount = 0;
  // We need to use long because currentMultiple can potentially become
  // larger than an int.
  let currentMultiple = 5;
  while (n >= currentMultiple) {
      zeroCount += (n / currentMultiple) | 0;
      currentMultiple *= 5;
  }
  return zeroCount;

};

// trailingZeroes(14)

// @lc code=end

