import { ChainId } from '@pancakeswap/chains'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useClient } from 'wagmi'

export const queryChainIdAtom = atom(ChainId.BSC)

queryChainIdAtom.onMount = (set) => {
  set(ChainId.BSC)
}

export function useLocalNetworkChain() {
  const [queryChainId, setQueryChainId] = useAtom(queryChainIdAtom)
  return { chainId: queryChainId, setChainId: setQueryChainId }
}

export function useActiveChainId() {
  const client = useClient()
  const connectorChainId = client?.chain?.id
  const { chainId: queryChainId } = useLocalNetworkChain()

  const chainId = ChainId.BSC
  const isWrongNetwork = connectorChainId !== undefined && connectorChainId !== chainId
  const isNotMatched = useMemo(() => Boolean(connectorChainId && chainId !== connectorChainId), [chainId, connectorChainId])

  return {
    chainId,
    isWrongNetwork,
    isNotMatched,
  }
}
