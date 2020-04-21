// 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。
// 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
// 按增量序列个数 k，对序列进行 k 趟排序；
// 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
let count1 = 0
let count2 = 0

// const arr = []
// for (let i =0;i< 1000; i++) {
//   arr.push(Math.floor(Math.random()*1000))
//   console.log('....arr', arr)
// }

function shellSort1(arr) {
  var len = arr.length,
      gap = 1;
  while(gap < len/3) {          //动态定义间隔序列
      gap =gap*3+1;
  }
  for (gap; gap > 0; gap = Math.floor(gap/3)) {
    for (let i=0; i<gap; i++) {
      for (let j=gap; j<arr.length; j+=gap) {
        const temp = arr[j]
        for (let k=j-gap;k>=0; k-=gap) {
          if (temp >= arr[k]) {
            break
          }
          count1++
          arr[k+gap] = arr[k]
          arr[k] = temp
        }
      }
    }
  }
  console.log('.......count1', count1, arr)
  return arr
}

shellSort1([9,7,8,10,11,6,3,4])

function shellSort2(arr) {
  var len = arr.length,
      temp,
      gap = 1;
  while(gap < len/3) {          //动态定义间隔序列
      gap =gap*3+1;
  }
  for (gap; gap > 0; gap = Math.floor(gap/3)) {
      for (var i = gap; i < len; i++) {
          temp = arr[i];
          for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
            count2 ++
            arr[j+gap] = arr[j];
          }
          arr[j+gap] = temp;
      }
  }
  console.log('.....count2', count2, arr)
  return arr;
}
// test
shellSort2([9,7,8,10,11,6,3,4])

// console.log('.....result', result)