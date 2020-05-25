/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

 const vowel = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']

var reverseVowels = function(s) {
  const vawels = []
  const ss = s.split('')
  for (let i = 0; i < ss.length; i++) {
    if (vowel.indexOf(ss[i]) !== -1) {
      vawels.push(i)
    }
  }
  const len = vawels.length
  for (let i = 0; i < len / 2; i++) {
    swap(ss, vawels[i], vawels[len - i - 1])
  }
  return ss.join('')
};

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return temp
}

// @lc code=end

