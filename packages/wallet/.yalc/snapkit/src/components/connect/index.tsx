import React, { useEffect, useState } from 'react'
import { Install } from './Install'
import { Modal } from '../base/Modal'
import styles from './index.module.scss'
import { Browser } from './Browser'
import { Connecting } from './Connecting'
import { StrictModalProps } from 'semantic-ui-react'

interface ConnectProps {
  name: string
  open: boolean
  onClose(): void
  children?: JSX.Element | JSX.Element[]
}

function isBrowserSupport () {
  return false
}

export function Connect ({ name, open, onClose, children }: ConnectProps) {
  const modalDefaultClass = `t-center ${styles.modal}`
  const [step, setStep] = useState(children)
  const [size, setSize] = useState('mini' as StrictModalProps['size'])
  const [modalClass, setModalClass] = useState(modalDefaultClass)
  
  useEffect(() => {
    if (!children) {
      if (!isBrowserSupport()) {
        setSize('tiny')
        setModalClass(`${modalDefaultClass} ${styles.browser}`)
        setStep(<Browser></Browser>)
      } else {
        setModalClass(modalDefaultClass)
        setStep(<Connecting name={name}></Connecting>)
      }
    }
  }, [children])

  return <Modal open={open} onClose={onClose} closeIcon={true} size={size} className={modalClass}>{step}</Modal>
}

Connect.Install = Install
