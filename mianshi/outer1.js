var a = 1
function outer () {
  var a = 2
  function inner() {
    a++
    console.log(a)
    var a = 3;
    console.log(a);
  }
  inner()
}
outer()