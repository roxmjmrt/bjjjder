import { ChainId } from '@pancakeswap/chains'
import { ModalV2 } from '@pancakeswap/uikit'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { atom, useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { useCallback, useMemo } from 'react'
import { viemClients } from 'utils/viem'
import { CHAIN_IDS } from 'utils/wagmi'

export const hideWrongNetworkModalAtom = atom(false)

const PageNetworkSupportModal = dynamic(
  () => import('./PageNetworkSupportModal').then((mod) => mod.PageNetworkSupportModal),
  { ssr: false },
)
const WrongNetworkModal = dynamic(() => import('./WrongNetworkModal').then((mod) => mod.WrongNetworkModal), {
  ssr: false },
)
const UnsupportedNetworkModal = dynamic(
  () => import('./UnsupportedNetworkModal').then((mod) => mod.UnsupportedNetworkModal),
  { ssr: false },
)

export function NetworkModal({ pageSupportedChains = SUPPORT_ONLY_BSC }: { pageSupportedChains?: number[] }) {
  const { chainId, chain, isWrongNetwork } = useActiveWeb3React()
  const [dismissWrongNetwork, setDismissWrongNetwork] = useAtom(hideWrongNetworkModalAtom)

  const isBNBChain = chainId === ChainId.BSC
  const isPageNotSupported = useMemo(
    () => pageSupportedChains.length > 0 && chainId && !pageSupportedChains.includes(chainId),
    [chainId, pageSupportedChains],
  )

  if (isPageNotSupported && isBNBChain) {
    return <PageNetworkSupportModal />
  }

  if ((chainId && !CHAIN_IDS.includes(chainId)) || !viemClients[chainId]) {
    return <UnsupportedNetworkModal pageSupportedChains={SUPPORT_ONLY_BSC} />
  }

  if (isWrongNetwork && !dismissWrongNetwork && chain) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <WrongNetworkModal currentChain={chain} onDismiss={() => setDismissWrongNetwork(true)} />
      </ModalV2>
    )
  }

  return null
}
