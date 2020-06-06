/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let fisrt = 1;
    let second = 1;
    for(let i = 2; i <= n; i++) {
      let third = fisrt + second
      fisrt = second
      second = third
    }
    return second;
};

// @lc code=end

