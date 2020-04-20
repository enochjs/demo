// 选择排序
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
// 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
// 重复第二步，直到所有元素均排序完毕。
// 记录下最小的那个位置，然后开始交换

function selectionSort(arr) {
  for (let i=0; i<arr.length; i++) {
    let minIndex = i
    for (let j=i; j<arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp 
  }
}

// test
selectionSort([1,4,5,7,2,3,4,8,0,12,34])