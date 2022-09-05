import { ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'
import { Connect } from './index'

export default {
  title: 'Connect',
  component: Connect,
  args: {
    open: true
  }
} as ComponentMeta<typeof Connect>

export const Auto = () => {
  const [open, setOpen] = useState(true)
  return (
    <Connect name='Aptos' open={open} onClose={() => setOpen(false)}></Connect>
  )
}

export const Install = () => {
  const [open, setOpen] = useState(true)
  return (
    <Connect name='Aptos' open={open} onClose={() => setOpen(false)}>
      <Connect.Install></Connect.Install>
    </Connect>
  )
}
