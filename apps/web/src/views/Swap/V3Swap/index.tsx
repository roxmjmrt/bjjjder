import { SmartRouter } from '@pancakeswap/smart-router/evm'
import { useMemo } from 'react'
import { OrderType } from '@pancakeswap/price-api-sdk'
import { AppBody } from 'components/App'
import { logger } from 'utils/datadog'
import { useCurrencyUsdPrice } from 'hooks/useCurrencyUsdPrice'

import { BuyCryptoLink, FormHeader, FormMain, PricingAndSlippage, TradeDetails } from './containers'
import { CommitButton } from './containers/CommitButton'
import { useAllTypeBestTrade } from './hooks/useAllTypeBestTrade'
import { useCheckInsufficientError } from './hooks/useCheckSufficient'

export function V3SwapForm() {
  const {
    betterOrder,
    bestOrder,
    refreshOrder,
    tradeError,
    tradeLoaded,
    refreshDisabled,
    pauseQuoting,
    resumeQuoting,
    xOrder,
    ammOrder,
  } = useAllTypeBestTrade()
  const { data: inputUsdPrice } = useCurrencyUsdPrice(bestOrder?.trade?.inputAmount.currency)
  const { data: outputUsdPrice } = useCurrencyUsdPrice(bestOrder?.trade?.outputAmount.currency)

  const executionPrice = useMemo(
    () => (bestOrder?.trade ? SmartRouter.getExecutionPrice(bestOrder.trade) : undefined),
    [bestOrder?.trade],
  )
  const insufficientFundCurrency = useCheckInsufficientError(bestOrder)
  const commitHooks = useMemo(() => {
    return {
      beforeCommit: () => {
        pauseQuoting()
        try {
          const validTrade = ammOrder?.trade ?? xOrder?.trade
          if (!validTrade) {
            throw new Error('No valid trade to log')
          }
          const { inputAmount, tradeType, outputAmount } = validTrade
          const { currency: inputCurrency } = inputAmount
          const { currency: outputCurrency } = outputAmount
          const { chainId } = inputCurrency
          const ammInputAmount = ammOrder?.trade?.inputAmount.toExact()
          const ammOutputAmount = ammOrder?.trade?.outputAmount.toExact()
          const xInputAmount = xOrder?.trade?.inputAmount.toExact()
          const xOutputAmount = xOrder?.trade?.outputAmount.toExact()
          logger.info('X/AMM Quote Comparison', {
            chainId,
            tradeType,
            input: {
              address: inputCurrency.isToken ? inputCurrency.address : 'BNB',
              symbol: inputCurrency.symbol,
              amount: inputAmount.toExact(),
              amm: ammInputAmount,
              x: xInputAmount,
            },
            output: {
              address: outputCurrency.isToken ? outputCurrency.address : 'BNB',
              symbol: outputCurrency.symbol,
              amount: outputAmount.toExact(),
              amm: ammOutputAmount,
              x: xOutputAmount,
            },
            selected: bestOrder?.type === OrderType.V2 ? 'AMM' : 'X',
            better: betterOrder?.type === OrderType.V2 ? 'AMM' : 'X',
          })
        } catch (error) {
          logger.error('Failed to log X/AMM Quote Comparison', error)
        }
      },
      afterCommit: () => {
        resumeQuoting()
      },
    }
  }, [ammOrder?.trade, bestOrder?.type, betterOrder?.type, pauseQuoting, resumeQuoting, xOrder?.trade])

  return (
    <AppBody>
      <FormHeader refreshDisabled={refreshDisabled} onRefresh={refreshOrder} />
      <FormMain
        pricingAndSlippage={<PricingAndSlippage executionPrice={executionPrice} />}
        inputAmount={bestOrder?.trade?.inputAmount}
        outputAmount={bestOrder?.trade?.outputAmount}
        tradeLoading={!tradeLoaded}
        swapCommitButton={
          <CommitButton
            trade={bestOrder?.trade}
            tradeError={tradeError}
            tradeLoaded={tradeLoaded}
            beforeCommit={commitHooks.beforeCommit}
            afterCommit={commitHooks.afterCommit}
            insufficientFundCurrency={insufficientFundCurrency}
          />
        }
      />
      <TradeDetails
        loaded={tradeLoaded}
        trade={bestOrder?.trade}
        usdPrices={{
          input: inputUsdPrice,
          output: outputUsdPrice,
        }}
      />
      <BuyCryptoLink currency={insufficientFundCurrency} />
    </AppBody>
  )
}
