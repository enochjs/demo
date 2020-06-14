/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length <= 1) {
    return s
  }
  function helper(s) {
    let index = s.length
    while (index) {
      let i = 0
      for (; i < index / 2; i++) {
        if (s[i] !== s[index - i - 1]) {
          index -= 1
          break
        }
      }
      if (i >= index/2) {
        break
      }
    }
    return s.slice(0, index)
  }

  let a = helper(s)
  let b = longestPalindrome(s.slice(1))
  return a.length >= b.length ? a : b
};

// longestPalindrome ('babad')

// @lc code=end

