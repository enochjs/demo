import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

// React.createElement('div', 111)

function App() {

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      count: {count}
      <button onClick={() => setCount(count + 1)}>increase</button>
    </div>
  );
}

export default App;
