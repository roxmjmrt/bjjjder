import { ChainId, chainNames } from '@pancakeswap/chains'
import memoize from 'lodash/memoize'
import { Chain, bsc as bsc_ } from 'wagmi/chains'

export const CHAIN_QUERY_NAME = {
  [ChainId.BSC]: chainNames[ChainId.BSC],
}

const CHAIN_QUERY_NAME_TO_ID = {
  [chainNames[ChainId.BSC].toLowerCase()]: ChainId.BSC,
}

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] : undefined
})

const bsc = {
  ...bsc_,
  rpcUrls: {
    ...bsc_.rpcUrls,
    public: {
      ...bsc_.rpcUrls,
      http: ['https://bsc-dataseed.binance.org/'],
    },
    default: {
      ...bsc_.rpcUrls.default,
      http: ['https://bsc-dataseed.binance.org/'],
    },
  },
} satisfies Chain

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS: ChainId[] = []

export const CHAINS: [Chain, ...Chain[]] = [bsc]

export const DEFAULT_CHAIN_ID = ChainId.BSC
