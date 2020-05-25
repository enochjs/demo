/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
  const len = s.length
  for (let i = 0; i < len/2; i++) {
    if (s[i] !== s[len - i - 1]) {
      return validDPalindrome(s.slice(i, len - i - 1)) || validDPalindrome(s.slice(i + 1, len - i))
    }
  }
  return true
};

var validDPalindrome = function(s) {
  const len = s.length
  for (let i = 0; i < len/2; i++) {
    if (s[i] !== s[len - i - 1]) {
      return false
    }
  }
  return true
}


// @lc code=end

