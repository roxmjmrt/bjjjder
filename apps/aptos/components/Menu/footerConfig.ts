import { ContextApi } from '@pancakeswap/localization'
import { FooterLinkType } from '@pancakeswap/uikit'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('Support'),
    items: [
      {
        label: t('Get Help'),
        href: 'https://docs.pancakeswap.finance/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.pancakeswap.finance/readme/help/troubleshooting',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.pancakeswap.finance/',
      },
      {
        label: t('Audits'),
        href: 'https://docs.pancakeswap.finance/readme/audits',
      },
      {
        label: t('Legacy products'),
        href: 'https://docs.pancakeswap.finance/products/legacy-products',
      },
    ],
  },
]
