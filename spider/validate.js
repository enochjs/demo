const fs = require('fs')
const path = require('path')

const contentsCn = [
  {
    "name": "创世记",
    "length": "50"
  },
  {
    "name": "出埃及记",
    "length": "40"
  },
  {
    "name": "利未记",
    "length": "27"
  },
  {
    "name": "民数记",
    "length": "36"
  },
  {
    "name": "申命记",
    "length": "34"
  },
  {
    "name": "约书亚记",
    "length": "24"
  },
  {
    "name": "士师记",
    "length": "21"
  },
  {
    "name": "路得记",
    "length": "4"
  },
  {
    "name": "撒母耳记上",
    "length": "31"
  },
  {
    "name": "撒母耳记下",
    "length": "24"
  },
  {
    "name": "列王记上",
    "length": "22"
  },
  {
    "name": "列王记下",
    "length": "25"
  },
  {
    "name": "历代志上",
    "length": "29"
  },
  {
    "name": "历代志下",
    "length": "36"
  },
  {
    "name": "以斯拉记",
    "length": "10"
  },
  {
    "name": "尼希米记",
    "length": "13"
  },
  {
    "name": "以斯帖记",
    "length": "10"
  },
  {
    "name": "约伯记",
    "length": "42"
  },
  {
    "name": "诗篇",
    "length": "150"
  },
  {
    "name": "箴言",
    "length": "31"
  },
  {
    "name": "传道书",
    "length": "12"
  },
  {
    "name": "雅歌",
    "length": "8"
  },
  {
    "name": "以赛亚书",
    "length": "66"
  },
  {
    "name": "耶利米书",
    "length": "52"
  },
  {
    "name": "耶利米哀歌",
    "length": "5"
  },
  {
    "name": "以西结书",
    "length": "48"
  },
  {
    "name": "但以理书",
    "length": "12"
  },
  {
    "name": "何西阿书",
    "length": "14"
  },
  {
    "name": "约珥书",
    "length": "3"
  },
  {
    "name": "阿摩司书",
    "length": "9"
  },
  {
    "name": "俄巴底亚书",
    "length": 1
  },
  {
    "name": "约拿书",
    "length": "4"
  },
  {
    "name": "弥迦书",
    "length": "7"
  },
  {
    "name": "那鸿书",
    "length": "3"
  },
  {
    "name": "哈巴谷书",
    "length": "3"
  },
  {
    "name": "西番雅书",
    "length": "3"
  },
  {
    "name": "哈该书",
    "length": "2"
  },
  {
    "name": "撒迦利亚",
    "length": "14"
  },
  {
    "name": "玛拉基书",
    "length": "4"
  },
  {
    "name": "马太福音",
    "length": "28"
  },
  {
    "name": "马可福音",
    "length": "16"
  },
  {
    "name": "路加福音",
    "length": "24"
  },
  {
    "name": "约翰福音",
    "length": "21"
  },
  {
    "name": "使徒行传",
    "length": "28"
  },
  {
    "name": "罗马书",
    "length": "16"
  },
  {
    "name": "哥林多前书",
    "length": "16"
  },
  {
    "name": "哥林多後书",
    "length": "13"
  },
  {
    "name": "加拉太书",
    "length": "6"
  },
  {
    "name": "以弗所书",
    "length": "6"
  },
  {
    "name": "腓立比书",
    "length": "4"
  },
  {
    "name": "歌罗西书",
    "length": "4"
  },
  {
    "name": "帖撒罗尼迦前书",
    "length": "5"
  },
  {
    "name": "帖撒罗尼迦後书",
    "length": "3"
  },
  {
    "name": "提摩太前书",
    "length": "6"
  },
  {
    "name": "提摩太後书",
    "length": "4"
  },
  {
    "name": "提多书",
    "length": "3"
  },
  {
    "name": "腓利门书",
    "length": 1
  },
  {
    "name": "希伯来书",
    "length": "13"
  },
  {
    "name": "雅各书",
    "length": "5"
  },
  {
    "name": "彼得前书",
    "length": "5"
  },
  {
    "name": "彼得後书",
    "length": "3"
  },
  {
    "name": "约翰一书",
    "length": "5"
  },
  {
    "name": "约翰二书",
    "length": 1
  },
  {
    "name": "约翰三书",
    "length": 1
  },
  {
    "name": "犹大书",
    "length": 1
  },
  {
    "name": "启示录",
    "length": "22"
  }
]

const contentsEn = [
  {
    name: 'Genesis',
    length: '50',
  },
  {
    name: 'Exodus',
    length: '40',
  },
  {
    name: 'Leviticus',
    length: '27',
  },
  {
    name: 'Numbers',
    length: '36',
  },
  {
    name: 'Deuteronomy',
    length: '34',
  },
  {
    name: 'Joshua',
    length: '24',
  },
  {
    name: 'Judges',
    length: '21',
  },
  {
    name: 'Ruth',
    length: '4',
  },
  {
    name: 'Samuel1',
    length: '31',
  },
  {
    name: 'Samuel2',
    length: '24',
  },
  {
    name: 'Kings1',
    length: '22',
  },
  {
    name: 'Kings2',
    length: '25',
  },
  {
    name: 'Chronicles1',
    length: '29',
  },
  {
    name: 'Chronicles2',
    length: '36',
  },
  {
    name: 'Ezra',
    length: '10',
  },
  {
    name: 'Nehemiah',
    length: '13',
  },
  {
    name: 'Esther',
    length: '10',
  },
  {
    name: 'Job',
    length: '42',
  },
  {
    name: 'Psalms',
    length: '150',
  },
  {
    name: 'Proverbs',
    length: '31',
  },
  {
    name: 'Ecclesiastes',
    length: '12',
  },
  {
    name: 'Song',
    length: '8',
  },
  {
    name: 'Isaiah',
    length: '66',
  },
  {
    name: 'Jeremiah',
    length: '52',
  },
  {
    name: 'Lamentations',
    length: '5',
  },
  {
    name: 'Ezekiel',
    length: '48',
  },
  {
    name: 'Daniel',
    length: '12',
  },
  {
    name: 'Hosea',
    length: '14',
  },
  {
    name: 'Joel',
    length: '3',
  },
  {
    name: 'Amos',
    length: '9',
  },
  {
    name: 'Obadiah',
    length: 1,
  },
  {
    name: 'Jonah',
    length: '4',
  },
  {
    name: 'Micah',
    length: '7',
  },
  {
    name: 'Nahum',
    length: '3',
  },
  {
    name: 'Habakkuk',
    length: '3',
  },
  {
    name: 'Zephaniah',
    length: '3',
  },
  {
    name: 'Haggai',
    length: '2',
  },
  {
    name: 'Zechariah',
    length: '14',
  },
  {
    name: 'Malachi',
    length: '4',
  },
  {
    name: 'Matthew',
    length: '28',
  },
  {
    name: 'Mark',
    length: '16',
  },
  {
    name: 'Luke',
    length: '24',
  },
  {
    name: 'John',
    length: '21',
  },
  {
    name: 'Acts',
    length: '28',
  },
  {
    name: 'Romans',
    length: '16',
  },
  {
    name: 'Corinthians1',
    length: '16',
  },
  {
    name: 'Corinthians2',
    length: '13',
  },
  {
    name: 'Galatians',
    length: '6',
  },
  {
    name: 'Ephesians',
    length: '6',
  },
  {
    name: 'Philippians',
    length: '4',
  },
  {
    name: 'Colossians',
    length: '4',
  },
  {
    name: 'Thessalonians1',
    length: '5',
  },
  {
    name: 'Thessalonians2',
    length: '3',
  },
  {
    name: 'Timothy1',
    length: '6',
  },
  {
    name: 'Timothy2',
    length: '4',
  },
  {
    name: 'Titus',
    length: '3',
  },
  {
    name: 'Philemon',
    length: 1,
  },
  {
    name: 'Hebrews',
    length: '13',
  },
  {
    name: 'James',
    length: '5',
  },
  {
    name: 'Peter1',
    length: '5',
  },
  {
    name: 'Peter2',
    length: '3',
  },
  {
    name: 'John1',
    length: '5',
  },
  {
    name: 'John2',
    length: 1,
  },
  {
    name: 'John3',
    length: 1,
  },
  {
    name: 'Jude',
    length: 1,
  },
  {
    name: 'Revelation',
    length: '22',
  },
]

const contents = contentsCn.map((item, index) => ({
  "nameCn": item.name,
  "nameEn": contentsEn[index].name,
  "length": item.length,
}))

console.log(contents)

// fs.readdir(path.resolve(__dirname, './src/chinese'), (err, files) => {
//   // console.log('.....files', files.length)

//   files.forEach(file => {
//     // const result = eval(require(file))
//     const result = contentsCn.find(item => item.name === file.split('.')[0])
//     fs.readFile(path.resolve(__dirname, `./src/chinese/${file}`), (err, data) => {
//       const obj = JSON.parse(data.toString())

//       let names = ''
//       const numbers = []

//       Object.keys(obj).forEach(key => {
//         const splits = key.split('-')
//         names = splits[0]
//         numbers.push(Number(splits[1]))
//       })

//       // numbers.sort((a, b) => a - b)

//       // console.log('....names', names, numbers.length)
//       const content = contentsCn.find((c) => c.name === names)
//       console.log('....', content, numbers.length, +content.length === +numbers.length)
//       if (Array.from(new Set(numbers)).length !== numbers.length || +content.length !== +numbers.length) {
//         console.log('.......', names)
//       }
      
//     })
//     result.has = true
//   })

//   // console.log('....contentsCn', contentsCn)
  
// })

// fs.readdir(path.resolve(__dirname, './src/english'), (err, files) => {
//   // console.log('.....files', files.length)

//   files.forEach(file => {
//     // const result = eval(require(file))
//     const result = contentsEn.find(item => item.name === file.split('.')[0])
//     fs.readFile(path.resolve(__dirname, `./src/english/${file}`), (err, data) => {
//       const obj = JSON.parse(data.toString())

//       let names = ''
//       const numbers = []

//       Object.keys(obj).forEach(key => {
//         const splits = key.split('-')
//         names = splits[0]
//         numbers.push(Number(splits[1]))
//       })

//       // numbers.sort((a, b) => a - b)

//       // console.log('....names', names, numbers.length)
//       const content = contentsEn.find((c) => c.name === names)
//       console.log('....', content, numbers.length, +content.length === +numbers.length)
//       if (Array.from(new Set(numbers)).length !== numbers.length || +content.length !== +numbers.length) {
//         console.log('.......', names)
//       }
      
//     })
//     result.has = true
//   })

//   // console.log('....contentsCn', contentsCn)
  
// })