/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  let result = []
  function helper(row) {
    if (row === 1) {
      result.push([1])
      return [1]
    }
    const pre = helper(row - 1)
    let res = []
    for (let i = 0; i < row; i++) {
      let left = pre[i - 1] === undefined ? 0 : pre[i-1]
      let right = pre[i] === undefined ? 0 : pre[i]
      res.push(left + right)
    }
    result.push(res)
    return res
  }
  helper(rowIndex + 1)
  return result[rowIndex]
};
// @lc code=end

