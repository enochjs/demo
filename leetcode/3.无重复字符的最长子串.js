/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (s === '') {
    return 0
  }
  if (s.length === 1) {
    return 1
  }
  return Math.max(longByRoot(s), lengthOfLongestSubstring(s.slice(1)))
  function longByRoot(s) {
    let set = new Set([])
    for (let i = 0; i < s.length; i++) {
      // const element = array[i];
      if (set.has(s[i])) {
        break
      } else {
        set.add(s[i])
      }
    }
    return set.size
  }
};
// @lc code=end

