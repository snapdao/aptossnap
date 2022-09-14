import WalletAdapter from '@keystonehq/aptossnap-adapter';
import nacl from 'tweetnacl';

let walletAdapter;
let account = '';
let accountButtonsInitialized = false;

const defaultSnapId = 'npm:@keystonehq/aptossnap';

// eslint-disable-next-line node/no-process-env
const snapId = process.env.SNAP_ID || defaultSnapId;

console.log('snapId', snapId);

const downloadUrl =
  'https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk';

// Basic Actions Section
const onboardButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const getAccountResult = document.getElementById('getAccountResult');
const isMetaMaskInstalled = () => window.ethereum && window.ethereum.isMetaMask;

// Sign Message

const signMessageButton = document.getElementById('signMessage');
const signMessageResult = document.getElementById('signMessageResult');
const signMessageVerify = document.getElementById('signMessageVerify');
const signMessageVerifyResult = document.getElementById(
  'signMessageVerifyResult',
);

// onBoarding
const startOnboarding = () => {
  window.open(downloadUrl, '_blank');
};

// Send Aptos Section
const sendButton = document.getElementById('sendButton');
const sendResult = document.getElementById('sendResult');

const onClickConnect = async () => {
  try {
    setButtonStatus(onboardButton, {
      innerText: 'Connecting...',
      disabled: true,
    });
    await walletAdapter.connect();
    const newAccount = await walletAdapter.account();
    await handleStatus(newAccount);
  } catch (error) {
    console.error(error);
    applyConnectButtonInitialStatus();
  }
};

const accountButtons = [sendButton, signMessageButton, signMessageVerify];
const isMetaMaskConnected = () => account && account.length > 0;
const initializeAccountButtons = () => {
  if (accountButtonsInitialized) {
    return;
  }
  accountButtonsInitialized = true;
  sendButton.onclick = async () => {
    sendResult.innerHTML = '';
    setButtonStatus(sendButton, {
      innerText: 'Transfering...',
      disabled: true,
    });
    try {
      const transactionPayload = {
        arguments: [
          '0x1f410f23447ae2ad00e931b35c567783a5beb3b5d92c604f42f912416b7c3ccd',
          2,
        ],
        function: '0x1::coin::transfer',
        type: 'entry_function_payload',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      };
      const response = await walletAdapter.signAndSubmitTransaction(
        transactionPayload,
      );

      sendResult.innerHTML = response.hash;

      const a = document.createElement('a');
      a.id = 'open-explorer-btn';
      a.href = `https://explorer.devnet.aptos.dev/txn/${response.hash}`;
      a.target = '_blank';
      a.title = response;
      a.innerText = 'Open In AptosExplorer';

      sendResult.appendChild(a);

      setButtonStatus(sendButton, {
        innerText: 'Transfer',
        disabled: false,
      });
    } catch (e) {
      sendResult.innerHTML = e;
    }
  };
};
const onClickInstall = () => {
  onboardButton.innerText = 'Onboarding in progress';
  onboardButton.disabled = true;
  startOnboarding();
};

const onClickDisconnect = async () => {
  try {
    await walletAdapter.disconnect();
    await handleStatus();
    sendResult.innerText = '';
    signMessageResult.innerHTML = '';
    signMessageVerifyResult.innerHTML = '';
  } catch (error) {
    console.error(error);
  }
};

const updateButtons = () => {
  getAccountResult.innerHTML = account;
  const accountButtonsDisabled =
    !isMetaMaskInstalled() || !isMetaMaskConnected();
  if (accountButtonsDisabled) {
    for (const button of accountButtons) {
      button.disabled = true;
    }
  } else {
    sendButton.disabled = false;
    signMessageButton.disabled = false;
  }
  // window.ethereum exist
  if (!isMetaMaskInstalled()) {
    onboardButton.innerText = 'Click here to install MetaMask!';
    onboardButton.onclick = onClickInstall;
    onboardButton.disabled = false;
  } else if (isMetaMaskConnected()) {
    onboardButton.innerText = 'Connected';
    onboardButton.disabled = true;
    disconnectButton.disabled = false;
    disconnectButton.onclick = onClickDisconnect;
  } else {
    onboardButton.innerText = 'Connect';
    onboardButton.onclick = onClickConnect;
    onboardButton.disabled = false;
    disconnectButton.disabled = true;
  }
};

function setButtonStatus(button, config) {
  config.innerHTML && (button.innerHTML = config.innerHTML);
  config.innerText && (button.innerText = config.innerText);

  typeof config.disabled === 'boolean' && (button.disabled = config.disabled);

  typeof config.onclick === 'function' && (button.onclick = config.onclick);
}

function applyConnectButtonInitialStatus() {
  setButtonStatus(onboardButton, {
    innerText: 'Connect',
    disabled: false,
  });
  disconnectButton.disabled = true;
  onboardButton.onclick = onClickConnect;
}
async function handleStatus(newAccount) {
  if (newAccount) {
    account = newAccount.address;
  } else {
    account = '';
  }
  if (isMetaMaskConnected()) {
    initializeAccountButtons();
  }
  updateButtons();
}

const initialize = async () => {
  walletAdapter = new WalletAdapter({ network: 'devnet' }, snapId);
  signMessageButton.onclick = async () => {
    signMessageResult.innerHTML = '';
    signMessageVerifyResult.innerHTML = '';
    try {
      setButtonStatus(signMessageButton, {
        innerText: 'Signing...',
        disabled: true,
      });
      const message = 'hello';
      const nonce = 'random_string';
      const result = await walletAdapter.signMessage({
        message,
        nonce,
        application: true,
        chainId: true,
        address: true,
      });
      signMessageResult.innerHTML = result.signature;
      setButtonStatus(signMessageButton, {
        innerText: 'Sign',
        disabled: true,
      });
      signMessageVerify.disabled = false;
    } catch (error) {
      signMessageResult.innerHTML = error;
    }
  };
  signMessageVerify.onclick = async () => {
    try {
      account = await walletAdapter.account();
      signMessageVerifyResult.innerHTML = nacl.sign.detached.verify(
        Buffer.from(signMessageResult.innerHTML.slice(128), 'hex'),
        Buffer.from(signMessageResult.innerHTML.slice(0, 128), 'hex'),
        Buffer.from(account.publicKey.slice(2), 'hex'),
      );
      signMessageButton.disabled = false;
    } catch (error) {
      signMessageVerifyResult.innerHTML = error;
    }
  };
  updateButtons();
};

window.addEventListener('load', initialize);
