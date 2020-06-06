/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let lastWord = ''
  for (let i = s.length - 1; i >=0; i--) {
    // const element = array[i];
    if (lastWord === '' && s[i] === ' ') {
      continue;
    }
    if (s[i] === ' ') {
      break;
    } else {
      lastWord += s[i]
    }
  }
  return lastWord.length
};
// @lc code=end

