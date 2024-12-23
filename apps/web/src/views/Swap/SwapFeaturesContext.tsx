import { ChainId } from '@pancakeswap/chains'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { ACCESS_TOKEN_SUPPORT_CHAIN_IDS } from 'components/AccessRisk/config/supportedChains'
import { useActiveChainId } from 'hooks/useActiveChainId'
import React, { createContext, useMemo } from 'react'

export const SwapFeaturesContext = createContext<{
  isHotTokenSupported: boolean
  isChartSupported: boolean
  isStableSupported: boolean
  isAccessTokenSupported: boolean
  isChartExpanded: boolean
  isChartDisplayed: boolean
  setIsChartExpanded: React.Dispatch<React.SetStateAction<boolean>> | null
  setIsChartDisplayed: React.Dispatch<React.SetStateAction<boolean>> | null
}>({
  isHotTokenSupported: false,
  isChartSupported: false,
  isStableSupported: false,
  isAccessTokenSupported: false,
  isChartExpanded: false,
  isChartDisplayed: false,
  setIsChartExpanded: null,
  setIsChartDisplayed: null,
})

const STABLE_SUPPORT_CHAIN_IDS = [ChainId.BSC_TESTNET, ChainId.BSC]

export const SwapFeaturesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isMobile } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()

  const isChartSupported = useMemo(() => false, [])
  const isStableSupported = useMemo(() => STABLE_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])
  const isAccessTokenSupported = useMemo(() => ACCESS_TOKEN_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])
  const isHotTokenSupported = useMemo(() => false, [])

  return (
    <SwapFeaturesContext.Provider
      value={{
        isHotTokenSupported,
        isChartSupported,
        isStableSupported,
        isAccessTokenSupported,
        isChartExpanded: false,
        isChartDisplayed: false,
        setIsChartExpanded: null,
        setIsChartDisplayed: null,
      }}
    >
      {children}
    </SwapFeaturesContext.Provider>
  )
}
