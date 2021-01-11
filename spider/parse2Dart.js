const fs = require('fs');
const path = require('path');
const axios = require('axios')

const contents = [
  {"cn": "创世记", "en": "Genesis", "length": 50, "index": 0},
  {"cn": "出埃及记", "en": "Exodus", "length": 40, "index": 1},
  {"cn": "利未记", "en": "Leviticus", "length": 27, "index": 2},
  {"cn": "民数记", "en": "Numbers", "length": 36, "index": 3},
  {"cn": "申命记", "en": "Deuteronomy", "length": 34, "index": 4},
  {"cn": "约书亚记", "en": "Joshua", "length": 24, "index": 5},
  {"cn": "士师记", "en": "Judges", "length": 21, "index": 6},
  {"cn": "路得记", "en": "Ruth", "length": 4, "index": 7},
  {"cn": "撒母耳记上", "en": "Samuel1", "length": 31, "index": 8},
  {"cn": "撒母耳记下", "en": "Samuel2", "length": 24, "index": 9},
  {"cn": "列王记上", "en": "Kings1", "length": 22, "index": 10},
  {"cn": "列王记下", "en": "Kings2", "length": 25, "index": 11},
  {"cn": "历代志上", "en": "Chronicles1", "length": 29, "index": 12},
  {"cn": "历代志下", "en": "Chronicles2", "length": 36, "index": 13},
  {"cn": "以斯拉记", "en": "Ezra", "length": 10, "index": 14},
  {"cn": "尼希米记", "en": "Nehemiah", "length": 13, "index": 15},
  {"cn": "以斯帖记", "en": "Esther", "length": 10, "index": 16},
  {"cn": "约伯记", "en": "Job", "length": 42, "index": 17},
  {"cn": "诗篇", "en": "Psalms", "length": 150, "index": 18},
  {"cn": "箴言", "en": "Proverbs", "length": 31, "index": 19},
  {"cn": "传道书", "en": "Ecclesiastes", "length": 12, "index": 20},
  {"cn": "雅歌", "en": "Song", "length": 8, "index": 21},
  {"cn": "以赛亚书", "en": "Isaiah", "length": 66, "index": 22},
  {"cn": "耶利米书", "en": "Jeremiah", "length": 52, "index": 23},
  {"cn": "耶利米哀歌", "en": "Lamentations", "length": 5, "index": 24},
  {"cn": "以西结书", "en": "Ezekiel", "length": 48, "index": 25},
  {"cn": "但以理书", "en": "Daniel", "length": 12, "index": 26},
  {"cn": "何西阿书", "en": "Hosea", "length": 14, "index": 27},
  {"cn": "约珥书", "en": "Joel", "length": 3, "index": 28},
  {"cn": "阿摩司书", "en": "Amos", "length": 9, "index": 29},
  {"cn": "俄巴底亚书", "en": "Obadiah", "length": 1, "index": 30},
  {"cn": "约拿书", "en": "Jonah", "length": 4, "index": 31},
  {"cn": "弥迦书", "en": "Micah", "length": 7, "index": 32},
  {"cn": "那鸿书", "en": "Nahum", "length": 3, "index": 33},
  {"cn": "哈巴谷书", "en": "Habakkuk", "length": 3, "index": 34},
  {"cn": "西番雅书", "en": "Zephaniah", "length": 3, "index": 35},
  {"cn": "哈该书", "en": "Haggai", "length": 2, "index": 36},
  {"cn": "撒迦利亚", "en": "Zechariah", "length": 14, "index": 37},
  {"cn": "玛拉基书", "en": "Malachi", "length": 4, "index": 38},
  {"cn": "马太福音", "en": "Matthew", "length": 28, "index": 39},
  {"cn": "马可福音", "en": "Mark", "length": 16, "index": 40},
  {"cn": "路加福音", "en": "Luke", "length": 24, "index": 41},
  {"cn": "约翰福音", "en": "John", "length": 21, "index": 42},
  {"cn": "使徒行传", "en": "Acts", "length": 28, "index": 43},
  {"cn": "罗马书", "en": "Romans", "length": 16, "index": 44},
  {"cn": "哥林多前书", "en": "Corinthians1", "length": 16, "index": 45},
  {"cn": "哥林多后书", "en": "Corinthians2", "length": 13, "index": 46},
  {"cn": "加拉太书", "en": "Galatians", "length": 6, "index": 47},
  {"cn": "以弗所书", "en": "Ephesians", "length": 6, "index": 48},
  {"cn": "腓立比书", "en": "Philippians", "length": 4, "index": 49},
  {"cn": "歌罗西书", "en": "Colossians", "length": 4, "index": 50},
  {"cn": "帖撒罗尼迦前书", "en": "Thessalonians1", "length": 5, "index": 51},
  {"cn": "帖撒罗尼迦后书", "en": "Thessalonians2", "length": 3, "index": 52},
  {"cn": "提摩太前书", "en": "Timothy1", "length": 6, "index": 53},
  {"cn": "提摩太后书", "en": "Timothy2", "length": 4, "index": 54},
  {"cn": "提多书", "en": "Titus", "length": 3, "index": 55},
  {"cn": "腓利门书", "en": "Philemon", "length": 1, "index": 56},
  {"cn": "希伯来书", "en": "Hebrews", "length": 13, "index": 57},
  {"cn": "雅各书", "en": "James", "length": 5, "index": 58},
  {"cn": "彼得前书", "en": "Peter1", "length": 5, "index": 59},
  {"cn": "彼得后书", "en": "Peter2", "length": 3, "index": 60},
  {"cn": "约翰一书", "en": "John1", "length": 5, "index": 61},
  {"cn": "约翰二书", "en": "John2", "length": 1, "index": 62},
  {"cn": "约翰三书", "en": "John3", "length": 1, "index": 63},
  {"cn": "犹大书", "en": "Jude", "length": 1, "index": 64},
  {"cn": "启示录", "en": "Revelation", "length": 22, "index": 65}
];

// console.log(result.length);

function writeMp3(url, writePath) {
  // const pathCn = path.resolve(__dirname,  `mp3/chinese/${nameCn}/${count + index + 1}.mp3`)
  const writer = fs.createWriteStream(path.resolve(__dirname,  writePath))
  // const writer = fs.createWriteStream(outputLocationPath);

  return axios({
    method: 'get',
    url,
    responseType: 'stream',
    headers: {
      Referer: 'http://sj.jidujiao.com/'
    }
  }).then(response => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}


async function run (item){

    // let item = result.pop();
    let promises = []
    fs.readdir(`./mp3/english/${item.en}`, (err, files) => {
      // console.log('///', files.length, item)
      // const urlCn = `http://jiaoxue.jidujiao.com/mp3/${encodeURIComponent(nameCn)}/${encodeURIComponent(`${nameCn}第${count + index + 1}章`)}.mp3`
      // let nothas = [];
      for (let i = 0; i < item.length; i++) {
        // const element = array[i];
        const has = files.find((f => {
          // console.log(f.slice(0, -4))
          // f.slice(0, -3) === i.toString();
          return f.slice(0, -4) === i.toString()
        }))
        if (!has) {
          const urlEn = `http://jiaoxue.jidujiao.com/mp3en/${encodeURIComponent(item.cn)}/${encodeURIComponent(`${item.cn}第${i + 1}章`)}.mp3`
          console.log(urlEn);
          promises.push(writeMp3(urlEn, `mp3/english/${item.en}/${i}.mp3`))
        }
        // await writeMp3(urlEn, `mp3/english/${nameEn}/${count + index + 1}.mp3`)
        // console.log(has)
        
      }
    })
    await Promise.all(promises).catch(e => {
      console.log(e);
    })
}

// run()

// result.forEach((item) => {
  
// })

var result = '['
// console.log(result.length);

contents.forEach(async (item) => {
  const files = fs.readdirSync(`./mp3/english/${item.en}`);
  if (files.length !== item.length) {
    result+=JSON.stringify(item) + ',\n';
  }
})
console.log(result)


result = [{
  "cn":"创世记","en":"Genesis","length":50,"index":0},
  {"cn":"出埃及记","en":"Exodus","length":40,"index":1},
  {"cn":"利未记","en":"Leviticus","length":27,"index":2},
  {"cn":"民数记","en":"Numbers","length":36,"index":3},
  {"cn":"申命记","en":"Deuteronomy","length":34,"index":4},
  {"cn":"约书亚记","en":"Joshua","length":24,"index":5},
  {"cn":"士师记","en":"Judges","length":21,"index":6},
  {"cn":"撒母耳记上","en":"Samuel1","length":31,"index":8},
  {"cn":"撒母耳记下","en":"Samuel2","length":24,"index":9},
  {"cn":"列王记上","en":"Kings1","length":22,"index":10},
  {"cn":"列王记下","en":"Kings2","length":25,"index":11},
  {"cn":"历代志上","en":"Chronicles1","length":29,"index":12},
  {"cn":"历代志下","en":"Chronicles2","length":36,"index":13},
  {"cn":"以斯拉记","en":"Ezra","length":10,"index":14},
  {"cn":"尼希米记","en":"Nehemiah","length":13,"index":15},
  {"cn":"以斯帖记","en":"Esther","length":10,"index":16},
  {"cn":"约伯记","en":"Job","length":42,"index":17},
  {"cn":"诗篇","en":"Psalms","length":150,"index":18},
  {"cn":"箴言","en":"Proverbs","length":31,"index":19},
  {"cn":"传道书","en":"Ecclesiastes","length":12,"index":20},
  {"cn":"雅歌","en":"Song","length":8,"index":21},
  {"cn":"以赛亚书","en":"Isaiah","length":66,"index":22},
  {"cn":"耶利米书","en":"Jeremiah","length":52,"index":23},
  {"cn":"耶利米哀歌","en":"Lamentations","length":5,"index":24},
  {"cn":"以西结书","en":"Ezekiel","length":48,"index":25},
  {"cn":"但以理书","en":"Daniel","length":12,"index":26},
  {"cn":"何西阿书","en":"Hosea","length":14,"index":27},
  {"cn":"约珥书","en":"Joel","length":3,"index":28},
  {"cn":"阿摩司书","en":"Amos","length":9,"index":29},
  {"cn":"撒迦利亚","en":"Zechariah","length":14,"index":37},
  {"cn":"马太福音","en":"Matthew","length":28,"index":39},
  {"cn":"马可福音","en":"Mark","length":16,"index":40},
  {"cn":"路加福音","en":"Luke","length":24,"index":41},
  {"cn":"约翰福音","en":"John","length":21,"index":42},
  {"cn":"使徒行传","en":"Acts","length":28,"index":43},
  {"cn":"罗马书","en":"Romans","length":16,"index":44},
  {"cn":"哥林多前书","en":"Corinthians1","length":16,"index":45},
  {"cn":"哥林多后书","en":"Corinthians2","length":13,"index":46},
  {"cn":"加拉太书","en":"Galatians","length":6,"index":47},
  {"cn":"提摩太前书","en":"Timothy1","length":6,"index":53},
  {"cn":"提摩太后书","en":"Timothy2","length":4,"index":54},
  {"cn":"希伯来书","en":"Hebrews","length":13,"index":57},
  {"cn":"启示录","en":"Revelation","length":22,"index":65},
]
// async function name(){
//   while(result.length) {
//     let item = result.pop();
//     console.log('.....', item);
//     await run(item);
//   }
// }
let index=0
// setInterval(() => {
//   run(result[index])
//   index++
// }, 5000)

// run(result[5])

// name()
