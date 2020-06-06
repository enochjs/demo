/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let denary = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    let ten = (digits[i] + denary) / 10 | 0
    digits[i] = (digits[i] + denary) % 10
    denary = ten
    if (denary === 0) {
      break
    }
  }
  if (denary) {
    digits.unshift(denary)
  }
  return digits
};
// @lc code=end

