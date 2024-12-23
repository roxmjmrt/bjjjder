import { useTranslation } from '@pancakeswap/localization'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { styled } from 'styled-components'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'

const SwapSelectionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 16px;
  }
`

export const SwapSelection = ({ style }: { style?: React.CSSProperties }) => {
  const { t } = useTranslation()

  return (
    <SwapSelectionWrapper style={style}>
      <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} />
    </SwapSelectionWrapper>
  )
}
