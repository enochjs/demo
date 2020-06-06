/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if (numRows === 0) {
    return []
  }
  let result = []
  function helper(numRows) {
    if (numRows === 1) {
      result.push([1])
      return [1]
    }
    let res = []
    let pre = helper(numRows - 1)
    for(i=0; i<numRows; i++) {
      let left = pre[i-1] === undefined ? 0 : pre[i-1]
      let right = pre[i] === undefined ? 0 : pre[i]
      res.push(left+right)
    }
    result.push(res)
    return res
  }
  helper(numRows)
  return result
};
// @lc code=end

