/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let single = 0;
  for (let i = 0; i < nums.length; i++) {
    single ^= nums[i];
  }
  return single;
};
// @lc code=end

