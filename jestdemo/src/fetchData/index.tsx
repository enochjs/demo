
import React, { useState, useEffect } from "react";

export default function User(props: { id: number }) {
  const [user, setUser] = useState<{ name: string, age: number, address: string }>(null as any);

  async function fetchUserData(id: number) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return <div>"加载中..."</div>;
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> 岁
      <br />
      住在 {user.address}
    </details>
  );
}