import MetaMaskOnboarding from '@metamask/onboarding'
import { MetamaskAptosSnap } from '@keystonehq/aptossnap-adapter'

const onboardButton = document.getElementById('connectButton')

const onClickInstall = () => {
  onboardButton.innerText = 'Onboarding in progress'
  onboardButton.disabled = true
  onboarding.startOnboarding()
}

let snap;
let aptosApi;

const currentUrl = new URL(window.location.href)
const forwarderOrigin =
    currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined
const urlSearchParams = new URLSearchParams(window.location.search)
const deployedContractAddress = urlSearchParams.get('contract')

const { isMetaMaskInstalled } = MetaMaskOnboarding

const inialize = async () => {
  try {
    snap = new MetamaskAptosSnap()
    aptosApi = await snap.getMetamaskSnapApi()
    const onClickConnect = async () => {
      try {
        aptosApi.connect()
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
