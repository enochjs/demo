/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  return judge(x, 0 , x)
};

function judge(x, start, end) {
  let base = Math.ceil((start + end) / 2)
  const squart = base * base
  const squartLarger = (base + 1) * (base + 1)
  if (x < squartLarger && squart <= x) {
    return base
  }
  if (squart > x) {
    return judge(x, start, base)
  } else {
    return judge(x, base, end)
  }
}

// @lc code=end

