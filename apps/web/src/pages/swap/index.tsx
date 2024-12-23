import { CHAIN_IDS } from 'utils/wagmi'
import SwapLayout from 'views/Swap/SwapLayout'
import { V3SwapForm } from 'views/Swap/V3Swap'

const SwapPage = () => (
  <SwapLayout>
    <V3SwapForm />
  </SwapLayout>
)

SwapPage.chains = CHAIN_IDS
SwapPage.screen = true

export default SwapPage
