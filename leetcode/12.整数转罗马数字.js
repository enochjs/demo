/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  let result = '';
  let store = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  //贪心法
  for (let i = 0; i < store.length; i++)
  {
      while (num >= store[i])
      {
          result += strs[i];
          num -= store[i];
      }
  }
  return result;
};

// @lc code=end

