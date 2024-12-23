import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | MarmotSwap',
  defaultTitle: 'MarmotSwap',
  description: 'Trade, earn, and own crypto on MarmotSwap DEX',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@MarmotBsc',
    site: '@MarmotBsc',
  },
  openGraph: {
    title: "MarmotSwap - The Leading DEX on BNB Chain",
    description: 'Trade, earn, and own crypto on MarmotSwap DEX',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}
