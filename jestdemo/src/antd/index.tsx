import React, { useState, useEffect } from 'react'
import { Radio, Button } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';

export default function Calc(props: { id?: number }) {
  const [value, setValue] = useState<'increase' | 'decrease'>('increase');
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState('')

  function handleChange(e: RadioChangeEvent) {
    setValue(e.target.value)
  }

  function handleClick () {
    setCount(value === 'increase' ? count + 1 : count - 1)
  }

  async function fetchUserData(userId: number) {
    const response = await fetch("/" + userId);
    setUserName(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id!);
  }, [props.id]);

  return (
    <div>
      <div id="user-name">copy right {userName}</div>
      {value === 'increase' ? <div>每次加一</div> : <div>每次减一</div>}
      <Radio.Group id="test" onChange={handleChange} value={value}>
        <Radio value={1}>+</Radio>
        <Radio value={2}>-</Radio>
      </Radio.Group>
      <div>
        <span>{count}</span>
        <Button onClick={handleClick}>modify</Button>
      </div>
    </div>
  )
}