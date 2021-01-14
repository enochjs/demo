
// generater 实现 await
function _awaiter (generator) {
  return new Promise(function(resolve, reject) {
    function step(result) {
      result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
    }

    function fulfilled(value) {
      try {
        step(gen.next(value))
      } catch (error) {
        reject(error);
      }
    }

    function rejected(error) {
      try {
        generator.throw(error)
      } catch (e) {
        reject(e)
      }
    }
    const gen = generator()

    step(gen.next())

  })
}

_awaiter(function *() {
  const result = yield 1
  const result2 = yield new Promise((re) => re(result + 1))
  console.log(result2);
})
