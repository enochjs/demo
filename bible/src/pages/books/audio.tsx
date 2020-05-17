import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSlider, AtIcon } from 'taro-ui'

import './audio.scss'

class Mp3Audio extends Component <any, any>{

  constructor (props) {
    super (props)
    this.state = {
      time: 0,
      duration: 0,
      playing: false,
      loading: false,
    }
  }

  // eslint-disable-next-line
  innerAudioContext = wx.createInnerAudioContext()

  componentWillUnmount() {
    console.log('.......unmonut')
    this.innerAudioContext.destroy()
  }

  audioInterval

  sliderTime = () => {
    clearInterval(this.audioInterval)
    this.audioInterval = setInterval(() => {
      this.setState({time: this.state.time + 1})
    }, 1000)
  }

  handlePlay = () => {
    this.setState({ playing: true })
    if (this.state.duration) {
      this.innerAudioContext.play()
      this.sliderTime()
    } else {
      this.innerAudioContext.autoplay = true
      this.setState({
        loading: true,
      })
      const language =  Taro.getStorageSync('mp3')
      const name = language === 'en' ? this.props.bookNameEn : this.props.bookNameCn
      this.innerAudioContext.src = `https://enochjs.oss-cn-hangzhou.aliyuncs.com/mp3/${language}/${name}/${this.props.chapterIndex}.mp3`
      this.innerAudioContext.onPlay(() => {
        this.setState({ loading: false })
        this.sliderTime()
      })
      this.innerAudioContext.onTimeUpdate(() => {
        this.state.duration === 0 && this.innerAudioContext.duration !== 0 && this.setState({
          duration: this.innerAudioContext.duration,
        })
      })
    }
  }

  handlePause = () => {
    this.setState({ playing: false })
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
    console.log(this.props.bookNameCn, this.props.bookNameEn, this.props.chapterIndex)
    return (
      <View className='audio'>
        <AtSlider
          className='slider'
          step={1}
          value={this.state.time}
          max={this.state.duration}
          activeColor='#e93b3d'
          backgroundColor='#ef6c6e'
          blockColor='#e93b3d'
          blockSize={20}
          onChange={this.handleTimeChange}
        />
        <View className='audio-control'>
          <View className='left text-center'>{this.handleTimeFormatter(this.state.time)}</View>
          <View className='center text-center'>
            { this.state.loading ? <AtIcon value='loading-3' size='24' color='#F00'></AtIcon> : (
              this.state.playing ?
              <AtIcon value='pause' size='24' color='#F00' onClick={this.handlePause}></AtIcon> :
              <AtIcon value='play' size='24' color='#F00' onClick={this.handlePlay}></AtIcon>
            )}
          </View>
          <View className='right text-center'>{this.handleTimeFormatter(this.state.duration)}</View>
        </View>
      </View>
    )
  }
}

export default Mp3Audio
