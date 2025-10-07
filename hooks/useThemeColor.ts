import { AppTheme } from "@/constants/appTheme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { $appTheme } from "@/stores/userSettings/theme";
import { useUnit } from "effector-react";

export type ColorVariant = {
  light: string;
  dark: string;
};

type OverridableColor = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  tokenColor: ColorVariant,
  props: Partial<OverridableColor> = {}
) {
  const appTheme = useUnit($appTheme);
  const systemTheme = useColorScheme() || "light";

  let theme: "light" | "dark";

  if (appTheme === AppTheme.Light) {
    theme = "light";
  } else if (appTheme === AppTheme.Dark) {
    theme = "dark";
  } else {
    theme = systemTheme;
  }

  const override = props[theme];

  return override ?? tokenColor[theme];
}
