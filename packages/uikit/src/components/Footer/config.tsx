import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://x.com/MarmotBsc",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/MarmotOfficial",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
