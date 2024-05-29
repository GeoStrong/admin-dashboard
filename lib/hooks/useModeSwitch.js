"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useModeSwitch = (firstCondition, secondCondition) => {
  const { theme } = useTheme();
  const [themeProperty, setThemeProperty] = useState();

  useEffect(() => {
    setThemeProperty(theme === "light" ? firstCondition : secondCondition);
  }, [firstCondition, secondCondition, theme]);

  return { themeProperty, theme };
};
export default useModeSwitch;
