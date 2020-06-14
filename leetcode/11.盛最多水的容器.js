/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {

  if (height.length === 2) {
    return Math.min(height[0], height[1])
  }
  let max = 0
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let width = j - i
      let min = Math.min(height[i], height[j])
      max = Math.max(max, min * width)
    }
  }
  return max
};

// maxArea([1,8,6,2,5,4,8,3,7])
// @lc code=end

