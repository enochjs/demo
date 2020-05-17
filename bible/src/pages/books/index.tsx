import { ComponentType } from 'react'

import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtTabBar, AtMessage } from 'taro-ui'
import Mpaudio from './audio'

import contentsEn from '../../config/contentsEn'
import contentsCn from '../../config/contentsCn'
import './index.scss'

const booksEn = {}
const booksCn = {}

class Index extends Component <any, any>{

  constructor (props) {
    super (props)
    this.state = {
      // chapters: {},
      chapter: 1,
      language: 1,
      time: 0,
      duration: 0,
      // isnull: false,
    }
  }

  config: Config = {
    navigationBarTitleText: 'chapters'
  }

  // eslint-disable-next-line
  innerAudioContext = wx.createInnerAudioContext()

  audioInterval

  getBook = () => {
    return [
      {
        path: 'en',
        name: contentsEn[this.$router.params.bookIndex || 0].name,
      },
      {
        path: 'cn',
        name: contentsCn[this.$router.params.bookIndex || 0].name
      }
    ]
  }

  componentWillMount () {
    Promise.all(this.getBook().map((book) => {
      return new Promise((resolve) => {
        const cacheBook = book.path === 'en' ? booksEn[book.name] : booksCn[book.name]
        if (cacheBook) {
          resolve(true)
          return
        }
        Taro.request({
          method: 'GET',
          // url: `https://assets.dianwoda.cn/enochjs/books/bible/.js`
          url: `https://enochjs.oss-cn-hangzhou.aliyuncs.com/bible/${book.path}/${book.name}.js`
        }).then(result => {
          book.path === 'en' ? booksEn[book.name] = result.data : booksCn[book.name] = result.data
          resolve(true)
        })
      })

    })).then(() => {
      const chapter = +this.$router.params.chapter
      this.setState({
        chapter,
        touchX: '',
        touchY: '',
      })
      Taro.setNavigationBarTitle({ title: `chapter${chapter}` })
    })
    const index = Taro.getStorageSync('language')
    this.setState({ language: index !== undefined ? Number(index) : 1 })
  }
  

  handleTabsClick = (type: string, index: number) => {
    this.setState({ [type]: index })
    Taro.setStorage({ key: 'language', data: index })
  }

  handleTouchStart = (e) => {
    this.setState({
      touchX: e.changedTouches[0].clientX,
      touchY: e.changedTouches[0].clientY,
      startTime: new Date().getTime(),
    });
  }


  handleTouchEnd = (e) => {
    const endTime = new Date().getTime()
    if (endTime - this.state.startTime > 500) {
      return
    }
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    this.JudgeTouchData(x, y, this.state.touchX, this.state.touchY)
  }

  goToPrePage = () => {
    if (this.state.chapter === 1) {
      Taro.atMessage({
        message: this.state.language === 0 ? 'It is already the first chapter!' : '已经是第一章了！',
        type: 'warning',
        duration: 1000,
      })
      return
    } 
    this.setState({
      chapter: this.state.chapter - 1,
      // isnull: false,
    }, () => {
      Taro.setNavigationBarTitle({ title: `chapter${this.state.chapter}` })
    })
  }

  goToNextPage = () => {
    const length = contentsCn[this.$router.params.bookIndex || 0].length
    if (this.state.chapter === Number(length)) {
      Taro.atMessage({
        message: this.state.language === 0 ? 'Already the last chapter!' : '已经是最后一章了！',
        type: 'warning',
        duration: 1000,
      })
      return
    }
    this.setState({
      chapter: this.state.chapter + 1,
      // isnull: false,
    }, () => {
      Taro.setNavigationBarTitle({ title: `chapter${this.state.chapter}` })
    })
  }

  sliderTime = () => {
    clearInterval(this.audioInterval)
    this.audioInterval = setInterval(() => {
      this.setState({time: this.state.time + 1})
    }, 1000)
  }

  handlePlay = () => {
    if (this.state.duration) {
      this.innerAudioContext.play()
      this.sliderTime()
    } else {
      this.innerAudioContext.autoplay = true
      this.innerAudioContext.src = 'http://jiaoxue.jidujiao.com/mp3/%E5%88%9B%E4%B8%96%E8%AE%B0/%E5%88%9B%E4%B8%96%E8%AE%B0%E7%AC%AC1%E7%AB%A0.mp3'
      this.innerAudioContext.onPlay(() => {
        this.sliderTime()
      })
      this.innerAudioContext.onTimeUpdate(() => {
        this.state.duration === 0 && this.innerAudioContext.duration !== 0 && this.setState({
          duration: this.innerAudioContext.duration,
        })
      })
      this.innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
  }

  JudgeTouchData = (endX, endY, startX, startY) => {
    const widowWidth = Taro.getSystemInfoSync().windowWidth
    if (Math.abs(endY - startY) < 5 && Math.abs(endX - startX) < 5) {
      if (startX < widowWidth / 2 && endX < widowWidth / 2) {
        this.goToPrePage()
      } else if (endX > widowWidth / 2 && startX > widowWidth / 2) {
        this.goToNextPage()
      }
    }
  }

  handlePause = () => {
    clearInterval(this.audioInterval)
    this.innerAudioContext.pause()
  }

  handleTimeChange = (value) => {
    this.setState({
      time: value
    }, () => {
      this.innerAudioContext.seek(value)
      this.sliderTime()
    })
  }

  handleTimeFormatter = (value) => {
    const minute = Math.floor(value / 60)
    const second = parseInt(value, 10) % 60
    return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second }`
  }

  render () {
    const languages = [{ title: '英文' }, { title: '中文' }, { title: '中英' }]
    const bookNameCn = contentsCn[this.$router.params.bookIndex || 0].name
    const bookNameEn = contentsEn[this.$router.params.bookIndex || 0].name
    const bookEn = booksEn[bookNameEn] || {}
    const bookCn = booksCn[bookNameCn] || {}
    console.log('.....time', this.state.time)
    return (
      <View className='book-detail'>
        {
          Object.keys(bookEn).map((chapter, chapterIndex) => {
            const show = chapterIndex + 1 === this.state.chapter
            return (
              <ScrollView
                key={`bookNameEn${chapterIndex}`}
                className={show ? 'at-article active' : ''}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                scrollY
              >
                {
                  show ? bookEn[`${bookNameEn}-${chapterIndex + 1}`].map((item: string, index: number) => {
                    return <View key={bookNameEn + index.toString()} className='at-article__p'>
                      {
                        this.state.language !== 1?
                          <Text selectable className='c-desc'>
                            {item}
                          </Text>
                          : null
                      }
                      {
                        this.state.language !== 0 ?
                          <View>
                            <Text selectable className='c-desc'>
                              {bookCn[`${bookNameCn}-${chapterIndex + 1}`][index]}
                            </Text>
                          </View>: null
                      }
                  </View>}) : null
                }
              </ScrollView>
            )
          })
        }
        <AtMessage />
        <Mpaudio bookNameCn={bookNameCn} bookNameEn={bookNameEn} chapterIndex={this.state.chapter} />
        <AtTabBar
          className='book-tab-bar'
          current={this.state.language}
          tabList={languages}
          onClick={this.handleTabsClick.bind(this, 'language')}
        />
      </View>
    )
  }
}

export default Index  as ComponentType
