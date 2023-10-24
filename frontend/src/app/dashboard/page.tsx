'use client'

import { useStore } from "../store";

export default function Home() {
  const { user  } = useStore();
  return (
    <main>
      <h1>Wesh {user?.username}</h1>
    </main>
  )
}
