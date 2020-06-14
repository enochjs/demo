/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {

  const newArr = []
  // for (let i = nums.length - k; i < nums.length; i++) {
  //   // console.log()
  //   // const element = array[i];
  //   // console.log('...', i + k, nums[i + k])
  //   newArr.push(nums[i])
  // }
  // console.log('....new', newArr)
  // for (let i = nums.length - k - 1; i >= 0; i--) {
  //   console.log('....i', i, i+k)
  //   // const element = array[i];
  //   nums[(i + k)%nums.length] = nums[i]
  // }
  for (let i = 0; i < nums.length; i++) {
    newArr[(i + k) % nums.length] = nums[i];
  }
  // console.log('....', nums, newArr)
  for (let i = 0; i < nums.length; i++) {
    nums[i] = newArr[i]
  }
  // console.log('....', nums)
};

// rotate([1,2,3,4,5,6,7], 3)



// @lc code=end

