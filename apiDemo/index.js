const Koa = require('koa');
var Router = require('koa-router');
const xlsx = require('node-xlsx')
const moment = require('moment')
var cors = require('@koa/cors')
const fs = require('fs')
const app = new Koa();



var router = new Router();
var apiRouter = new Router()

apiRouter.get('/test', async (ctx, next) => {
  // ctx.router available
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1111)
    }, 1000)
  })
  ctx.body = 'hello world'
});

apiRouter.get('/download', async (ctx, next) => {
  console.log('download come in ')
  const columns = [
    { key: 'name', title: '用户名称' },
    { key: 'age', title: '年龄' },
    { key: 'heigh', title: '身高' },
    { key: 'sex', title: '性别' },
    { key: 'mobile', title: '手机号' },
  ]
  const data = [columns.map((column) => column.title)]
  const option = { '!cols': [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 60 }, { wch: 60 }] }

  const result = Array.from({ length: 10 }).map((i, index) => ({
    name: `enochjs${index}`,
    age: `age${index}`,
    heigh: `heigh${index}`,
    sex: `sex${index}`,
    mobile: `mobile${index}`,
  }))
  result.forEach((item) => {
    data.push(columns.map((column) => item[column.key]))
  })
  ctx.attachment(`用户列表-${moment().format('YYYY-MM-DD')}.xlsx`)
  const buffer = xlsx.build([{
    name: '用户列表',
    data,
  }], option)
  ctx.set('Content-disposition', `attachment; filename=test.xlsx`);
  ctx.status = 200;
  ctx.body = buffer
})


router.use('/api', cors({ origin: (ctx) => ctx.request.header.origin, credentials: true }), apiRouter.routes(), apiRouter.allowedMethods())

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('success at http://localhost:3000')
});

