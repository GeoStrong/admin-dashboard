"use client";

import Image from "next/image";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import logoLight from "@/public/logo-light.png";
import logoDark from "@/public/logo-dark.png";

const LogoImage = () => {
  const { themeProperty: logo } = useModeSwitch(logoLight, logoDark);

  return <Image src={logo} alt="logo" className="self-center" />;
};
export default LogoImage;
