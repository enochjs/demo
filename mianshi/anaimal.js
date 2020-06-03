const Animal = {
  name: 'cat'
}

const animal1 = Object.create(Animal)

delete animal1.name

console.log(animal1)