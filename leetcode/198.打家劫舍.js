/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums == null || nums.length == 0) {
    return 0;
  }
  let length = nums.length;
  if (length == 1) {
      return nums[0];
  }
  let dp = new Array(length)
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < length; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[length - 1];
};

// @lc code=end

