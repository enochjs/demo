/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let max = 0
  let min = prices[0]
  for (let i = 0; i < prices.length; i++) {
    // const element = array[i];
    if (prices[i] < min) {
      min = prices[i]
    } else {
      max = Math.max(max, prices[i] - min)
    }
  }
  return max
};

// @lc code=end

