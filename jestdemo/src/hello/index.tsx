import React from "react";


interface Iprops {
    name?: string
}

export default function Hello(props?: Iprops) {
  if (props?.name) {
    return <h1>你好，{props.name}！</h1>;
  } else {
    return <span>嘿，陌生人</span>;
  }
}
