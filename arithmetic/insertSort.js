//
// 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
// 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
// 插入排序就是认为在已经排好的序列里面插入一个数据： 如 从小到大排序
// 首先认为第一个数据是排好的，从第二个数据开始插入，把数据插入到比他小和比他大之间的位置
//

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

// function insertionSort(arr) {
//   var len = arr.length;
//   var preIndex, current;
//   for (var i = 1; i < len; i++) {
//       preIndex = i - 1;
//       current = arr[i];
//       while(preIndex >= 0 && arr[preIndex] > current) {
//           arr[preIndex+1] = arr[preIndex];
//           preIndex--;
//       }
//       arr[preIndex+1] = current;
//   }
//   return arr;
// }

insertSort([1,4,5,7,2,3,4,8,0,12,34])

exports.insertSort
