/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  let binary = 0
  let newString = ''
  let max = a.length > b.length ? a : b
  let min = a.length > b.length ? b : a
  let maxlen = max.length
  let minlen = min.length

  for (let i = 0; i < max.length; i++) {
    let ai = Number(max[maxlen - i - 1] || 0)
    let bi = Number(min[minlen - i - 1] || 0)
    let two = (ai + bi + binary) / 2 | 0
    let remainder = (ai + bi + binary) % 2
    newString = remainder + newString
    binary = two
  }
  if (binary) {
    newString = binary + newString
  }
  return newString
};

// @lc code=end

