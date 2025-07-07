import { Badge as RNBadge } from '@rneui/base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useBadgeStyles } from './badgeStyles';
import { BadgeProps } from './badgeTypes';

type SizeBadgeStyles = {
	paddingHorizontal: number;
	paddingVertical: number;
	fontSize?: number;
	lineHeight?: number;
};

export const Badge = ({
	onlyIcon,
	size = 'md',
	color = 'gray',
	variant = 'modern',
	...props
}: BadgeProps) => {
	const variantKey = variant as keyof typeof variantColorStyles;
	const colorKey =
		color as keyof (typeof variantColorStyles)[typeof variantKey];

	let sizeBadgeStyles: SizeBadgeStyles;

	if (onlyIcon) {
		sizeBadgeStyles = onlyIconSizeStyles[size];
	} else {
		sizeBadgeStyles = sizeStyles[size];
	}

	const { variantColorStyles, borderWidths } = useBadgeStyles();

	const badgeColorStyles = variantColorStyles[variantKey]?.[colorKey];
	const badgeBorderWidth = borderWidths[variantKey];

	const textColor = badgeColorStyles['color'];

	return (
		<RNBadge
			{...props}
			textStyle={[
				{
					fontSize: sizeBadgeStyles.fontSize,
					lineHeight: sizeBadgeStyles.lineHeight,
				},
				generalTextStyles.extraTextStyle,
				{ color: textColor },
				props.textStyle,
			]}
			badgeStyle={[
				generalBadgeStyles.extraBadgeStyle,
				{
					paddingVertical: sizeBadgeStyles.paddingVertical,
					paddingHorizontal: sizeBadgeStyles.paddingHorizontal,
				},
				badgeColorStyles,
				props.containerStyle,
			]}
			containerStyle={[{ borderWidth: badgeBorderWidth }, props.containerStyle]}
		/>
	);
};

const generalBadgeStyles = StyleSheet.create({
	extraBadgeStyle: {
		borderWidth: 0,
		borderRadius: 100,
		height: 'auto',
	},
});

const generalTextStyles = StyleSheet.create({
	extraTextStyle: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		textAlign: 'center',
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},
});

const sizeStyles = StyleSheet.create({
	xs: {
		paddingHorizontal: 6,
		paddingVertical: 1,
		fontSize: 10,
		lineHeight: 16,
	},

	sm: {
		paddingHorizontal: 8,
		paddingVertical: 1,
		fontSize: 12,
		lineHeight: 18,
	},

	md: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		fontSize: 14,
		lineHeight: 20,
	},

	lg: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		fontSize: 14,
		lineHeight: 20,
	},
});

const onlyIconSizeStyles = StyleSheet.create({
	xs: {
		paddingHorizontal: 1,
		paddingVertical: 1,
	},

	sm: {
		paddingHorizontal: 2,
		paddingVertical: 2,
	},

	md: {
		paddingHorizontal: 4,
		paddingVertical: 4,
	},

	lg: {
		paddingHorizontal: 6,
		paddingVertical: 6,
	},
});
