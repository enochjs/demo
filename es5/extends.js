function A () {
  this.name = 'A';
  this.play = [1, 2, 3];
}


function B () {
  A.call(this);
  this.type = 'B';
}

B.prototype = Object.create(A.prototype)

B.prototype.constructor = B;
B.prototype.constructor.name = B.name

var a = new A()
var b = new B()
b.play.push(4)

console.log(a.play)
console.log(b.play)
console.log(a)
console.log(b)


