/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  quichSort(nums)
  console.log(nums)
  return nums[k - 1]
};

function partition(nums, left, right) {
  let storeIndex = left + 1
  for (let i = left + 1; i <= right; i++) {
    if (nums[i] > nums[left]) {
      swap(nums, i, storeIndex)
      storeIndex += 1
    }
  }
  swap(nums, left, storeIndex - 1)
  return storeIndex - 1
}

function quichSort(nums, left, right) {
  const leftIndex = left === undefined ? 0 : left
  const rightIndex = right === undefined ? nums.length - 1 : right
  if(leftIndex < rightIndex) {
    const partitionIndex = partition(nums, leftIndex, rightIndex)
    quichSort(nums, leftIndex, partitionIndex - 1)
    quichSort(nums, partitionIndex + 1, rightIndex)
  }
}

function swap (arr, i, j) {
  if (i === j) return;
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

findKthLargest([3,2,1,5,6,4], 2)

// @lc code=end

