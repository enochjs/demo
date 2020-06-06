/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (!strs.length) {
    return ''
  }
  if (strs.length === 1) {
    return strs[0]
  }
  let pre = ''
  let index = 0
  let finish = false
  let prefix = strs[0]
  while (!finish && prefix[index] !== undefined) {
    let i = 1
    for (; i < strs.length; i++) {
      if (prefix[index] !== strs[i][index]) {
        finish = true
        break
      }
    }
    if (i !== strs.length) {
      finish = true
      break
    } else {
      pre += prefix[index]
      index += 1
    }
  }
  return pre
};
// @lc code=end

