/*
 * @lc app=leetcode.cn id=744 lang=javascript
 *
 * [744] 寻找比目标字母大的最小字母
 */

// @lc code=start
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
  let l = 0
  let r = letters.length

  if (letters.length === 1) {
    return letters[0]
  }
  let m = (l + r) / 2 | 0
  while (l <= r) {
    if (target >= letters[m]) {
      l = m + 1
    } else {
      r = m - 1
    }
    m = (l + r) / 2 | 0
  }
  if (l < letters.length) {
    return letters[l]
  }
  return letters[0]
};

// @lc code=end

