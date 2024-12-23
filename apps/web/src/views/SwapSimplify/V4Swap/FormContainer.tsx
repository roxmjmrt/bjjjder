import { Column, Text } from '@pancakeswap/uikit'
import { PropsWithChildren, memo } from 'react'

import { SwapUIV2 } from '@pancakeswap/widgets-internal'

const Title = memo(function Title() {
  return (
    <Text bold fontSize="20px" mb="8px" textAlign="center">
      MarmotSwap
    </Text>
  )
})

export const FormContainer = memo(function FormContainer({ children }: PropsWithChildren) {
  return (
    <SwapUIV2.InputPanelWrapper id="swap-page">
      <Title />
      <Column gap="sm">{children}</Column>
    </SwapUIV2.InputPanelWrapper>
  )
})
