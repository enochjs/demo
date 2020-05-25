/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  while(m > 0 || n > 0) {
    // console.log('.....', m, n, m + n -1, nums1[m - 1], nums2[n - 1])
    if (m > 0 && n > 0) {
      if (nums1[m - 1] > nums2[n - 1]) {
        nums1[m+n-1] = nums1[m - 1]
        m--;
      } else {
        nums1[m+n-1] = nums2[n - 1]
        n--;
      }
      continue;
    }
    if (n > 0) {
      nums1[n - 1] = nums2[n - 1]
      n--;
      continue;
    }
    if (m > 0) {
      m--
      continue;
    }
  }
  // console.log('....num1', nums1)
};

// merge([1,2,3,0,0,0], 3, [2,5,6] , 3)
// @lc code=end

