function single() {
    let singleInstance = null
    function createSingle () {
        if (singleInstance) {
            return singleInstance
        }
        this.init()
        singleInstance = this
        return singleInstance
    }

    createSingle.prototype.init = function() {
        // this.name = 
    }

    return createSingle
}


let createSingle = single()



var a = new createSingle()

var b = new createSingle()

console.log('a===b', a === b)



function single2() {
    let singleInstance = null
    function createSingle (name) {
        if (singleInstance) {
            return singleInstance
        }
        singleInstance = new SingleClass(name)
        return singleInstance
    }
    class SingleClass {
        constructor(name) {
            this.name = name
            return this
        }
    }

    return createSingle
}



let createSingle2 = single2()



var a = new createSingle2('aaaa')

var b = new createSingle2('bbbb')

console.log('a===b', a === b, a.name, b.name)
