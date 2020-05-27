/*
 * @lc app=leetcode.cn id=763 lang=javascript
 *
 * [763] 划分字母区间
 */

// @lc code=start
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  let store = [];
  let index = 0;
  while(index<S.length) {
    let lastIndex = S.lastIndexOf(S[index])
    for (let i = index; i <= lastIndex; i++) {
      const currentLastIndex = S.lastIndexOf(S[i])
      lastIndex = lastIndex < currentLastIndex ? currentLastIndex : lastIndex
    }
    store.push(lastIndex - index + 1)
    index = lastIndex + 1
  }
  return store
};
// @lc code=end

