//堆是一种特殊的树，只要满足下面两个条件，它就是一个堆：

// （1）堆是一颗完全二叉树；

// （2）堆中某个节点的值总是不大于（或不小于）其父节点的值。

// 其中，我们把根节点最大的堆叫做大顶堆，根节点最小的堆叫做小顶堆。

// 完全二叉树是指除了最后一层其它层都达到最大节点数，且最后一层节点都靠左排列。如下图
/*                        ┌─────┐             
 *                 ┌──────│  1  │─────┐       
 *                 │      └─────┘     │       
 *                 ▼                  ▼       
 *              ┌────┐             ┌────┐     
 *           ┌──│ 2  │───┐       ┌─│ 3  │──┐  
 *           │  └────┘   │       │ └────┘  │  
 *           │           │       │         │  
 *           ▼           ▼       ▼         ▼  
 *        ┌────┐      ┌────┐  ┌────┐    ┌────┐
 *      ┌─│ 4  │──┐   │ 5  │  │ 6  │    │ 7  │
 *      │ └────┘  │   └────┘  └────┘    └────┘
 *      │         │                           
 *      ▼         ▼                           
 *   ┌────┐    ┌────┐                         
 *   │ 8  │    │ 9  │                         
 *   └────┘    └────┘                         
 */      
// 在数组中存储 即 1 2 3 4 5 6 7 8 9     
// 所以 第 i 个节点的子节点 就是 2 * i + 1，2 * i + 2
// 创建堆 遍历for (i=0; i< Math.floor(arr.length/2); i++)    
// 然后 对节点排序保证 堆中某个节点的值总是不大于（或不小于）其父节点的值。
// 因为每个子节点的值总小于或大于父节点，所以遍历最好是从最后面的节点开始，这样就可以保证交换的时候，最后最大的或是最小的会在前面
// for(i=Math.floor(arr.length/2); i>=0; i--)
// 堆排序就是， 每次把生成的堆，取出第一个跟最后一个置换， 然后从倒数第二个开始 继续 生成新的堆
// 比如 1 2 4 5 6 8 9 0，中 最大的是9， 生成堆之后， 9就是我想要数，把9 和最后一个置换，  然后从剩下的数里面继续生成堆，得到最大的... 知道只剩下 一个数，最后的顺序就是拍好的
function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function createHeap(arr, length) {
  for (i=Math.floor(length/2); i>=0; i--) {
    const left = 2 * i + 1
    const right = left + 1
    if (left < length && arr[i] < arr[left]) {
      swap(arr, i, left)
    }
    if (right < length && arr[i] < arr[right]) {
      swap(arr, i, right)
    }
  }
  return arr
}

function heapSort(arr) {
  for (let i=arr.length; i > 0; i--) {
    createHeap(arr, i)
    swap(arr, i - 1, 0)
  }
  return arr
}

const result = heapSort([9,7,8,10,11,6,3,4])

console.log('.....result', result)
// var arr = [3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6];

// console.log('result.....', heapSort(arr))
