import React from 'react'
import { Button } from '../base/Button'
import { Icon } from '../icon'
import styles from './Install.module.scss'

export function Install () {
  return (
    <>
      <div className={`t-center ${styles.content}`}>
        <Icon.MetaMask></Icon.MetaMask>
        <h2 className='t-h2 c-n80'>Install MetaMask Flask</h2>
        <p className='t-caption c-n60'>You will need to install the MetaMask extension in order to use Aptos Snap.</p>
        <p>
          <a href='/' className='t-h4 c-pri60 c-hover-pri60 inline-flex items-center'>
            <span>Learn More</span>
            <Icon.ArrowRight></Icon.ArrowRight>
          </a>
        </p>
      </div>
      <Button
        tagName='a'
        primary
        size='large'
        href='https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Icon.Install className={styles.install}></Icon.Install>
        <span>Install MetaMask</span>
      </Button>
    </>
  )
}
