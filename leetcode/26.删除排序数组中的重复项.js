/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let repeatindex = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[repeatindex - 1]) {
      swap(nums, i, repeatindex)
      repeatindex += 1
    }
  }
  return repeatindex
};

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
// @lc code=end

