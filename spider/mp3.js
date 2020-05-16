const fs = require('fs');
const path = require('path');
const http = require('http')
const contentsCn = [
  { nameCn: '创世记', nameEn: 'Genesis', length: '50' },
  { nameCn: '出埃及记', nameEn: 'Exodus', length: '40' },
  { nameCn: '利未记', nameEn: 'Leviticus', length: '27' },
  { nameCn: '民数记', nameEn: 'Numbers', length: '36' },
  { nameCn: '申命记', nameEn: 'Deuteronomy', length: '34' },
  { nameCn: '约书亚记', nameEn: 'Joshua', length: '24' },
  { nameCn: '士师记', nameEn: 'Judges', length: '21' },
  { nameCn: '路得记', nameEn: 'Ruth', length: '4' },
  { nameCn: '撒母耳记上', nameEn: 'Samuel1', length: '31' },
  { nameCn: '撒母耳记下', nameEn: 'Samuel2', length: '24' },
  { nameCn: '列王记上', nameEn: 'Kings1', length: '22' },
  { nameCn: '列王记下', nameEn: 'Kings2', length: '25' },
  { nameCn: '历代志上', nameEn: 'Chronicles1', length: '29' },
  { nameCn: '历代志下', nameEn: 'Chronicles2', length: '36' },
  { nameCn: '以斯拉记', nameEn: 'Ezra', length: '10' },
  { nameCn: '尼希米记', nameEn: 'Nehemiah', length: '13' },
  { nameCn: '以斯帖记', nameEn: 'Esther', length: '10' },
  { nameCn: '约伯记', nameEn: 'Job', length: '42' },
  { nameCn: '诗篇', nameEn: 'Psalms', length: '150' },
  { nameCn: '箴言', nameEn: 'Proverbs', length: '31' },
  { nameCn: '传道书', nameEn: 'Ecclesiastes', length: '12' },
  { nameCn: '雅歌', nameEn: 'Song', length: '8' },
  { nameCn: '以赛亚书', nameEn: 'Isaiah', length: '66' },
  { nameCn: '耶利米书', nameEn: 'Jeremiah', length: '52' },
  { nameCn: '耶利米哀歌', nameEn: 'Lamentations', length: '5' },
  { nameCn: '以西结书', nameEn: 'Ezekiel', length: '48' },
  { nameCn: '但以理书', nameEn: 'Daniel', length: '12' },
  { nameCn: '何西阿书', nameEn: 'Hosea', length: '14' },
  { nameCn: '约珥书', nameEn: 'Joel', length: '3' },
  { nameCn: '阿摩司书', nameEn: 'Amos', length: '9' },
  { nameCn: '俄巴底亚书', nameEn: 'Obadiah', length: 1 },
  { nameCn: '约拿书', nameEn: 'Jonah', length: '4' },
  { nameCn: '弥迦书', nameEn: 'Micah', length: '7' },
  { nameCn: '那鸿书', nameEn: 'Nahum', length: '3' },
  { nameCn: '哈巴谷书', nameEn: 'Habakkuk', length: '3' },
  { nameCn: '西番雅书', nameEn: 'Zephaniah', length: '3' },
  { nameCn: '哈该书', nameEn: 'Haggai', length: '2' },
  { nameCn: '撒迦利亚', nameEn: 'Zechariah', length: '14' },
  { nameCn: '玛拉基书', nameEn: 'Malachi', length: '4' },
  { nameCn: '马太福音', nameEn: 'Matthew', length: '28' },
  { nameCn: '马可福音', nameEn: 'Mark', length: '16' },
  { nameCn: '路加福音', nameEn: 'Luke', length: '24' },
  { nameCn: '约翰福音', nameEn: 'John', length: '21' },
  { nameCn: '使徒行传', nameEn: 'Acts', length: '28' },
  { nameCn: '罗马书', nameEn: 'Romans', length: '16' },
  { nameCn: '哥林多前书', nameEn: 'Corinthians1', length: '16' },
  { nameCn: '哥林多後书', nameEn: 'Corinthians2', length: '13' },
  { nameCn: '加拉太书', nameEn: 'Galatians', length: '6' },
  { nameCn: '以弗所书', nameEn: 'Ephesians', length: '6' },
  { nameCn: '腓立比书', nameEn: 'Philippians', length: '4' },
  { nameCn: '歌罗西书', nameEn: 'Colossians', length: '4' },
  { nameCn: '帖撒罗尼迦前书', nameEn: 'Thessalonians1', length: '5' },
  { nameCn: '帖撒罗尼迦後书', nameEn: 'Thessalonians2', length: '3' },
  { nameCn: '提摩太前书', nameEn: 'Timothy1', length: '6' },
  { nameCn: '提摩太後书', nameEn: 'Timothy2', length: '4' },
  { nameCn: '提多书', nameEn: 'Titus', length: '3' },
  { nameCn: '腓利门书', nameEn: 'Philemon', length: 1 },
  { nameCn: '希伯来书', nameEn: 'Hebrews', length: '13' },
  { nameCn: '雅各书', nameEn: 'James', length: '5' },
  { nameCn: '彼得前书', nameEn: 'Peter1', length: '5' },
  { nameCn: '彼得後书', nameEn: 'Peter2', length: '3' },
  { nameCn: '约翰一书', nameEn: 'John1', length: '5' },
  { nameCn: '约翰二书', nameEn: 'John2', length: 1 },
  { nameCn: '约翰三书', nameEn: 'John3', length: 1 },
  { nameCn: '犹大书', nameEn: 'Jude', length: 1 },
  { nameCn: '启示录', nameEn: 'Revelation', length: '22' }
];

(async () => {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // await page.setCookie({ name: 'bible', value: '2', domain: '.sj.jidujiao.com', path: '/' })

  // await page.goto('http://sj.jidujiao.com');

  // const page = await browser.newPage();
  // const url = `http://jiaoxue.jidujiao.com/mp3en/${name}/${name}第${index + 1}章.mp3`
  // const url = 'http://jiaoxue.jidujiao.com/mp3en/%E5%88%9B%E4%B8%96%E8%AE%B0/%E5%88%9B%E4%B8%96%E8%AE%B0%E7%AC%AC1%E7%AB%A0.mp3'
  // const writeStream = fs.createWriteStream(path.resolve(__dirname, `mp3/english/创世记第1章.mp3`))
  // http.get(url, (res) => {
  //   console.log('res', res)
  //   res.pipe(writeStream)
  // })

  // await page.goto(url);

  const chunkLength = 2
  console.log('contentsCn', contentsCn)
  while (contentsCn.length) {
    const content = contentsCn.pop();
    const length = +content.length;
    const nameCn = content.nameCn;
    const nameEn = content.nameEn;
    let count = 0;

    while (count < length) {
      console.log('.....count', count)
      await new Promise((re) => {
        setTimeout(() => {
          console.log('...timeout')
          re(true)
        }, 1000);
      })
      await Promise.all(Array.from({length: chunkLength}).map(async(item, index) =>  {
        if (count + index >= length) {
          return true
        }
        const urlEn = `http://jiaoxue.jidujiao.com/mp3en/${encodeURIComponent(nameCn)}/${encodeURIComponent(`${nameCn}第${count + index + 1}章`)}.mp3`
        const urlCn = `http://jiaoxue.jidujiao.com/mp3/${encodeURIComponent(nameCn)}/${encodeURIComponent(`${nameCn}第${count + index + 1}章`)}.mp3`
        const dirEn = path.resolve(__dirname,  `mp3/english/${nameEn}`)
        const dirCn = path.resolve(__dirname,  `mp3/chinese/${nameCn}`)
        if (!fs.existsSync(path.resolve(__dirname,  dirEn))) {
          fs.mkdirSync(dirEn);
        }
        if (!fs.existsSync(path.resolve(__dirname,  dirCn))) {
          fs.mkdirSync(dirCn);
        }
        // const writeStreamEn = fs.createWriteStream(path.resolve(__dirname,  `mp3/english/${nameEn}/${count + index + 1}.mp3`))
        const writeStreamCn = fs.createWriteStream(path.resolve(__dirname,  `mp3/chinese/${nameCn}/${count + index + 1}.mp3`))

        console.log('.....urlEn', urlEn)
        // console.log('.....urlCn', urlCn)
        // http.get(urlEn, (res) => {
        //   // console.log('res', res)
        //   res.pipe(writeStreamEn)
        // })
        http.get(urlCn, (res) => {
          // console.log('res', res)
          res.pipe(writeStreamCn)
        })
        return true
      }))
      console.log('.....count', count, chunkLength)
      count += chunkLength
      console.log('.....count', count)
    }
  }
  console.log('.....end')
})();

