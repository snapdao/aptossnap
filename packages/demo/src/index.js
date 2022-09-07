import WalletAdapter from '@keystonehq/aptossnap-adapter'

let walletAdapter
// Dapp Status Section
// const networkDiv = document.getElementById('network')

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
// Send form section
// const fromDiv = document.getElementById('fromInput')

// Send Aptos Section
const sendButton = document.getElementById('sendButton')
const sendResult = document.getElementById('sendResult')

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
        console.log('sendButton is clicked')
        try {
          const transactionPayload = {
            arguments: ['0x1f410f23447ae2ad00e931b35c567783a5beb3b5d92c604f42f912416b7c3ccd', 2],
            function: '0x1::coin::transfer',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin']
          }
          const response = await walletAdapter.signAndSubmitTransaction(transactionPayload)
          sendResult.innerHTML = response
        } catch (e) {
          sendResult.innerHTML = JSON.stringify(e)
        }
      }
    }

    const onClickConnect = async () => {
      try {
        applyConnectingStatus()
        await walletAdapter.connect()
        console.log('%c 🥑 walletAdapter', 'color:#2eafb0', walletAdapter)
        const newAccount = walletAdapter.publicAccount
        console.log('newAccount', newAccount)
        await handleStatus(newAccount)
      } catch (error) {
        console.error(error)
        applyConnectInitialStatus()
      }
    }

    function applyConnectingStatus () {
      onboardButton.innerText = 'Connecting!'
      onboardButton.disabled = true
    }

    function applyConnectInitialStatus () {
      onboardButton.innerText = 'Connect'
      onboardButton.onclick = onClickConnect
      onboardButton.disabled = false
      disconnectButton.disabled = true
    }

    const onClickDisconnect = async () => {
      try {
        await walletAdapter.disconnect()
        await handleStatus()
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
