/*
 * @lc app=leetcode.cn id=671 lang=java
 *
 * [671] 二叉树中第二小的节点
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
    public int findSecondMinimumValue(TreeNode root) {
        if (root == null) {
            return -1;
        }
        if (root.left == null && root.right == null) {
            return -1;
        }
        int leftValue = root.left.val;
        int rightValue = root.right.val;
        if (leftValue == root.val) {
            leftValue = findSecondMinimumValue(root.left);
        }
        if (rightValue == root.val) {
            rightValue = findSecondMinimumValue(root.right);
        }

        if (leftValue != -1 && rightValue != -1) {
            return Math.min(leftValue, rightValue);
        }
        if (leftValue != -1) {
            return leftValue;
        }
        return rightValue;
    }
}
// @lc code=end

