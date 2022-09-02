import { enableAptosSnap } from '@keystonehq/aptossnap-adapter'
import { AptosClient, TransactionBuilder, TxnBuilderTypes, BCS } from 'aptos'

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
const getaccountButton = document.getElementById('getAccount')
const getaccountResults = document.getElementById('getAccountResult')
const getBalanceButton = document.getElementById('getBalance')
const getBalanceResult = document.getElementById('getBalanceResult')

const isMetaMaskInstalled = () => window.ethereum && window.ethereum.isMetaMask
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

// onBoarding
const startOnboarding = () => {
  window.open(downloadUrl, '_blank')
}
// Send form section
// const fromDiv = document.getElementById('fromInput')

// Send Aptos Section
const sendButton = document.getElementById('sendButton')

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
      getaccountButton.onclick = async () => {
        try {
          const account = await aptosApi.account()
          getaccountResults.innerHTML = account.address
        } catch (err) {
          console.error(err)
          getaccountResults.innerHTML = `Error: ${err.message}`
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
        const recipient = '0xf5fcc4ae6e4f6209ae1d641fe5de04f0c413f012ac0d5629893e901591e05a3f'
        const token = new TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString('0x1::aptos_coin::AptosCoin'))
        const amount = 1000
        const sender = await aptosApi.account(0)
        const scriptFunctionPayload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
          TxnBuilderTypes.EntryFunction.natural(
            '0x1::coin',
            'transfer',
            [token],
            [BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(recipient)), BCS.bcsSerializeUint64(amount)]
          ))
        const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
          client.getAccount(sender.address),
          client.getChainId()
        ])
        const rawTxn = new TxnBuilderTypes.RawTransaction(
          TxnBuilderTypes.AccountAddress.fromHex(sender.address),
          BigInt(sequenceNumber),
          scriptFunctionPayload,
          1000n,
          1n,
          BigInt(Math.floor(Date.now() / 1000) + 10),
          new TxnBuilderTypes.ChainId(chainId)
        )
        const signingMessage = TransactionBuilder.getSigningMessage(rawTxn)
        console.log("signingMessage", signingMessage);
        const result = await aptosApi.signTransaction(signingMessage)
        console.log(result)
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
      } else {
        onboardButton.innerText = 'Connect'
        onboardButton.onclick = onClickConnect
        onboardButton.disabled = false
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
    };
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
