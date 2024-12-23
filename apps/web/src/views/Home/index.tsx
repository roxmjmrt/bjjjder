import { useTranslation } from '@pancakeswap/localization'
import { Box, Flex, PageSection, useMatchBreakpoints } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { styled } from 'styled-components'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <Box style={{ width: isMobile ? '100vw' : 'calc(100vw - 8px)', overflow: 'hidden', boxSizing: 'border-box' }}>
      <style jsx global>
        {`
          #home-1 .page-bg {
            background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
          }
          [data-theme='dark'] #home-1 .page-bg {
            background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
          }
        `}
      </style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Flex
          pt={['16px', null, null, '24px']}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Box width="100%" maxWidth="1200px">
            <Flex flexDirection="column" alignItems="center" justifyContent="center">
              <Box mb="24px" maxWidth="800px" textAlign="center">
                <h1>{t('Welcome to PancakeSwap')}</h1>
                <p>{t('The #1 AMM and yield farm on BNB Smart Chain.')}</p>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </StyledHeroSection>
    </Box>
  )
}

export default Home
