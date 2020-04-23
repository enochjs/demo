const { produce, applyPatches, enablePatches } = require('immer')

enablePatches()

let currentState = {
  x:1,
  y:1
}
// let nextState = produce(currentState, (draft) => {
//   draft.x = 2;
// })
 

// let currentState = {
//   a: [],
//   p: {
//     x: 1
//   }
// }
 
// let nextState = produce(currentState, (draft) => {
//   draft.a.push(2);
// })


// let producer = produce((draft) => {
//   draft.x = 2
// });
// let nextState = producer(currentState);

 
// console.log(currentState);  // {x:1,y:1}
// console.log(nextState); // { x: 2, y: 1 }


// patch
let state1 = {
  x: 1,
  y: 1
}
console.log(`state1 = ${JSON.stringify(state1)}`);
let patches1 = [];
let inversePatches1 = [];
 
let state2 = produce(state1, (draft) => {
  draft.x = 2;
  draft.y = 2;
}, (patches, inversePatches) => {
  patches1 = patches;
  inversePatches1 = inversePatches;
});
 
console.log(`state2 = ${JSON.stringify(state2)}`);
 
let patches2 = [];
let inversePatches2 = [];
 
let state3 = produce(state2, (draft) => {
  draft.x = 3;
  draft.y = 3;
}, (patches, inversePatches) => {
  patches2 = patches;
  inversePatches2 = inversePatches;
});
 
console.log(`state3 = ${JSON.stringify(state3)}`);
 
let backState2 = applyPatches(state3,inversePatches2)
 
console.log(`backState2 = ${JSON.stringify(backState2)}`);
 
let backState1 = applyPatches(state2,inversePatches1)
 
console.log(`backState1 = ${JSON.stringify(backState1)}`);