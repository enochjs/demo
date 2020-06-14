import { Button } from 'antd'
import { post } from './util'
// import Menu from './menu'
const Menu = require('./menu')

function fetchData () {
  post()
  console.log('Button', Button)
}

fetchData()