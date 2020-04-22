// （1）找出待排序的数组中最大和最小的元素
// （2）统计数组中每个值为i的元素出现的次数，存入数组C的第i项
// （3）对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）
// （4）反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1
// 如 1 3 7 8 9 3 1 0 最大的是9， bucket = new Array(9 + 1)
// 最终结果 
// bucket[1] = 2, bucket[3] = 2, bucket[7] = 1 ...

function countSort(arr) {
  let max = arr[0]
  for (let i = 1; i<arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  const bucket = new Array(max + 1)
  for (let i = 0; i<arr.length; i++) {
    if (bucket[arr[i]] === undefined) {
      bucket[arr[i]] = 1
    } else {
      bucket[arr[i]]++
    }
  }
  let index = 0
  for (let j=0; j<bucket.length; j++) {
    while (bucket[j] > 0) {
      arr[index] = j
      index++
      bucket[j]--
    }
  }
  console.log('....arr', arr)
  return arr
}
var arr = [3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6];

console.log('result.....', countSort(arr))