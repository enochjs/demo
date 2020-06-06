/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  
  if (needle === '') {
    return 0
  }
  let needleIndex = 0
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[needleIndex]) {
      needleIndex++
    } else {

      if (i < haystack.length - 1 && needle.indexOf(haystack[i + 1]) !== -1) {
        i = i - needleIndex
      }
      needleIndex = 0
    }
    
    if (needleIndex === needle.length) {
      return i - needleIndex + 1
    }
  }
  return -1
};

// @lc code=end

