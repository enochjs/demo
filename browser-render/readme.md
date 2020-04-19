## 浏览器渲染流程
### 参考连接
https://itnext.io/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969


### 执行流程


### 重点笔记
- 顺序是优先地
- css会阻塞后面的js， js会阻塞后面的dom， css并不直接阻塞dom
- dom解析也是从上到下的（虽然资源是并发的），js 会阻塞dom的解析
- css 和js 的执行顺序，默认是谁在前谁先执行, css是会阻塞后面的js执行的， 我认为这个是出于一个目的，希望在documenContentOnLoad的时候可以拿到css的属性，不然的话，如果不阻塞DOMContentLoaded，如果css文件还没加载结束，js是拿不到样式信息的，就只能在onload事件中拿了，但是onload会等待图片、媒体资源都加载结束，这样的话，就很晚了。 但是如果css会阻塞js的话，只要css在js前面，就能保证DOMContentLoaded我是能拿到css的样式的。这样可以优化用户体验, 一下代码可以验证此事

```html
  <html lang='en'>
    <head>
      <title>Rendering Test</title>
      <script src="/3000/js/vendor.js"></script>
      <link rel='stylesheet' href='/5000/css/style.css'>
    </head>
    <body>
      <img src="/10000/res/lion.jpg" />
      <h1>I am first!</h1>
      <h2>I am second!</h2>
      <h3>I am third!</h3>
    </body>
  </html>
```

- defer 是让js放在最后执行
- async 可以让js立即执行