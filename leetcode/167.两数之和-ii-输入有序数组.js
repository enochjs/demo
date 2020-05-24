/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  // let leftIndex = 0
  for (let i = 0; i < numbers.length; i++) {
    let left = numbers[i]
    let rightValue = target - left
    for (let j = i+1; j < numbers.length; j++) {
      if (numbers[j] === rightValue) {
        return [i + 1, j + 1]
      }
      if (numbers[j] > rightValue) {
        break
      }
    }
  }
};
// @lc code=end

