import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Contents from './pages/contents'
import counterStore from './store/counter'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
}
class App extends Component {

  //对应小程序主配置
  config: Config = {
    // 框架有坑，不会自动获取目录下的index文件，需要加上文件名
    pages: [
      'pages/contents/index',
    ],
    subPackages: [
      {
        root: 'pages/books/',
        pages: [
          'index',
        ]
      }
    ],
    preloadRule: {
      'pages/contents/index': {
        'network': 'all',
        'packages': [
          'pages/books/'
        ]
      },
    },
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#f1e5c9',
      navigationBarTitleText: 'bible',
      navigationBarTextStyle: 'black',
      backgroundColor: '#f1e5c9',
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Contents />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
