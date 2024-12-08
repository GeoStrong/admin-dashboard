"use client";

import Image from "next/image";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import logoLight from "@/public/logo-light.png";
import logoDark from "@/public/logo-dark.png";

const LogoImage: React.FC<{ className: string }> = ({ className }) => {
  const { themeProperty: logo } = useModeSwitch(logoLight, logoDark);

  return <Image src={logo} alt="logo" className={className} />;
};
export default LogoImage;
