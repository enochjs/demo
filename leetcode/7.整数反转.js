/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let max = Math.pow(2, 31) - 1
  let min = Math.pow(-2, 31)

  const stringx = x.toString()
  let result = ''
  if (x >= 0) {
    for (let i = stringx.length - 1; i >= 0; i--) {
      // const element = array[i];
      result += stringx[i]
    }
    result = +result
    if (result > max || result < min) {
      return 0
    }
    return result
  } else {
    for (let i = stringx.length - 1; i > 0; i--) {
      // const element = array[i];
      result += stringx[i]
    }
    result = 0 - result
    if (result > max || result < min) {
      return 0
    }
    return result
  }

};
// @lc code=end

