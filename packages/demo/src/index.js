import { enableAptosSnap } from '@keystonehq/aptossnap-adapter'

let aptosApi

// Dapp Status Section
// const networkDiv = document.getElementById('network');
// const chainIdDiv = document.getElementById('chainId');
const accountDiv = document.getElementById('account')
const defaultSnapId = 'local:http://localhost:8081'

const snapId = defaultSnapId
const downloadUrl = 'https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk'

// Basic Actions Section
const onboardButton = document.getElementById('connectButton')
const disconnectButton = document.getElementById('disconnectButton')
const getAccountButton = document.getElementById('getAccount')
const getAccountResults = document.getElementById('getAccountResult')
const getBalanceButton = document.getElementById('getBalance')
const getBalanceResult = document.getElementById('getBalanceResult')

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
    const metamaskAptosSnap = await enableAptosSnap({ network: 'devnet' }, snapId, { version: 'latest' })
    aptosApi = await metamaskAptosSnap.getMetamaskSnapApi()
    let account
    let accountButtonsInitialized = false
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
      getAccountButton.onclick = async () => {
        try {
          const account = await aptosApi.account()
          getAccountResults.innerHTML = account.address
        } catch (err) {
          console.error(err)
          getAccountResults.innerHTML = `Error: ${err.message}`
        }
      }

      getBalanceButton.onclick = async () => {
        try {
          getBalanceResult.innerHTML = await aptosApi.getBalance()
        } catch (err) {
          console.error(err)
          getBalanceResult.innerHTML = `Error: ${err.message}`
        }
      }

      sendButton.onclick = async () => {
        try {
          const transactionPayload = {
            arguments: ['0x1f410f23447ae2ad00e931b35c567783a5beb3b5d92c604f42f912416b7c3ccd', 2],
            function: '0x1::coin::transfer',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin']
          }
          const response = await aptosApi.signAndSubmitTransaction(transactionPayload)
          sendResult.innerHTML = JSON.stringify(response)
        } catch (e) {
          sendResult.innerHTML = JSON.stringify(e)
        }
      }
    }

    const onClickConnect = async () => {
      try {
        const newAccount = await aptosApi.account()
        handleNewAccount(newAccount)
      } catch (error) {
        console.error(error)
      }
    }

    const onClickDisconnect = async () => {
      try {
        await aptosApi.disconnect()
      } catch (error) {
        console.error(error)
      }
    }

    const updateButtons = () => {
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
      }
      // already getAccount
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

    function handleNewAccount (newAccount) {
      console.log(newAccount)
      account = newAccount.address
      accountDiv.innerHTML = account
      // fromDiv.value = account
      if (isMetaMaskConnected()) {
        initializeAccountButtons()
      }
      updateButtons()
    }
    updateButtons()
    if (isMetaMaskInstalled()) {
      try {
        const newAccount = await aptosApi.account()
        handleNewAccount(newAccount)
      } catch (err) {
        console.error('Error on init when getting account', err)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('load', initialize)
