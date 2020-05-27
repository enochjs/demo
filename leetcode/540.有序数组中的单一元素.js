/*
 * @lc app=leetcode.cn id=540 lang=javascript
 *
 * [540] 有序数组中的单一元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
  let l = 0
  let r = nums.length

  while(l<r) {
    let m = (l + r)/2 | 0
    if (nums[m] === nums[m - 1]) {
      if ((m - 1) % 2 === 0) {
        l = m + 1
      } else {
        r = m - 2
      }
    } else if (nums[m] === nums[m + 1]) {
      if ((m) % 2 === 0) {
        l = m + 2
      } else {
        r = m - 1
      }
    } else {
      l = r = m
    }
  }
  return nums[l]
};


// @lc code=end

