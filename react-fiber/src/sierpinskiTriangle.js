import React from 'react'
import Dot from './dot'

var targetSize = 25;


export default class SierpinskiTriangle extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    var o = this.props;
    var n = nextProps;
    const should = !(
      o.x === n.x &&
      o.y === n.y &&
      o.s === n.s &&
      o.children === n.children
    );
    return should
  }

  render() {
    if (this.props.s <= targetSize) {
      return (
        <Dot
          x={this.props.x - (targetSize / 2)}
          y={this.props.y - (targetSize / 2)}
          size={targetSize}
          text={this.props.children}
        />
      );
    }
    var newSize = this.props.s / 2;
    // var slowDown = true;
    // if (slowDown) {
    //   var e = performance.now() + 0.8;
    //   while (performance.now() < e) {
    //     // Artificially long execution time.
    //   }
    // }
  
    // s /= 2;
  
    return [
      <SierpinskiTriangle key="1" x={this.props.x} y={this.props.y - (newSize / 2)} s={newSize}>
        {this.props.children}
      </SierpinskiTriangle>,
      <SierpinskiTriangle key="2" x={this.props.x - newSize} y={this.props.y + (newSize / 2)} s={newSize}>
        {this.props.children}
      </SierpinskiTriangle>,
      <SierpinskiTriangle key="3" x={this.props.x + newSize} y={this.props.y + (newSize / 2)} s={newSize}>
        {this.props.children}
      </SierpinskiTriangle>,
    ];
  }

}


// export default function SierpinskiTriangle({ x, y, s, children }) {
//   if (s <= targetSize) {
//     return (
//       <Dot
//        key={`x`}
//         x={x - (targetSize / 2)}
//         y={y - (targetSize / 2)}
//         size={targetSize}
//         text={children}
//       />
//     );
//   }
//   var newSize = s / 2;
//   var slowDown = true;
//   if (slowDown) {
//     var e = performance.now() + 0.8;
//     while (performance.now() < e) {
//       // Artificially long execution time.
//     }
//   }

//   s /= 2;

//   return [
//     <SierpinskiTriangle key="1" x={x} y={y - (s / 2)} s={s}>
//       {children}
//     </SierpinskiTriangle>,
//     <SierpinskiTriangle key="2" x={x - s} y={y + (s / 2)} s={s}>
//       {children}
//     </SierpinskiTriangle>,
//     <SierpinskiTriangle key="3" x={x + s} y={y + (s / 2)} s={s}>
//       {children}
//     </SierpinskiTriangle>,
//   ];
// }
// SierpinskiTriangle.shouldComponentUpdate = function(oldProps, newProps) {
//   var o = oldProps;
//   var n = newProps;
//   return !(
//     o.x === n.x &&
//     o.y === n.y &&
//     o.s === n.s &&
//     o.children === n.children
//   );
// };