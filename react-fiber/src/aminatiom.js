import React, { useEffect, useState, useRef } from 'react'
import ReactDom from 'react-dom'
import SierpinskiTriangle from './sierpinskiTriangle'

// export default class ExampleApplication extends React.Component {
//   constructor() {
//     super();
//     this.state = { seconds: 0 };
//     this.tick = this.tick.bind(this);
//   }
//   containerStyle = {
//     position: 'absolute',
//     transformOrigin: '0 0',
//     left: '50%',
//     top: '50%',
//     width: '10px',
//     height: '10px',
//     background: '#eee',
//   };
//   componentDidMount() {
//     this.intervalID = setInterval(this.tick, 1000);
//   }
//   tick() {
//     requestIdleCallback(() => {
//       this.setState(state => ({ seconds: (state.seconds % 10) + 1 }))
//     })
//   }
//   componentWillUnmount() {
//     clearInterval(this.intervalID);
//   }
//   render() {
//     const seconds = this.state.seconds;
//     const elapsed = this.props.elapsed;
//     const t = (elapsed / 1000) % 10;
//     const scale = 1 + (t > 5 ? 10 - t : t) / 10;
//     const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
//     return (
//       <div style={{ ...this.containerStyle, transform }}>
//         <div>
//           <SierpinskiTriangle x={0} y={0} s={1000}>
//             {this.state.seconds}
//           </SierpinskiTriangle>
//         </div>
//       </div>
//     );
//   }
// }

// let s = 0

let intervalID = null

export default function ExampleApplication (props) {

  const [seconds, setSeconds] = useState(0)
  const ref = useRef(0)
  const containerStyle = {
    position: 'absolute',
    transformOrigin: '0 0',
    left: '50%',
    top: '50%',
    width: '10px',
    height: '10px',
    background: '#eee',
  };

  useEffect(() => {
    intervalID = setInterval(tick, 1000);
    return () => {
      clearInterval(intervalID)
    }
  }, [])

  function tick() {
    ref.current = ref.current % 10 + 1
    setSeconds(ref.current)
  }

  const elapsed = props.elapsed;
  const t = (elapsed / 1000) % 10;
  const scale = 1 + (t > 5 ? 10 - t : t) / 10;
  const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
  return (
    <div style={{ ...containerStyle, transform }}>
      <div>
        <SierpinskiTriangle x={0} y={0} s={1000}>
          {seconds}
        </SierpinskiTriangle>
      </div>
    </div>
  );
}