
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  const middle = Math.floor(arr.length/2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

// merge 已经排好顺序的数组
function merge(left, right) {
  const result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  return result
}

const result = mergeSort([9,7,8,10,11,6,3,4])

console.log('.....result', result)