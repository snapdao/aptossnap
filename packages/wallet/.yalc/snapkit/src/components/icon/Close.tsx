import React from 'react'
import { IconProps } from './types'

export function Close ({ className, width = '24', height = '24', color }: IconProps) {
  return (
    <svg width={width} height={height} className={className} style={{stroke: 'currentColor'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18M18 6L6 18" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}
