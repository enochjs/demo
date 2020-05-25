/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
  if (intervals.length === 0) {
    return 0
  }
  quichSort(intervals, 0, intervals.length - 1)
  let count = 1
  let pre = 0
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= intervals[pre][1]) {
      count ++
      pre = i
    }
  }
  return intervals.length - count
};


function quichSort(arr, left, right) {
  if (left < right) {
    const partitionIndex = partition(arr, left, right)
    quichSort(arr, left, partitionIndex - 1)
    quichSort(arr, partitionIndex + 1, right)
  }
}

function swap (arr, i, j) {
  if (i === j) return;
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function partition(arr, left, right) {
  let index = left + 1
  for (let i = left + 1; i <= right; i++) {
    if (arr[i][1] < arr[left][1]) {
      swap(arr, i, index)
      index += 1
    }
  }
  swap(arr, index - 1, left)
  return index - 1
}

// @lc code=end

