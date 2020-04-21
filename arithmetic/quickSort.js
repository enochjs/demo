// 从数列中挑出一个元素，称为 "基准"（pivot）;
// 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序；


function quickSort(arr, left, right) {
  let leftIndex = left === undefined ? 0 : left
  let rightIndex = right === undefined ? arr.length - 1 : right
  console.log('......left', left, right)
  if (leftIndex < rightIndex) {
    let partitionIndex = partition(arr, leftIndex, rightIndex)
    quickSort(arr, leftIndex, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, rightIndex)
  }
  return arr
}

// 核心思想
// 就是将比他小的和比他大的位置交换，结束后的index就是比他大的第一个index
// storeIndex， 记录第一个比他大的数的位置，可与后来的比他小的值交换位置，然后storeIndex + 1；更新第一个比他大的数的位置
function partition(arr, left, right) {
  let storeIndex = left + 1
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < arr[left]) {
      swap(arr, i, storeIndex)
      storeIndex += 1
    }
  }
  swap(arr, left, storeIndex - 1)
  return storeIndex - 1
}

function swap(arr, i, j) {
  if (i === j) return
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


const result = quickSort([9,7,8,10,11,6,3,4])

console.log('.....result', result)