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
  return nums[k - 1]
};

function swap (arr, i, j) {
  if (i === j) return;
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function partition (arr, left, right) {
  let index = left + 1
  for (let i = left + 1; i < arr.length; i++) {
    if (arr[i] > arr[left]) {
      swap(arr, i, index)
      index ++
    }
  }
  swap(arr, left, index - 1)
  return index - 1
}


function quichSort(arr, left, right) {
  const leftIndex = left === undefined ? 0 : left
  const rightIndex = right === undefined ? arr.length - 1 : right
  if (leftIndex < rightIndex) {
    const partitionIndex = partition(arr, leftIndex, rightIndex)
    quichSort(arr, left, partitionIndex - 1)
    quichSort(arr, partitionIndex + 1, right)
  }
}

// @lc code=end

