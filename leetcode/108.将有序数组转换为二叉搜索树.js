/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  function helper(left, right) {
    if (left > right) return null;
    let p = (left + right) / 2 | 0;
    // inorder traversal: left -> node -> right
    let root = new TreeNode(nums[p]);
    root.left = helper(left, p - 1);
    root.right = helper(p + 1, right);
    return root;
  }
  return helper(0, nums.length - 1)
};
// @lc code=end

