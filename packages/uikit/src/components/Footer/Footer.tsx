import { useIsMounted } from "@pancakeswap/hooks";
import React from "react";
import { useMatchBreakpoints } from "../../contexts";
import { Box, Flex } from "../Box";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledSocialLinks,
} from "./styles";

import { LogoIcon, LogoWithTextIcon } from "../Svg";
import { FooterProps } from "./types";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  buyCakeLink,
  chainId,
  ...props
}) => {
  const { isXl } = useMatchBreakpoints();
  return (
    <StyledFooter
      data-theme="dark"
      p={["40px 16px", null, "56px 40px 32px 40px"]}
      position="relative"
      {...props}
      justifyContent="center"
    >
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledSocialLinks order={[2]} pb={["42px", null, "32px"]} mb={["0", null, "32px"]} />
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
