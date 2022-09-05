import React from 'react'
import { IconProps } from './types'

export function ArrowRight ({ className, width = '24', height = '24', color }: IconProps) {
  return (
    <svg width={width} height={height} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1722 12.0007L12.2222 7.05072L13.6362 5.63672L20.0002 12.0007L13.6362 18.3647L12.2222 16.9507L17.1722 12.0007Z" fill={color}/>
    </svg>
  )
}
