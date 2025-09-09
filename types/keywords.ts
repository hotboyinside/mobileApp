import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface UserKeyword {
	_id: string;
	word: string;
	color: KeywordsColorVariants;
	isVoiceoverEnabled: boolean;
	iconKey?: string;
}

export enum KeywordsMode {
	EditMode = 'EditMode',
	InsertMode = 'InsertMode',
}

export interface UserKeywordFromBackend extends Omit<UserKeyword, 'color'> {
	color: KeywordsColorVariantsFromDesktop;
}
export type KeywordForPostBackend = Omit<UserKeywordFromBackend, '_id'>;

export type KeywordFromClient = Omit<UserKeyword, '_id'>;

export enum KeywordsColorVariantsFromDesktop {
	RedWine = 'redWine',
	Cyan = 'cyan',
	GreenJungle = 'greenJungle',
	GrayCharcoal = 'grayCharcoal',
	PinkLavender = 'pinkLavender',
	Olive = 'olive',
	YellowMustard = 'yellowMustard',
	BlueTurquoise = 'blueTurquoise',
	BlueIndigo = 'blueIndigo',
	Purple = 'purple',
}

export enum KeywordsColorVariants {
	Red = 'Red',
	Blue = 'Blue',
	Green = 'Green',
	Gray = 'Gray',
	Pink = 'Pink',
	Orange = 'Orange',
	Yellow = 'Yellow',
	Lime = 'Lime',
	Slate = 'Slate',
	Violet = 'Violet',
}

export const desktopToMobileColorMap: Record<
	KeywordsColorVariantsFromDesktop,
	KeywordsColorVariants
> = {
	[KeywordsColorVariantsFromDesktop.RedWine]: KeywordsColorVariants.Red,
	[KeywordsColorVariantsFromDesktop.Cyan]: KeywordsColorVariants.Blue,
	[KeywordsColorVariantsFromDesktop.GreenJungle]: KeywordsColorVariants.Green,
	[KeywordsColorVariantsFromDesktop.GrayCharcoal]: KeywordsColorVariants.Gray,
	[KeywordsColorVariantsFromDesktop.PinkLavender]: KeywordsColorVariants.Pink,
	[KeywordsColorVariantsFromDesktop.YellowMustard]:
		KeywordsColorVariants.Orange,
	[KeywordsColorVariantsFromDesktop.Olive]: KeywordsColorVariants.Yellow,
	[KeywordsColorVariantsFromDesktop.BlueTurquoise]: KeywordsColorVariants.Lime,
	[KeywordsColorVariantsFromDesktop.BlueIndigo]: KeywordsColorVariants.Violet,
	[KeywordsColorVariantsFromDesktop.Purple]: KeywordsColorVariants.Slate,
};

export const mobileToDesktopColorMap: Record<
	KeywordsColorVariants,
	KeywordsColorVariantsFromDesktop
> = {
	[KeywordsColorVariants.Red]: KeywordsColorVariantsFromDesktop.RedWine,
	[KeywordsColorVariants.Blue]: KeywordsColorVariantsFromDesktop.Cyan,
	[KeywordsColorVariants.Green]: KeywordsColorVariantsFromDesktop.GreenJungle,
	[KeywordsColorVariants.Gray]: KeywordsColorVariantsFromDesktop.GrayCharcoal,
	[KeywordsColorVariants.Pink]: KeywordsColorVariantsFromDesktop.PinkLavender,
	[KeywordsColorVariants.Orange]:
		KeywordsColorVariantsFromDesktop.YellowMustard,
	[KeywordsColorVariants.Yellow]: KeywordsColorVariantsFromDesktop.Olive,
	[KeywordsColorVariants.Lime]: KeywordsColorVariantsFromDesktop.BlueTurquoise,
	[KeywordsColorVariants.Violet]: KeywordsColorVariantsFromDesktop.BlueIndigo,
	[KeywordsColorVariants.Slate]: KeywordsColorVariantsFromDesktop.Purple,
};

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

export const keywordsColors: Record<
	KeywordsColorVariants,
	{ icon: string; text: string; background: string }
> = Object.values(KeywordsColorVariants).reduce((acc, key) => {
	acc[key] = {
		icon: useThemeColor({}, keywordsColorsMap[key].icon),
		text: useThemeColor({}, keywordsColorsMap[key].text),
		background: useThemeColor({}, keywordsColorsMap[key].background),
	};
	return acc;
}, {} as Record<KeywordsColorVariants, { icon: string; text: string; background: string }>);
