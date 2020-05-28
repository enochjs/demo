/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  // TreeNode
  if (n < 1) {
    return new TreeNode(null)
  }
  return generateSubtrees(1, n);
};

function generateSubtrees(s, e) {
  let res = []
  if (s > e) {
    res.push(null)
    return res;
  }
  for (let i = s; i <= e; ++i) {
    let leftSubtrees = generateSubtrees(s, i - 1);
    let rightSubtrees = generateSubtrees(i + 1, e);
    leftSubtrees.forEach((left) => {
      rightSubtrees.forEach((right) => {
        let root = new TreeNode(i)
        root.left = left;
        root.right = right;
        res.push(root)
      })
    })
  }
  return res;
}
// @lc code=end

