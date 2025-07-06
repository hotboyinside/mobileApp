import { Badge as RNBadge } from '@rneui/base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useBadgeStyles } from './badgeStyles';
import { BadgeProps } from './badgeTypes';

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

	let sizeBadgeStyles;

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
				props.textStyle,
				generalTextStyles.extraTextStyle,
				{ color: textColor },
			]}
			badgeStyle={[
				generalBadgeStyles.extraBadgeStyle,
				sizeBadgeStyles,
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
		fontSize: 14,
		fontFamily: 'MontserratMedium',
		fontWeight: 500,
		lineHeight: 20,
	},
});

const sizeStyles = StyleSheet.create({
	xs: {
		paddingHorizontal: 6,
		paddingVertical: 1,
	},

	sm: {
		paddingHorizontal: 8,
		paddingVertical: 1,
	},

	md: {
		paddingHorizontal: 10,
		paddingVertical: 2,
	},

	lg: {
		paddingHorizontal: 12,
		paddingVertical: 4,
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
