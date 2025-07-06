import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BadgeProps, BadgeVariant, VariantColorStyles } from './badgeTypes';

export const useBadgeStyles = (): {
	variantColorStyles: VariantColorStyles;
	borderWidths: Record<BadgeVariant, number>;
} => {
	const modernTextColor = useThemeColor({}, appTokens.text.secondary);
	const modernBorderColor = useThemeColor({}, appTokens.border.secondary);
	const modernBgColor = useThemeColor({}, appTokens.background.primary);

	const pillColorGrayTextColor = useThemeColor({}, appTokens.text.secondary);
	const pillColorGrayBgColor = useThemeColor({}, appTokens.background.tertiary);

	const pillColorPrimaryTextColor = useThemeColor(
		{},
		appTokens.text.brandSecondary
	);
	const pillColorPrimaryBgColor = useThemeColor(
		{},
		appTokens.background.brandPrimary
	);

	const pillColorRedTextColor = useThemeColor({}, appTokens.text.errorPrimary);
	const pillColorRedBgColor = useThemeColor(
		{},
		appTokens.background.errorPrimary
	);

	const pillColorGreenTextColor = useThemeColor(
		{},
		appTokens.text.successPrimary
	);
	const pillColorGreenBgColor = useThemeColor(
		{},
		appTokens.background.successPrimary
	);

	const filledPrimaryTextColor = useThemeColor(
		{},
		appTokens.text.primaryOnBrand
	);
	const filledPrimaryFgColor = useThemeColor(
		{},
		appTokens.foreground.brandSecondary
	);

	const filledRedTextColor = useThemeColor({}, appTokens.text.primaryOnBrand);
	const filledRedFgColor = useThemeColor(
		{},
		appTokens.foreground.errorSecondary
	);

	const filledGreenTextColor = useThemeColor({}, appTokens.text.primaryOnBrand);
	const filledGreenFgColor = useThemeColor(
		{},
		appTokens.foreground.successSecondary
	);

	const keywordsGrayTextColor = useThemeColor({}, appTokens.utilityGray[700]);
	const keywordsGrayBgColor = useThemeColor({}, appTokens.utilityGray[100]);

	const keywordsPinkTextColor = useThemeColor({}, appTokens.utilityPink[700]);
	const keywordsPinkBgColor = useThemeColor({}, appTokens.utilityPink[50]);

	const keywordsRedTextColor = useThemeColor({}, appTokens.utilityRed[700]);
	const keywordsRedBgColor = useThemeColor({}, appTokens.utilityRed[50]);

	const keywordsOrangeTextColor = useThemeColor(
		{},
		appTokens.utilityOrange[700]
	);
	const keywordsOrangeBgColor = useThemeColor({}, appTokens.utilityOrange[50]);

	const keywordsYellowTextColor = useThemeColor(
		{},
		appTokens.utilityYellow[700]
	);
	const keywordsYellowBgColor = useThemeColor({}, appTokens.utilityYellow[50]);

	const keywordsLimeTextColor = useThemeColor({}, appTokens.utilityLime[700]);
	const keywordsLimeBgColor = useThemeColor({}, appTokens.utilityLime[50]);

	const keywordsGreenTextColor = useThemeColor({}, appTokens.utilityGreen[700]);
	const keywordsGreenBgColor = useThemeColor({}, appTokens.utilityGreen[100]);

	const keywordsBlueTextColor = useThemeColor({}, appTokens.utilityBlue[700]);
	const keywordsBlueBgColor = useThemeColor({}, appTokens.utilityBlue[50]);

	const keywordsGrayBlueTextColor = useThemeColor(
		{},
		appTokens.utilityGrayBlue[700]
	);
	const keywordsGrayBlueBgColor = useThemeColor(
		{},
		appTokens.utilityGrayBlue[50]
	);

	const keywordsVioletTextColor = useThemeColor(
		{},
		appTokens.utilityViolet[700]
	);
	const keywordsVioletBgColor = useThemeColor({}, appTokens.utilityViolet[50]);

	const variantColorStyles: VariantColorStyles = {
		modern: {
			gray: {
				color: modernTextColor,
				borderColor: modernBorderColor,
				backgroundColor: modernBgColor,
			},
		},

		pillColor: {
			gray: {
				color: pillColorGrayTextColor,
				backgroundColor: pillColorGrayBgColor,
			},

			primary: {
				color: pillColorPrimaryTextColor,
				backgroundColor: pillColorPrimaryBgColor,
			},

			red: {
				color: pillColorRedTextColor,
				backgroundColor: pillColorRedBgColor,
			},

			green: {
				color: pillColorGreenTextColor,
				backgroundColor: pillColorGreenBgColor,
			},
		},

		filled: {
			primary: {
				color: filledPrimaryTextColor,
				backgroundColor: filledPrimaryFgColor,
			},

			red: {
				color: filledRedTextColor,
				backgroundColor: filledRedFgColor,
			},

			green: {
				color: filledGreenTextColor,
				backgroundColor: filledGreenFgColor,
			},
		},

		keywords: {
			gray: {
				color: keywordsGrayTextColor,
				backgroundColor: keywordsGrayBgColor,
			},
			pink: {
				color: keywordsPinkTextColor,
				backgroundColor: keywordsPinkBgColor,
			},
			red: {
				color: keywordsRedTextColor,
				backgroundColor: keywordsRedBgColor,
			},
			orange: {
				color: keywordsOrangeTextColor,
				backgroundColor: keywordsOrangeBgColor,
			},
			yellow: {
				color: keywordsYellowTextColor,
				backgroundColor: keywordsYellowBgColor,
			},
			lime: {
				color: keywordsLimeTextColor,
				backgroundColor: keywordsLimeBgColor,
			},
			green: {
				color: keywordsGreenTextColor,
				backgroundColor: keywordsGreenBgColor,
			},
			blue: {
				color: keywordsBlueTextColor,
				backgroundColor: keywordsBlueBgColor,
			},
			grayBlue: {
				color: keywordsGrayBlueTextColor,
				backgroundColor: keywordsGrayBlueBgColor,
			},
			violet: {
				color: keywordsVioletTextColor,
				backgroundColor: keywordsVioletBgColor,
			},
		},
	};

	const borderWidths: Record<BadgeProps['variant'], number> = {
		modern: 1,
		pillColor: 0,
		filled: 0,
		keywords: 0,
	};

	return { variantColorStyles, borderWidths };
};
