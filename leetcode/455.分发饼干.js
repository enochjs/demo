/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  let i = 0
  let j = 0

  quichSort(g, 0, g.length)
  quichSort(s, 0, s.length)

  while(i < s.length && j < g.length) {
    if (s[i] >= g[j]) {
      j++
    }
    i++
  }
  // console.log('....', j, g, s)
  return j
};

function quichSort(arr, left, right) {
  if (left < right) {
    const partitionIndex = partition(arr, left, right)
    quichSort(arr, left, partitionIndex - 1)
    quichSort(arr, partitionIndex + 1, right)
  }
}

function partition(arr, left, right) {
  let index = left + 1
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < arr[left]) {
      swap(arr, i, index)
      index ++
    }
  }
  swap(arr, left, index - 1)
  return index - 1
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// findContentChildren([10,9,8,7], [5,6,7,8])

// @lc code=end

