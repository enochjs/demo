// 冒泡排序
// 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
// 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
// 针对所有的元素重复以上的步骤，除了最后一个。
// 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
function bubbleSort (arr) {
  for (let i=0; i<arr.length; i++) {
    for(j=i+1; j<arr.length; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = k
      }
    }
  }
  console.log(arr)
  return arr
}

// test
bubbleSort([1,4,5,7,2,3,4,8,0,12,34])