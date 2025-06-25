import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	ButtonProps as RNButtonProps,
	Button as RNButton,
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

type ButtonColorStyles = {
	color?: string;
	backgroundColor?: string;
	borderColor?: string;
};

type ButtonProps = RNButtonProps & {
	onlyIcon?: boolean;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'primary' | 'secondary' | 'tertiary' | 'link-gray' | 'link';
};

export const Button = ({ size = 'md', variant, ...props }: ButtonProps) => {
	let buttonSizeStyles;
	let buttonColorStyles: ButtonColorStyles = {};

	if (props.onlyIcon) {
		buttonSizeStyles = onlyIconSizeStyles[size];
	} else {
		buttonSizeStyles = sizeStyles[size];
	}

	const secondaryBgColor = useThemeColor(
		{},
		appTokens.component.buttons.secondaryGray.bg
	);
	const secondaryBorderColor = useThemeColor({}, appTokens.border.tertiary);
	const secondaryFontColor = useThemeColor(
		{},
		appTokens.component.buttons.secondaryGray.fg
	);
	const tertiaryFontColor = useThemeColor(
		{},
		appTokens.component.buttons.tertiaryGray.fg
	);
	const linkGrayFontColor = useThemeColor(
		{},
		appTokens.component.buttons.linkGray.fg
	);
	const linkFontColor = useThemeColor({}, appTokens.component.buttons.link.fg);

	switch (variant) {
		case 'primary':
			return (
				<RNButton
					{...props}
					ViewComponent={LinearGradient as any}
					linearGradientProps={{
						colors: ['#FF692E', '#FF4405'],
						start: [0, 0],
						end: [1, 0],
					}}
					buttonStyle={[buttonSizeStyles, generalStyles.generalButtonStyles]}
				/>
			);
		case 'secondary':
			buttonColorStyles['backgroundColor'] = secondaryBgColor;
			buttonColorStyles['borderColor'] = secondaryBorderColor;
			buttonColorStyles['color'] = secondaryFontColor;
			break;
		case 'tertiary':
			buttonColorStyles['color'] = tertiaryFontColor;
		case 'link-gray':
			buttonColorStyles['color'] = linkGrayFontColor;
		case 'link':
			buttonColorStyles['color'] = linkFontColor;
	}

	return (
		<RNButton
			{...props}
			buttonStyle={[
				buttonColorStyles,
				buttonSizeStyles,
				generalStyles.generalButtonStyles,
			]}
		/>
	);
};

const generalStyles = StyleSheet.create({
	generalButtonStyles: {
		fontSize: 14,
		fontWeight: 600,
		borderRadius: 12,
		fontFamily: 'MontserratSemiBold',
	},
});

const sizeStyles = StyleSheet.create({
	sm: {
		paddingHorizontal: 12,
		paddingVertical: 6,
	},

	md: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},

	lg: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
});

const onlyIconSizeStyles = StyleSheet.create({
	sm: {
		paddingHorizontal: 8,
		paddingVertical: 8,
	},

	md: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},

	lg: {
		paddingHorizontal: 14,
		paddingVertical: 14,
	},
});
