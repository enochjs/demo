function Store (data) {

    this.data = data
    this.middlewares = []

    this.dispatch = function() {
        console.log('....', this.middlewares)
        
        const dispatch = (i) => {
            index = i
            let fn = this.middlewares[i]
            if (i === this.middlewares.length) return
            return fn(this.data, () => dispatch(i + 1))
        }
        dispatch(0)
    }
}

Store.prototype.use = function (fn) {
    this.middlewares.push(fn)
}

let store = new Store([1,2,3,4])

store.use((data, next) => {
    console.log('log data', data)
    next()
    console.log('end 1')
})

store.use((data, next) => {
    console.log('log data2', data)
    next()
    console.log('end2')
})
store.dispatch()
