/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  let result = true;
  maxDepth(root, result);
  return result;
};

function maxDepth(root, result) {
  if (root === null) return 0
  let l = maxDepth(root.left);
  let r = maxDepth(root.right);
  if (Math.abs(l - r) > 1) result = false;
  return 1 + Math.max(l, r);
}

// @lc code=end

