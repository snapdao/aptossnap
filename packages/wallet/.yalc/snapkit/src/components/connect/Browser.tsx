import React from 'react'
import { Icon } from '../icon'
import styles from './Browser.module.scss'

export function Browser () {
  return (
    <div className='t-center'>
      <div className={`flex justify-center ${styles.browsers}`}>
        <a className='bg-hover-ntd04 transition' href='/'>
          <Icon.Chrome></Icon.Chrome>
          <div className='t-h5 c-n60'>Chrome</div>
        </a>
        <a className='bg-hover-ntd04 transition' href='/'>
          <Icon.Firefox></Icon.Firefox>
          <div className='t-h5 c-n60'>Firefox</div>
        </a>
        <a className='bg-hover-ntd04 transition' href='/'>
          <Icon.Brave></Icon.Brave>
          <div className='t-h5 c-n60'>Brave</div>
        </a>
        <a className='bg-hover-ntd04 transition' href='/'>
          <Icon.Edge></Icon.Edge>
          <div className='t-h5 c-n60'>Edge</div>
        </a>
      </div>
      <div className={`t-h2 c-n80 ${styles.msg}`}>This Browser is not Supported</div>
      <div className={`t-caption c-n60 ${styles.desc}`}>Please use the browsers above we currently supported.</div>
    </div>
  )
}
