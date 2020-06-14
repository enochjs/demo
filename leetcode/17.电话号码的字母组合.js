/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (!digits) {
    return []
  }
  let numbers = digits.split('');

  let arrs = numbers.map((item) => getString(item))

  function helper(arrs) {
    if (arrs.length === 1) {
      return arrs[0]
    }
    for (let i = 0; i < arrs.length; i++) {
      // const element = array[i];
      let temp = arrs[i]
      arrs[i] = arrs[0]
      arrs[0] = temp
      let result = []
      // console.log('....', arrs.slice(1))
      let remain = helper(arrs.slice(1))
      for (let j = 0; j < temp.length; j++) {
        remain.forEach(item => {
          // console.log('....item', item)
          result.push(temp[j] + item)
        });
      }
      return result
    }
  }

  const result = helper(arrs)
  // console.log('....result', result)
  return result
};


function getString(number) {
  switch(number) {
    case '2': return ['a', 'b', 'c'];
    case '3': return ['d', 'e', 'f'];
    case '4': return ['g', 'h', 'i'];
    case '5': return ['j', 'k', 'l'];
    case '6': return ['m', 'n', 'o'];
    case '7': return ['p', 'q', 'r', 's'];
    case '8': return ['t', 'u', 'v'];
    case '9': return ['w', 'x', 'y', 'z'];
    default: return []
  }
}

// @lc code=end

