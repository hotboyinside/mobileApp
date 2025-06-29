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
			gray: {},
			primary: {},
			red: {},
			green: {},
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
