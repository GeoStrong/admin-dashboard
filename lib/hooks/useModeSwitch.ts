"use client";

import { useTheme } from "next-themes";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type conditionType = string | StaticImageData;

const useModeSwitch = (
  firstCondition: conditionType,
  secondCondition: conditionType,
) => {
  const { theme } = useTheme();
  const [themeProperty, setThemeProperty] = useState<conditionType | undefined>(
    undefined,
  );

  useEffect(() => {
    setThemeProperty(theme === "light" ? firstCondition : secondCondition);
  }, [firstCondition, secondCondition, theme]);

  return { themeProperty, theme };
};
export default useModeSwitch;
