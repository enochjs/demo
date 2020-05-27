/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  let sIndex = 0
  let tIndex = 0
  while (sIndex < s.length) {
    while (tIndex < t.length) {
      if (s[sIndex] === t[tIndex]) {
        tIndex += 1
        sIndex += 1
        break;
      }
      tIndex += 1
    }
    if (tIndex === t.length) {
      break
    }
  }
  return sIndex === s.length
};

// @lc code=end

