function getCubeRoot(value) {
  let right = value
  let left = 0;
  console.log(left-right)
  while(!(left-right < 0.5 && left-right > - 0.5)) {
    
    let base = (right + left) / 2;
    let result = base * base * base
    if (result < value) {
      left = base
    } else if (result > value) {
      right = base
    } else {
      left = right = base
    }
  }
  console.log(left.toFixed(1))
}

getCubeRoot(12)