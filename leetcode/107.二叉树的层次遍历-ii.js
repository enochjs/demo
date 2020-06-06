/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if (!root) return [];
  let queue = [root]
  let res = []
  while(queue.length) {
    let cur = []
    let temp = []
    while(queue.length) {
      let node = queue.shift()
      cur.push(node.val)
      if(node.left) temp.push(node.left)
      if(node.right) temp.push(node.right)
    }
    res.push(cur)
    queue = temp
  }
  return res.reverse()
};

// var levelOrderBottom = function(root) {
//   const res = []
//   function dep(node, depth) {
//     if (node === null) return;
//     res[depth] = res[depth] || []
//     res[depth].push(node.val)
//     dep(node.left, depth + 1)
//     dep(node.right, depth + 1)
//   }
//   dep(root, 0)
//   return res.reverse()
// };
// @lc code=end

