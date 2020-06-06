/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function getValue(ch) {
  switch(ch) {
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      default: return 0;
  }
}

var romanToInt = function(s) {

  let pre = getValue(s[0])
  let sum = 0

  for (let i = 1; i < s.length; i++) {
    let value = getValue(s[i])
    if (value > pre) {
      sum -= pre
    } else {
      sum += pre
    }
    pre = value
  }
  sum += pre;
  return sum
};
// @lc code=end

