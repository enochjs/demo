const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')
const lodash = require('lodash')

const contents = [
  { nameEn: 'Genesis', nameCn: '创世记', index: 1 },
  { nameEn: 'Exodus', nameCn: '出埃及记', index: 2 },
  { nameEn: 'Leviticus', nameCn: '利未记', index: 3 },
  { nameEn: 'Numbers', nameCn: '民数记', index: 4 },
  { nameEn: 'Deuteronomy', nameCn: '申命记', index: 5 },
  { nameEn: 'Joshua', nameCn: '约书亚记', index: 6 },
  { nameEn: 'Judges', nameCn: '士师记', index: 7 },
  { nameEn: 'Ruth', nameCn: '路得记', index: 8 },
  { nameEn: 'Samuel1', nameCn: '撒母耳记上', index: 9 },
  { nameEn: 'Samuel2', nameCn: '撒母耳记下', index: 10 },
  { nameEn: 'Kings1', nameCn: '列王记上', index: 11 },
  { nameEn: 'Kings2', nameCn: '列王记下', index: 12 },
  { nameEn: 'Chronicles1', nameCn: '历代志上', index: 13 },
  { nameEn: 'Chronicles2', nameCn: '历代志下', index: 14 },
  { nameEn: 'Ezra', nameCn: '以斯拉记', index: 15 },
  { nameEn: 'Nehemiah', nameCn: '尼希米记', index: 16 },
  { nameEn: 'Esther', nameCn: '以斯帖记', index: 17 },
  { nameEn: 'Job', nameCn: '约伯记', index: 18 },
  { nameEn: 'Psalms', nameCn: '诗篇', index: 19 },
  { nameEn: 'Proverbs', nameCn: '箴言', index: 20 },
  { nameEn: 'Ecclesiastes', nameCn: '传道书', index: 21 },
  { nameEn: 'Song', nameCn: '雅歌', index: 22 },
  { nameEn: 'Isaiah', nameCn: '以赛亚书', index: 23 },
  { nameEn: 'Jeremiah', nameCn: '耶利米书', index: 24 },
  { nameEn: 'Lamentations', nameCn: '耶利米哀歌', index: 25 },
  { nameEn: 'Ezekiel', nameCn: '以西结书', index: 26 },
  { nameEn: 'Daniel', nameCn: '但以理书', index: 27 },
  { nameEn: 'Hosea', nameCn: '何西阿书', index: 28 },
  { nameEn: 'Joel', nameCn: '约珥书', index: 29 },
  { nameEn: 'Amos', nameCn: '阿摩司书', index: 30 },
  { nameEn: 'Obadiah', nameCn: '俄巴底亚书', index: 31 },
  { nameEn: 'Jonah', nameCn: '约拿书', index: 32 },
  { nameEn: 'Micah', nameCn: '弥迦书', index: 33 },
  { nameEn: 'Nahum', nameCn: '那鸿书', index: 34 },
  { nameEn: 'Habakkuk', nameCn: '哈巴谷书', index: 35 },
  { nameEn: 'Zephaniah', nameCn: '西番雅书', index: 36 },
  { nameEn: 'Haggai', nameCn: '哈该书', index: 37 },
  { nameEn: 'Zechariah', nameCn: '撒迦利亚', index: 38 },
  { nameEn: 'Malachi', nameCn: '玛拉基书', index: 39 },
  { nameEn: 'Matthew', nameCn: '马太福音', index: 40 },
  { nameEn: 'Mark', nameCn: '马可福音', index: 41 },
  { nameEn: 'Luke', nameCn: '路加福音', index: 42 },
  { nameEn: 'John', nameCn: '约翰福音', index: 43 },
  { nameEn: 'Acts', nameCn: '使徒行传', index: 44 },
  { nameEn: 'Romans', nameCn: '罗马书', index: 45 },
  { nameEn: 'Corinthians1', nameCn: '哥林多前书', index: 46 },
  { nameEn: 'Corinthians2', nameCn: '哥林多後书', index: 47 },
  { nameEn: 'Galatians', nameCn: '加拉太书', index: 48 },
  { nameEn: 'Ephesians', nameCn: '以弗所书', index: 49 },
  { nameEn: 'Philippians', nameCn: '腓立比书', index: 50 },
  { nameEn: 'Colossians', nameCn: '歌罗西书', index: 51 },
  { nameEn: 'Thessalonians1', nameCn: '帖撒罗尼迦前书', index: 52 },
  { nameEn: 'Thessalonians2', nameCn: '帖撒罗尼迦後书', index: 53 },
  { nameEn: 'Timothy1', nameCn: '提摩太前书', index: 54 },
  { nameEn: 'Timothy2', nameCn: '提摩太後书', index: 55 },
  { nameEn: 'Titus', nameCn: '提多书', index: 56 },
  { nameEn: 'Philemon', nameCn: '腓利门书', index: 57 },
  { nameEn: 'Hebrews', nameCn: '希伯来书', index: 58 },
  { nameEn: 'James', nameCn: '雅各书', index: 59 },
  { nameEn: 'Peter1', nameCn: '彼得前书', index: 60 },
  { nameEn: 'Peter2', nameCn: '彼得後书', index: 61 },
  { nameEn: 'John1', nameCn: '约翰一书', index: 62 },
  { nameEn: 'John2', nameCn: '约翰二书', index: 63 },
  { nameEn: 'John3', nameCn: '约翰三书', index: 64 },
  { nameEn: 'Jude', nameCn: '犹大书', index: 65 },
  { nameEn: 'Revelation', nameCn: '启示录', index: 66 }
];

const pages = [
  'http://sj.jidujiao.com/Genesis_1.html',
  'http://sj.jidujiao.com/Exodus_2.html',
  'http://sj.jidujiao.com/Leviticus_3.html',
  'http://sj.jidujiao.com/Numbers_4.html',
  'http://sj.jidujiao.com/Deuteronomy_5.html',
  'http://sj.jidujiao.com/Joshua_6.html',
  'http://sj.jidujiao.com/Judges_7.html',
  'http://sj.jidujiao.com/Ruth_8.html',
  'http://sj.jidujiao.com/1-Samuel_9.html',
  'http://sj.jidujiao.com/2-Samuel_10.html',
  'http://sj.jidujiao.com/1-Kings_11.html',
  'http://sj.jidujiao.com/2-Kings_12.html',
  'http://sj.jidujiao.com/1-Chronicles_13.html',
  'http://sj.jidujiao.com/2-Chronicles_14.html',
  'http://sj.jidujiao.com/Ezra_15.html',
  'http://sj.jidujiao.com/Nehemiah_16.html',
  'http://sj.jidujiao.com/Esther_17.html',
  'http://sj.jidujiao.com/Job_18.html',
  'http://sj.jidujiao.com/Psalms_19.html',
  'http://sj.jidujiao.com/Proverbs_20.html',
  'http://sj.jidujiao.com/Ecclesiastes_21.html',
  'http://sj.jidujiao.com/Song-of-Songs_22.html',
  'http://sj.jidujiao.com/Isaiah_23.html',
  'http://sj.jidujiao.com/Jeremiah_24.html',
  'http://sj.jidujiao.com/Lamentations_25.html',
  'http://sj.jidujiao.com/Ezekiel_26.html',
  'http://sj.jidujiao.com/Daniel_27.html',
  'http://sj.jidujiao.com/Hosea_28.html',
  'http://sj.jidujiao.com/Joel_29.html',
  'http://sj.jidujiao.com/Amos_30.html',
  'http://sj.jidujiao.com/Obadiah_31.html',
  'http://sj.jidujiao.com/Jonah_32.html',
  'http://sj.jidujiao.com/Micah_33.html',
  'http://sj.jidujiao.com/Nahum_34.html',
  'http://sj.jidujiao.com/Habakkuk_35.html',
  'http://sj.jidujiao.com/Zephaniah_36.html',
  'http://sj.jidujiao.com/Haggai_37.html',
  'http://sj.jidujiao.com/Zechariah_38.html',
  'http://sj.jidujiao.com/Malachi_39.html',
  'http://sj.jidujiao.com/Matthew_40.html',
  'http://sj.jidujiao.com/Mark_41.html',
  'http://sj.jidujiao.com/Luke_42.html',
  'http://sj.jidujiao.com/John_43.html',
  'http://sj.jidujiao.com/Acts_44.html',
  'http://sj.jidujiao.com/Romans_45.html',
  'http://sj.jidujiao.com/1-Corinthians_46.html',
  'http://sj.jidujiao.com/2-Corinthians_47.html',
  'http://sj.jidujiao.com/Galatians_48.html',
  'http://sj.jidujiao.com/Ephesians_49.html',
  'http://sj.jidujiao.com/Philippians_50.html',
  'http://sj.jidujiao.com/Colossians_51.html',
  'http://sj.jidujiao.com/1-Thessalonians_52.html',
  'http://sj.jidujiao.com/2-Thessalonians_53.html',
  'http://sj.jidujiao.com/1-Timothy_54.html',
  'http://sj.jidujiao.com/2-Timothy_55.html',
  'http://sj.jidujiao.com/Titus_56.html',
  'http://sj.jidujiao.com/Philemon_57.html',
  'http://sj.jidujiao.com/Hebrews_58.html',
  'http://sj.jidujiao.com/James_59.html',
  'http://sj.jidujiao.com/1-Peter_60.html',
  'http://sj.jidujiao.com/2-Peter_61.html',
  'http://sj.jidujiao.com/1-John_62.html',
  'http://sj.jidujiao.com/2-John_63.html',
  'http://sj.jidujiao.com/3-John_64.html',
  'http://sj.jidujiao.com/Jude_65.html',
  'http://sj.jidujiao.com/Revelation_66.html'
];


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setCookie({ name: 'bible', value: '2', domain: '.sj.jidujiao.com', path: '/' })

  await page.goto('http://sj.jidujiao.com');

  const chunkLength = 30

  while (pages.length) {
    const url = pages.pop()
    console.log('url', url)
    await page.goto(url);
    const charcters = await page.evaluate(() => {
      const result = []
      const charctersLinks = document.querySelectorAll('.zhangList li a')
      charctersLinks.forEach(alink => {
        result.push(alink.href)
      })
      return result
    })

    const filesCn = {}
    const filesEn = {}
    
    const charcterChunk = lodash.chunk(charcters, chunkLength);
    let nameCn = ''
    let nameEn = ''

    while (charcterChunk.length) {
      const current = charcterChunk.pop();
      // console.log('.....current', current)
      await Promise.all(current.map(async (item, index) => {
        const page = await browser.newPage();
        await page.goto(item);
        
        const { chinese, english } = await page.evaluate(() => {
          const resultchinese = []
          const resultenglish = []
          const texts = document.querySelectorAll('.body ul p')
          texts.forEach(text => {
            const r = text.innerHTML.split('<br>')
            resultchinese.push(r[0])
            resultenglish.push(r[1])
            // result.push(text.textContent)
          })
          return {
            chinese: resultchinese,
            english: resultenglish,
          }
        })

        const charcter = item.split('/').pop().split('_')
        const content = contents[charcter[1] - 1]
        const charcterNum = charcter[2].split('.')[0]
        nameCn = content.nameCn;
        nameEn = content.nameEn
        console.log('content', content)
        filesCn[`${content.nameCn}-${charcterNum}`] = chinese
        filesEn[`${content.nameEn}-${charcterNum}`] = english
        return true
      }))
    }

    const orderedEn = {};
    Object.keys(filesEn).sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1])).forEach(function(key) {
      orderedEn[key] = filesEn[key];
    });

    const orderedCn = {};
    Object.keys(filesCn).sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1])).forEach(function(key) {
      orderedCn[key] = filesCn[key];
    });
    fs.writeFileSync(path.resolve(__dirname, `src/english/${nameEn}.js`), JSON.stringify(orderedEn, null, 2), 'utf-8')
    fs.writeFileSync(path.resolve(__dirname, `src/chinese/${nameCn}.js`), JSON.stringify(orderedCn, null, 2), 'utf-8')
  }
  
  await browser.close();
})();

