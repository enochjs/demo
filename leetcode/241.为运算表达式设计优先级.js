/*
 * @lc app=leetcode.cn id=241 lang=javascript
 *
 * [241] 为运算表达式设计优先级
 */

// @lc code=start
/**
 * @param {string} input
 * @return {number[]}
 */
var diffWaysToCompute = function(input) {
  let ways = []
  for (let i = 0; i < input.length; i++) {
    let c = input[i];
    if (c === '+' || c === '-' || c === '*') {
      let left = diffWaysToCompute(input.substring(0, i));
      let right = diffWaysToCompute(input.substring(i + 1));
      left.forEach((l) => {
        right.forEach(r => {
          switch(c) {
            case '+': ways.push(l + r);
            break;
            case '-': ways.push(l - r);
            break;
            case '*': ways.push(l * r);
            break;
          }
        })
      })
    }
  }
  return ways.length ? ways : [Number(input)]
};

diffWaysToCompute("2-1-1")
// @lc code=end

