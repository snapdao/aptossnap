import React from 'react'

interface ConnectingProps {
  name: string
}

export function Connecting ({ name }: ConnectingProps) {
  return (
    <span>Connecting {name}</span>
  )
}
