import { appTokens } from '@/constants/tokens';
import { KeywordsColorVariants } from '@/types/keywords';
import { useThemeColor } from './useThemeColor';

type KeywordColors = {
	icon: { dark: string; light: string };
	text: { dark: string; light: string };
	background: { dark: string; light: string };
};

const keywordsColorsMap: Record<KeywordsColorVariants, KeywordColors> = {
	[KeywordsColorVariants.Red]: {
		icon: appTokens.utilityRed[500],
		text: appTokens.utilityRed[700],
		background: appTokens.utilityRed[50],
	},
	[KeywordsColorVariants.Blue]: {
		icon: appTokens.utilityBlue[500],
		text: appTokens.utilityBlue[700],
		background: appTokens.utilityBlue[100],
	},
	[KeywordsColorVariants.Green]: {
		icon: appTokens.utilityGreen[500],
		text: appTokens.utilityGreen[700],
		background: appTokens.utilityGreen[100],
	},
	[KeywordsColorVariants.Gray]: {
		icon: appTokens.utilityGray[500],
		text: appTokens.utilityGray[700],
		background: appTokens.utilityGray[100],
	},
	[KeywordsColorVariants.Pink]: {
		icon: appTokens.utilityPink[500],
		text: appTokens.utilityPink[700],
		background: appTokens.utilityPink[100],
	},
	[KeywordsColorVariants.Orange]: {
		icon: appTokens.utilityOrange[500],
		text: appTokens.utilityOrange[700],
		background: appTokens.utilityOrange[100],
	},
	[KeywordsColorVariants.Yellow]: {
		icon: appTokens.utilityYellow[500],
		text: appTokens.utilityYellow[700],
		background: appTokens.utilityYellow[100],
	},
	[KeywordsColorVariants.Lime]: {
		icon: appTokens.utilityLime[500],
		text: appTokens.utilityLime[700],
		background: appTokens.utilityLime[100],
	},
	[KeywordsColorVariants.Slate]: {
		icon: appTokens.utilityGrayBlue[500],
		text: appTokens.utilityGrayBlue[700],
		background: appTokens.utilityGrayBlue[100],
	},
	[KeywordsColorVariants.Violet]: {
		icon: appTokens.utilityViolet[500],
		text: appTokens.utilityViolet[700],
		background: appTokens.utilityViolet[100],
	},
};

export const useKeywordsColors = (): Record<
	KeywordsColorVariants,
	{ icon: string; text: string; background: string }
> => {
	const redIcon = useThemeColor(keywordsColorsMap.Red.icon);
	const redText = useThemeColor(keywordsColorsMap.Red.text);
	const redBg = useThemeColor(keywordsColorsMap.Red.background);

	const blueIcon = useThemeColor(keywordsColorsMap.Blue.icon);
	const blueText = useThemeColor(keywordsColorsMap.Blue.text);
	const blueBg = useThemeColor(keywordsColorsMap.Blue.background);

	const greenIcon = useThemeColor(keywordsColorsMap.Green.icon);
	const greenText = useThemeColor(keywordsColorsMap.Green.text);
	const greenBg = useThemeColor(keywordsColorsMap.Green.background);

	const grayIcon = useThemeColor(keywordsColorsMap.Gray.icon);
	const grayText = useThemeColor(keywordsColorsMap.Gray.text);
	const grayBg = useThemeColor(keywordsColorsMap.Gray.background);

	const pinkIcon = useThemeColor(keywordsColorsMap.Pink.icon);
	const pinkText = useThemeColor(keywordsColorsMap.Pink.text);
	const pinkBg = useThemeColor(keywordsColorsMap.Pink.background);

	const orangeIcon = useThemeColor(keywordsColorsMap.Orange.icon);
	const orangeText = useThemeColor(keywordsColorsMap.Orange.text);
	const orangeBg = useThemeColor(keywordsColorsMap.Orange.background);

	const yellowIcon = useThemeColor(keywordsColorsMap.Yellow.icon);
	const yellowText = useThemeColor(keywordsColorsMap.Yellow.text);
	const yellowBg = useThemeColor(keywordsColorsMap.Yellow.background);

	const limeIcon = useThemeColor(keywordsColorsMap.Lime.icon);
	const limeText = useThemeColor(keywordsColorsMap.Lime.text);
	const limeBg = useThemeColor(keywordsColorsMap.Lime.background);

	const slateIcon = useThemeColor(keywordsColorsMap.Slate.icon);
	const slateText = useThemeColor(keywordsColorsMap.Slate.text);
	const slateBg = useThemeColor(keywordsColorsMap.Slate.background);

	const violetIcon = useThemeColor(keywordsColorsMap.Violet.icon);
	const violetText = useThemeColor(keywordsColorsMap.Violet.text);
	const violetBg = useThemeColor(keywordsColorsMap.Violet.background);

	return {
		Red: { icon: redIcon, text: redText, background: redBg },
		Blue: { icon: blueIcon, text: blueText, background: blueBg },
		Green: { icon: greenIcon, text: greenText, background: greenBg },
		Gray: { icon: grayIcon, text: grayText, background: grayBg },
		Pink: { icon: pinkIcon, text: pinkText, background: pinkBg },
		Orange: { icon: orangeIcon, text: orangeText, background: orangeBg },
		Yellow: { icon: yellowIcon, text: yellowText, background: yellowBg },
		Lime: { icon: limeIcon, text: limeText, background: limeBg },
		Slate: { icon: slateIcon, text: slateText, background: slateBg },
		Violet: { icon: violetIcon, text: violetText, background: violetBg },
	};
};
