const fs = require('fs');


const contentsCn = [
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
  { nameEn: 'Corinthians2', nameCn: '哥林多后书', index: 47 },
  { nameEn: 'Galatians', nameCn: '加拉太书', index: 48 },
  { nameEn: 'Ephesians', nameCn: '以弗所书', index: 49 },
  { nameEn: 'Philippians', nameCn: '腓立比书', index: 50 },
  { nameEn: 'Colossians', nameCn: '歌罗西书', index: 51 },
  { nameEn: 'Thessalonians1', nameCn: '帖撒罗尼迦前书', index: 52 },
  { nameEn: 'Thessalonians2', nameCn: '帖撒罗尼迦后书', index: 53 },
  { nameEn: 'Timothy1', nameCn: '提摩太前书', index: 54 },
  { nameEn: 'Timothy2', nameCn: '提摩太后书', index: 55 },
  { nameEn: 'Titus', nameCn: '提多书', index: 56 },
  { nameEn: 'Philemon', nameCn: '腓利门书', index: 57 },
  { nameEn: 'Hebrews', nameCn: '希伯来书', index: 58 },
  { nameEn: 'James', nameCn: '雅各书', index: 59 },
  { nameEn: 'Peter1', nameCn: '彼得前书', index: 60 },
  { nameEn: 'Peter2', nameCn: '彼得后书', index: 61 },
  { nameEn: 'John1', nameCn: '约翰一书', index: 62 },
  { nameEn: 'John2', nameCn: '约翰二书', index: 63 },
  { nameEn: 'John3', nameCn: '约翰三书', index: 64 },
  { nameEn: 'Jude', nameCn: '犹大书', index: 65 },
  { nameEn: 'Revelation', nameCn: '启示录', index: 66 }
];

const arr = [];

fs.readdir('./mp3/chinese', (err, dirs) => {
  // console.log('files', files)
  // console.log(dir)
  dirs.forEach(dir => {
    if (dir === '.DS_Store')  {
      return
    }
    fs.readdir(`./mp3/chinese/${dir}`, (err, files) => {
      files.forEach(file => {
        console.log(file.slice(4, -4));
        // console.log(`./mp3/chinese/${dir}/${file}`, `./mp3/chinese/${dir}/name${+file.slice(0, -4) - 1}.mp3`)
        fs.rename(`./mp3/chinese/${dir}/${file}`, `./mp3/chinese/${dir}/${file.slice(4, -4)}.mp3`, () => {})
      })
    })
  })

})





// fs.rename('./src/chinese', './src/c', () => {});