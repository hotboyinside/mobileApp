export interface UserKeyword {
	_id: string;
	word: string;
	color: KeywordsColorVariants;
	isVoiceoverEnabled: boolean;
	isFrozen?: boolean;
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
