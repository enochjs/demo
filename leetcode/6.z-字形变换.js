/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  let arr = new Array(numRows).fill('')
  let i = 0
  let j = 0
  let index = 0
  if (s.length === 1 || numRows === 1) {
    return s
  }
  while(index < s.length) {
    while(j < numRows - 1) {
      if (j === 0) {
        arr[i] += s[index] || ''
        i++
        index++
        if (i !== numRows) {
          continue
        }
      } else {
        arr[numRows - j - 1] += s[index] || ''
        i++
        index++
      }
      j += 1
      i = 0
    }
    j = 0
  }
  const result = arr.reduce((a, b) => a + b, '')
  return result
};

// convert('a', 1)

// @lc code=end

