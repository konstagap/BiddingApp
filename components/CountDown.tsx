'use client'
import React, { memo, useEffect, useState } from 'react'

type Props = {
  expiresAt: Date
}

function CountDown({ expiresAt }: Props) {
  const [count, setCount] = useState({
    h: expiresAt.getHours(),
    m: expiresAt.getMinutes(),
    s: expiresAt.getSeconds()
  })

  console.log('count', count)

  useEffect(() => {
    const id = setInterval(() => {
      if (Object.values(count).every((v) => v === 0)) return clearInterval(id)
      if (count.h > 0) {
        setCount(() => ({ ...count, h: count.h - 1 }))
        document.getElementById('counterElementH').style.setProperty('--value', count.h)
      }

      if (count.m > 0) {
        setCount(() => ({ ...count, m: count.m - 1 }))
        document.getElementById('counterElementM').style.setProperty('--value', count.m)
      }

      if (count.s > 0) {
        setCount(() => ({ ...count, s: count.s - 1 }))
        document.getElementById('counterElementS').style.setProperty('--value', count.s)
      }
    }, 1000)

    return () => clearInterval(id)
  }, [count])

  return (
    <span className='countdown font-mono text-2xl'>
      <span id='counterElementH' style={{ '--value': count.h }}></span>h<span id='counterElementM' style={{ '--value': count.m }}></span>m
      <span id='counterElementS' style={{ '--value': count.s }}></span>s
    </span>
  )
}

export default memo(CountDown)

function arePropsEqual(oldProps: Props, newProps: Props) {
  return oldProps.expiresAt === newProps.expiresAt
}
