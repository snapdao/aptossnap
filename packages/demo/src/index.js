import WalletAdapter from '@keystonehq/aptossnap-adapter'

let walletAdapter

const defaultSnapId = 'local:http://localhost:8081'

const snapId = defaultSnapId
const downloadUrl = 'https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk'

// Basic Actions Section
const onboardButton = document.getElementById('connectButton')
const disconnectButton = document.getElementById('disconnectButton')
const getAccountResult = document.getElementById('getAccountResult')
const isMetaMaskInstalled = () => window.ethereum && window.ethereum.isMetaMask

// onBoarding
const startOnboarding = () => {
  window.open(downloadUrl, '_blank')
}

// Send Aptos Section
const sendButton = document.getElementById('sendButton')
const txHashDom = document.getElementById('tx-hash')
const txOpenBtnBoxDom = document.getElementById('tx-open-btn-box')

const initialize = async () => {
  try {
    let account = ''
    let accountButtonsInitialized = false
    walletAdapter = new WalletAdapter({ network: 'devnet' }, snapId)

    const accountButtons = [sendButton]
    const isMetaMaskConnected = () => account && account.length > 0
    const onClickInstall = () => {
      onboardButton.innerText = 'Onboarding in progress'
      onboardButton.disabled = true
      startOnboarding()
    }

    const initializeAccountButtons = () => {
      if (accountButtonsInitialized) {
        return
      }
      accountButtonsInitialized = true
      sendButton.onclick = async () => {
        setButtonStatus(sendButton, {
          innerText: 'Transfering...',
          disabled: true
        })
        try {
          const transactionPayload = {
            arguments: ['0x1f410f23447ae2ad00e931b35c567783a5beb3b5d92c604f42f912416b7c3ccd', 2],
            function: '0x1::coin::transfer',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin']
          }
          const response = await walletAdapter.signAndSubmitTransaction(transactionPayload)

          txHashDom.innerText = response

          const a = document.createElement('a')
          a.id = 'open-explorer-btn'
          a.href = `https://explorer.devnet.aptos.dev/txn/${response}`
          a.target = '_blank'
          a.title = response
          a.innerText = 'Open In AptosExplorer'

          txOpenBtnBoxDom.innerHTML = ''
          txOpenBtnBoxDom.appendChild(a)

          sendButton.classList.replace('btn-primary', 'btn-green')
          setButtonStatus(sendButton, {
            innerText: 'Success',
            disabled: true
          })

          setTimeout(() => {
            sendButton.classList.replace('btn-green', 'btn-primary')
            setButtonStatus(sendButton, {
              innerText: 'Transfer',
              disabled: false
            })
          }, 2000)
        } catch (e) {
          txHashDom.innerText = ''
          sendButton.classList.replace('btn-primary', 'btn-red')
          setButtonStatus(sendButton, {
            innerText: 'Error',
            disabled: true
          })

          setTimeout(() => {
            sendButton.classList.replace('btn-red', 'btn-primary')
            setButtonStatus(sendButton, {
              innerText: 'Transfer',
              disabled: false
            })
          }, 2000)

          txOpenBtnBoxDom.innerHTML = JSON.stringify(e)
        }
      }
    }

    const onClickConnect = async () => {
      try {
        setButtonStatus(onboardButton, {
          innerText: 'Connecting...',
          disabled: true
        })
        await walletAdapter.connect()
        console.log('%c 🥑 walletAdapter', 'color:#2eafb0', walletAdapter)
        const newAccount = walletAdapter.publicAccount
        console.log('newAccount', newAccount)
        await handleStatus(newAccount)
      } catch (error) {
        console.error(error)
        applyConnectButtonInitialStatus()
      }
    }

    /**
     * set button status
     * @param {HTMLElement} button
     * @param {initial | connecting} status button status
     * @param {{
     *  innerText: string
     *  innerHTML: HTMLElement
     *  disabled: boolean
     *  onclick: Function
     * }} config
     */
    function setButtonStatus (button, config) {
      config.innerHTML && (button.innerHTML = config.innerHTML)
      config.innerText && (button.innerText = config.innerText)

      typeof config.disabled === 'boolean' && (button.disabled = config.disabled)

      typeof config.onclick === 'function' && (button.onclick = config.onclick)
    }

    function applyConnectButtonInitialStatus () {
      setButtonStatus(onboardButton, {
        innerText: 'Connect',
        disabled: false
      })
      disconnectButton.disabled = true
      onboardButton.onclick = onClickConnect
    }

    const onClickDisconnect = async () => {
      try {
        await walletAdapter.disconnect()
        await handleStatus()
        txHashDom.innerText = ''
        txOpenBtnBoxDom.innerHTML = ''
      } catch (error) {
        console.error(error)
      }
    }

    const updateButtons = () => {
      getAccountResult.innerHTML = account
      const accountButtonsDisabled =
          !isMetaMaskInstalled() || !isMetaMaskConnected()
      if (accountButtonsDisabled) {
        for (const button of accountButtons) {
          button.disabled = true
        }
      } else {
        sendButton.disabled = false
      }
      // window.ethereum exist
      if (!isMetaMaskInstalled()) {
        onboardButton.innerText = 'Click here to install MetaMask!'
        onboardButton.onclick = onClickInstall
        onboardButton.disabled = false
      } else {
        if (isMetaMaskConnected()) {
          onboardButton.innerText = 'Connected'
          onboardButton.disabled = true
          disconnectButton.disabled = false
          disconnectButton.onclick = onClickDisconnect
        } else {
          onboardButton.innerText = 'Connect'
          onboardButton.onclick = onClickConnect
          onboardButton.disabled = false
          disconnectButton.disabled = true
        }
      }
    }

    async function handleStatus (newAccount) {
      if (newAccount) {
        account = newAccount.address
      } else {
        account = ''
      }
      if (isMetaMaskConnected()) {
        initializeAccountButtons()
      }
      updateButtons()
    }
    updateButtons()
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('load', initialize)
