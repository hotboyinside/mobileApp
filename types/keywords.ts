import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";

export enum KeywordsColorVariants {
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Gray = "Gray",
  Pink = "Pink",
  Orange = "Orange",
  Yellow = "Yellow",
  Lime = "Lime",
  Slate = "Slate",
  Violet = "Violet",
}

const keywordsColorsMap: Record<
  KeywordsColorVariants,
  { dark: string; light: string }
> = {
  [KeywordsColorVariants.Red]: appTokens.utilityRed[500],
  [KeywordsColorVariants.Blue]: appTokens.utilityBlue[500],
  [KeywordsColorVariants.Green]: appTokens.utilityGreen[500],
  [KeywordsColorVariants.Gray]: appTokens.utilityGray[500],
  [KeywordsColorVariants.Pink]: appTokens.utilityPink[500],
  [KeywordsColorVariants.Orange]: appTokens.utilityOrange[500],
  [KeywordsColorVariants.Yellow]: appTokens.utilityYellow[500],
  [KeywordsColorVariants.Lime]: appTokens.utilityLime[500],
  [KeywordsColorVariants.Slate]: appTokens.utilityGrayBlue[500],
  [KeywordsColorVariants.Violet]: appTokens.utilityViolet[500],
};

export const keywordsColors: Record<KeywordsColorVariants, string> =
  Object.values(KeywordsColorVariants).reduce((acc, key) => {
    acc[key] = useThemeColor({}, keywordsColorsMap[key]);
    return acc;
  }, {} as Record<KeywordsColorVariants, string>);
