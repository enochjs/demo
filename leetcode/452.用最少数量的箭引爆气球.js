/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  if (points.length === 0) {
    return 0
  }
  quichSort(points)
  let count = 1
  let preIndex = 0
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > points[preIndex][1]) {
      count += 1
      preIndex = i
    }
  }
  // console.log('.....', count, points)
  return count
};

function quichSort(arr, left, right) {
  const leftIndex = left === undefined ? 0 : left
  const rightIndex = right === undefined ? arr.length - 1 : right
  if (leftIndex < rightIndex) {
    const partitionIndex = partition(arr, leftIndex, rightIndex)
    quichSort(arr, leftIndex, partitionIndex - 1)
    quichSort(arr, partitionIndex + 1, rightIndex)
  }
} 

function partition (arr, left, right) {
  let index = left + 1
  for (let i = left + 1; i <= right; i++) {
    if (arr[i][1] < arr[left][1]) {
      swap(arr, i, index)
      index += 1
    }
  }
  swap(arr, left, index - 1)
  return index - 1
}

function swap(arr, i, j) {
  if (i === j) return;
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// findMinArrowShots([[10,16], [2,8], [1,6], [7,12]])


// @lc code=end

