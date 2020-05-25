/*
 * @lc app=leetcode.cn id=524 lang=javascript
 *
 * [524] 通过删除字母匹配到字典里最长单词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
var findLongestWord = function(s, d) {
  let maxWord = ''

  for (let i = 0; i < d.length; i++) {
    if (maxWord.length <= d[i].length && findWord(s, d[i])) {
      if (maxWord.length < d[i].length || maxWord.localeCompare(d[i]) > 0) {
        maxWord = d[i]
      }
    }
  }
  return maxWord
};

function findWord (s, w) {
  let sLen = s.length
  let wLen = w.length
  if (sLen < wLen) {
    return false
  }
  let sIndex = 0
  let i = 0
  while(sIndex < sLen && i < wLen && sLen - sIndex >= wLen - i) {
    if (w[i] === s[sIndex]) {
      i++
    }
    sIndex ++
  }
  return i === w.length
}

// @lc code=end

