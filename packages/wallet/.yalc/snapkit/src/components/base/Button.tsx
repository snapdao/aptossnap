import React from 'react'
import styles from './Button.module.scss'
import { Loading } from './Loading'

export interface ButtonProps {
  primary?: boolean
  disabled?: boolean
  size?: 'large'|'medium'|'small'|null
  tagName?: string
  className?: string
  loading?: boolean
  children: JSX.Element | JSX.Element[]
  [propName: string]: unknown
}

export function Button ({
  primary,
  disabled,
  size,
  tagName,
  className,
  loading,
  children,
  ...args
}: ButtonProps) {
  const sizeStyles = {
    large: styles.large,
    medium: styles.medium,
    small: styles.small,
  }
  const style = `${styles.btn} ${primary ? styles.primary : styles.default} ${size ? sizeStyles[size] : ''} ${loading ? styles.loading : ''} ${className}`
  const CustomTag = tagName || 'button' as keyof JSX.IntrinsicElements

  return React.createElement(CustomTag, {
    className: style,
    disabled: disabled,
    ...args
  }, loading ? <Loading></Loading> : children)
}
