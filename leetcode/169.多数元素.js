/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]] === undefined) {
      map[nums[i]] = 0
    } 
    map[nums[i]] += 1
  }
  let maxKey = nums[0]
  Object.keys(map).forEach((key) => {
    maxKey = map[key] > map[maxKey] ? key : maxKey
  })
  return maxKey
};
// @lc code=end

