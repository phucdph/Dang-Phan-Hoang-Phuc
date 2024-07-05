import React from "react";
import { Avatar, AvatarProps } from "@mantine/core";

interface TokenIconProps extends Omit<AvatarProps, "src"> {
  token: string;
}

const getIconSrc = (token: string) =>
  `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token}.svg`;

const TokenIcon: React.FC<TokenIconProps> = ({ token, ...rest }) => {
  return <Avatar src={getIconSrc(token)} alt={token} {...rest} />;
};

export default TokenIcon;
