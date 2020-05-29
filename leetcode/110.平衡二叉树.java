import javax.swing.tree.TreeNode;

/*
 * @lc app=leetcode.cn id=110 lang=java
 *
 * [110] 平衡二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {

    public boolean result = true;

    public boolean isBalanced(TreeNode root) {
        depth(root);
        return result;
    }

    public int depth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int l = depth(root.left);
        int r = depth(root.right);
        if (Math.abs(l - r) > 1) {
            result = false;
        }
        return Math.max(l, r) + 1;
    }
}
// @lc code=end

