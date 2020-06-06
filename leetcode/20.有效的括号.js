/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let bracket = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      bracket.push(s[i])
    } else if (s[i] === ')' || s[i] === '}' || s[i] === ']') {
      let popValue = bracket.pop()
      if (popValue !== corresponding(s[i])) {
        return false
      }
    }
  }
  return bracket.length === 0
};

function corresponding (ch) {
  switch (ch) {
    case ')':
      return '(';
    case '}':
      return '{';
    case ']':
      return '[';
  }
}

// @lc code=end

