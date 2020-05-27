/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let l = 0
  let r = nums.length - 1
  while(l<r) {
    let m = (l + r) / 2 | 0
    if (nums[m] <= nums[r]) {
      r = m
    } else {
      l = m + 1
    }
  }
  return nums[l]
};

// findMin([3,4,5,1,2])

// @lc code=end

