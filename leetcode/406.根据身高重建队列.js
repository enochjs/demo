/*
 * @lc app=leetcode.cn id=406 lang=javascript
 *
 * [406] 根据身高重建队列
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
  people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])
  const newArr = new Array()
  people.forEach(p => {
    insert(newArr, p)
  })
  return newArr
};

function insert (arr, p) {
  const position = p[1]
  let current = 0
  let i = 0
  while(i < arr.length && current < position) {
    if (arr[i][0] >= p[0]) {
      current += 1
    }
    i++
  }
  for (let j = arr.length - 1; j >= i; j--) {
    arr[j + 1] = arr[j]    
  }
  arr[i] = p
}

// @lc code=end

