/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let flag = true;//判断正负标志位
    let restNum = /[0-9]/;//是否为数值正则验证
    let i = 0;//当前字符串索引
    let num = 0;//要返回的数值
    while(str[i] === " ") i++;//使标志位到第一位非空字符
    if(str[i] === "-") {//确定是否有正负标志位，
      flag = false;
      i++;//索引前移，防止有-+这样多个标志位
    } else if(str[i] === "+") {//确定是否有正负标志位
      i++;
    }
    while(restNum.test(str[i]) && i < str.length) {//判断i是否超出索引，以及只有数值可以进入数值叠加
      num = num * 10 + parseInt(str[i]);
      i++;
      if(num >= 2147483648) {
        num = flag ? 2147483647 : 2147483648;
        break
      }
    }
    return flag ? num : -num
  };
// @lc code=end

