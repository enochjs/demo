let count = { test: 1}

function increment () {
  count.test = 2
}

setTimeout(() => {
    console.log(count)
}, 2000);



module.exports = {
  count,
  increment,
}

// exports.count = 2