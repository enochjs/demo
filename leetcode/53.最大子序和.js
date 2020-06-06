/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (nums.length === 1) {
    return nums[0]
  }
  let max = maxSubArrayByRoot(nums, 0)
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(max, maxSubArrayByRoot(nums, i))
  }
  return max
};

function maxSubArrayByRoot (nums, index) {
  let max = nums[index]
  let currentValue = nums[index]
  for (let i = index + 1; i < nums.length; i++) {
    currentValue += nums[i]
    max = max < currentValue ? currentValue : max
  }
  return max
}

// @lc code=end

