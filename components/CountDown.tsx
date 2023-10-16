'use client'
import { cn } from '@/lib/tw-merge'
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
  const isExpired = Object.values(count).every((v) => v === 0)

  console.log('count', count)
  console.log('isExpired', isExpired)

  useEffect(() => {
    if (isExpired) return

    const id: ReturnType<typeof setInterval> = setInterval(() => {
      if (isExpired) clearInterval(id)
      if (count.s > 0) {
        setCount(() => ({ ...count, s: count.s - 1 }))
      } else if (count.s === 0 && count.m > 0) {
        setCount(() => ({ ...count, m: count.m - 1, s: 59 }))
      } else if (count.s === 0 && count.m === 0 && count.h > 0) {
        setCount(() => ({ h: count.h - 1, m: 59, s: 59 }))
      }
    }, 1000)

    return () => clearInterval(id)
  }, [count])

  return (
    <span className={cn('countdown font-mono text-2xl', { 'text-error': isExpired })}>
      <span style={{ '--value': count.h } as React.CSSProperties}></span>h<span style={{ '--value': count.m } as React.CSSProperties}></span>m
      <span style={{ '--value': count.s } as React.CSSProperties}></span>s
    </span>
  )
}

export default memo(CountDown, arePropsEqual)

function arePropsEqual(oldProps: Props, newProps: Props) {
  return oldProps.expiresAt === newProps.expiresAt
}
