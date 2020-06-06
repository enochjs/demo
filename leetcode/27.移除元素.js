/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let preIndex = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[preIndex] = nums[i]
      preIndex += 1
    }
  }
  return preIndex
};

// @lc code=end

