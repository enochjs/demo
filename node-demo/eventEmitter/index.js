const EventEmitter = require('events');
const { resolve } = require('path');
const eventEmitter = new EventEmitter();


// eventEmitter.on('myEvent', (data) => {
//   console.log(data, '- FIRST');
// });

// console.log('Statement A');

// eventEmitter.on("myEvent", async (data) => {
//   const result = await new Promise((re) => {
//     re('- SECOND')
//   })
//   console.log(data, result);
// });

// eventEmitter.emit('myEvent', 'Emitted Statement');

// console.log("Statement B");


// process.on("exit", () => console.log("Exit"));
// process.on("beforeExit", () => console.log("Before Exit"));
// process.on('uncaughtException', () => {
//     console.log('Exception');
//     process.exit();
// });
// throw new Error('Test Error');

// eventEmitter.on("myEvent", data => {
//   console.log(data, "- ON");
// });

// eventEmitter.once("myEvent", data => {
//   console.log(data, "- ONCE");
// });

// eventEmitter.emit("myEvent", "Emitted Statement");
// eventEmitter.emit("myEvent", "Emitted Statement");
// eventEmitter.emit("myEvent", "Emitted Statement");


// eventEmitter.on("myEvent", data => console.log(data, "- ON"));
// eventEmitter.on("myEvent2", data => console.log(data, "- ON"));
// eventEmitter.once("myEvent3", data => console.log(data, "- ONCE"));

// console.log(eventEmitter.eventNames());
// eventEmitter.emit("myEvent3", 'EVENT');
// console.log(eventEmitter.eventNames());

// function func1() {
//     console.log("EVENT TRIGGERED");
// }

// eventEmitter.on("myEvent", func1);
// eventEmitter.on("myEvent2", func1);

// console.log(eventEmitter.eventNames());
// eventEmitter.removeListener("myEvent", func1);
// console.log(eventEmitter.eventNames());

// function func1() {
//   console.log("EVENT TRIGGERED");
// }

// eventEmitter.on("myEvent", func1);
// eventEmitter.on("myEvent2",func1);

// eventEmitter.removeAllListeners();
// console.log(eventEmitter.eventNames());

// setImmediate(() => {
//   console.log('3');
// });

// process.nextTick(() => {
//   console.log('2');
// });


// process.nextTick(() => {
//   console.log('23');
// });

// console.log('1');


class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('error', (err) => {
//   console.error('错误信息');
// });
// myEmitter.emit('error', new Error('错误'));

// const myEmitter = new MyEmitter();
// // 只处理一次，避免无限循环。
// myEmitter.once('newListener', (event, listener) => {
//   if (event === 'event') {
//     // 在前面插入一个新的监听器。
//     myEmitter.on('event', () => {
//       console.log('B');
//     });
//   }
// });
// myEmitter.on('event', () => {
//   console.log('A');
// });
// myEmitter.emit('event');

// const myEmitter = new MyEmitter();
// myEmitter.emit('error', new Error('错误信息'));

// const myEmitter = new MyEmitter();
// myEmitter.on('error', (err) => {
//   console.error('错误信息');
// });
// myEmitter.emit('error', new Error('错误'));

// const myEmitter = new MyEmitter();
// myEmitter.on(EventEmitter.errorMonitor, (err) => {
//   MyMonitoringTool.log(err);
// });
// myEmitter.emit('error', new Error('错误'));

// const ee1 = new EventEmitter({ captureRejections: true });

// // ee1.on('something', async (value) => {
// //   throw new Error('kaboom');
// // });

// // ee1.on('error', console.log);

// const ee2 = new EventEmitter({ captureRejections: true });
// ee2.on('something', async (value) => {
//   throw new Error('kaboom');
// });

// ee2[Symbol.for('nodejs.rejection')] = console.log;

// ee2.emit('something')

// const ee = new EventEmitter();

// function pong() {
//   console.log('pong');
// }

// ee.on('ping', pong);
// ee.once('ping', pong);
// ee.removeListener('ping', pong);

// ee.emit('ping');
// ee.emit('ping');
