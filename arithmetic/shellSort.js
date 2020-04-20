// 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。
// 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
// 按增量序列个数 k，对序列进行 k 趟排序；
// 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。


function insertSort (arr) {
  for (let i=1; i<arr.length; i++) {
    const temp = arr[i]
    for (j=i-1; j >=0; j--) {
      if (temp > arr[j]) {
        break;
      }
      arr[j+1] = arr[j]
      arr[j] = temp
    }
  }
  console.log('....arr', arr)
}

function shellSort(arr) {
  let gap = arr/2
  
}
