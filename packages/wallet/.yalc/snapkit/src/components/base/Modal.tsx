import React from 'react'
import { Modal as BaseModal, ModalProps,  } from 'semantic-ui-react'
import { Icon } from '../icon'
import styles from './Modal.module.scss'

export function Modal ({ children, className, size = 'small', closeIcon, ...args }: ModalProps) {
  const _closeIcon = (
    <div className={`icon ${styles.close} flex justify-center items-center bg-hover-ntd04 transition`}>
      <Icon.Close></Icon.Close>
    </div>
  )

  return (
    <BaseModal
      className={`${className || ''} ${styles.modal}`}
      size={size}
      closeIcon={closeIcon === true ? _closeIcon : closeIcon}
      {...args}
    >
      <BaseModal.Content
        className={styles.content}
      >
        <div
          className={`box ${styles.box}`}
        >
          {children}
        </div>
      </BaseModal.Content>
    </BaseModal>
  )
}
