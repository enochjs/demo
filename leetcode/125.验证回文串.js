/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let newS = ''
  for (let i = 0; i < s.length; i++) {
    const item = s[i].toLocaleLowerCase()
    if ((item <= 'z' && item >= 'a') || (item <= '9' && item >= '0')) {
      newS += item
    }
  }
  const len = newS.length
  let mid = Math.ceil(len/2)
  for (let i = 0; i < mid; i++) {
    if (newS[i] !== newS[len - i - 1]) {
      return false
    }
  }
  return true
};

// @lc code=end

