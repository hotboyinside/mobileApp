import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconNode } from '@rneui/base';
import {
	Button as RNButton,
	ButtonProps as RNButtonProps,
} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SolidSpinner } from './SolidSpinner/SolidSpinner';

type ButtonColorStyles = {
	color?: string;
	backgroundColor?: string;
	borderColor?: string;
};

type ButtonSizeStyles = {
	paddingHorizontal: number;
	paddingVertical: number;
	borderWidth?: number;
	fontSize?: number;
	lineHeight?: number;
};

type ButtonProps = RNButtonProps & {
	onlyIcon?: boolean;
	size?: 'sm' | 'md' | 'lg';
	variant?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'link-gray'
		| 'link'
		| 'destructive';
	isLoading?: boolean;
	loadingSpinnerProps?: React.ComponentProps<typeof SolidSpinner>;
};

const getTitlePadding = (
	icon?: IconNode,
	onlyIcon?: boolean,
	iconPosition?: 'left' | 'right' | 'top' | 'bottom'
) => {
	if (onlyIcon || !icon) return {};
	if (iconPosition === 'right') return { paddingRight: 8 };
	else if (iconPosition === 'left') return { paddingLeft: 8 };
	return { paddingLeft: 8 };
};

export const Button = ({
	size = 'md',
	variant,
	isLoading,
	loadingSpinnerProps,
	...props
}: ButtonProps) => {
	let buttonSizeStyles: ButtonSizeStyles;
	let buttonColorStyles: ButtonColorStyles = {};

	if (props.onlyIcon) {
		buttonSizeStyles = onlyIconSizeStyles[size];
	} else {
		buttonSizeStyles = sizeStyles[size];
	}

	const primaryFontColor = useThemeColor(
		appTokens.component.buttons.primary.fg
	);

	const disabledBgColor = useThemeColor(appTokens.background.disabled);
	const textColorDisabled = useThemeColor(appTokens.foreground.disabled);

	const secondaryBgColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.bg
	);
	const secondaryBorderColor = useThemeColor(appTokens.border.tertiary);
	const secondaryFontColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);
	const tertiaryFontColor = useThemeColor(
		appTokens.component.buttons.tertiaryGray.fg
	);
	const linkGrayFontColor = useThemeColor(
		appTokens.component.buttons.linkGray.fg
	);
	const linkGrayBackgroundColor = useThemeColor(
		appTokens.component.buttons.linkGray.bg
	);
	const linkFontColor = useThemeColor(appTokens.component.buttons.link.fg);

	const buttonDestructiveColor = appTokens.component.buttons.destructive.bg;

	switch (variant) {
		case 'primary':
			return props.disabled ? (
				<RNButton
					{...props}
					buttonStyle={[generalStyles.generalBorderRadius, buttonSizeStyles]}
					disabledStyle={{ backgroundColor: disabledBgColor }}
					disabledTitleStyle={[
						generalStyles.generalTextStyles,
						{ color: textColorDisabled },
					]}
					title={
						isLoading ? <SolidSpinner {...loadingSpinnerProps} /> : props.title
					}
				/>
			) : (
				<RNButton
					{...props}
					ViewComponent={LinearGradient as any}
					linearGradientProps={{
						colors: ['#FF692E', '#FF4405'],
						start: [0, 0],
						end: [1, 0],
					}}
					buttonStyle={[generalStyles.generalBorderRadius, buttonSizeStyles]}
					titleStyle={[
						generalStyles.generalTextStyles,
						{
							fontSize: buttonSizeStyles.fontSize,
							lineHeight: buttonSizeStyles.lineHeight,
							color: primaryFontColor,
						},
						props.titleStyle,
					]}
					title={
						isLoading ? <SolidSpinner {...loadingSpinnerProps} /> : props.title
					}
				/>
			);
		case 'secondary':
			buttonSizeStyles = { ...buttonSizeStyles, borderWidth: 1 };
			buttonColorStyles['backgroundColor'] = secondaryBgColor;
			buttonColorStyles['borderColor'] = secondaryBorderColor;
			buttonColorStyles['color'] = secondaryFontColor;
			break;
		case 'tertiary':
			buttonColorStyles['color'] = tertiaryFontColor;
			buttonColorStyles['backgroundColor'] = 'transparent';
			break;
		case 'link-gray':
			buttonColorStyles['backgroundColor'] = linkGrayBackgroundColor;
			buttonColorStyles['color'] = linkGrayFontColor;
			buttonSizeStyles = {
				...buttonSizeStyles,
				paddingHorizontal: 0,
				paddingVertical: 0,
			};
			break;
		case 'link':
			buttonColorStyles['color'] = linkFontColor;
			buttonColorStyles['backgroundColor'] = 'transparent';
			break;
		case 'destructive':
			buttonColorStyles['color'] = primaryFontColor;
			buttonColorStyles['backgroundColor'] = buttonDestructiveColor;
			break;
	}

	return (
		<RNButton
			{...props}
			containerStyle={[generalStyles.generalBorderRadius, props.containerStyle]}
			buttonStyle={[
				generalStyles.generalBorderRadius,
				buttonColorStyles,
				buttonSizeStyles,
				props.buttonStyle,
			]}
			titleStyle={[
				generalStyles.generalTextStyles,
				{
					fontSize: buttonSizeStyles.fontSize,
					lineHeight: buttonSizeStyles.lineHeight,
					color: buttonColorStyles.color,
				},
				getTitlePadding(props.icon, props.onlyIcon, props.iconPosition),
				props.titleStyle,
			]}
			title={
				isLoading ? <SolidSpinner {...loadingSpinnerProps} /> : props.title
			}
			disabled={props.disabled}
		/>
	);
};

const generalStyles = StyleSheet.create({
	generalBorderRadius: {
		borderRadius: 12,
	},

	generalTextStyles: {
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},
});

const sizeStyles = StyleSheet.create({
	sm: {
		fontSize: 14,
		lineHeight: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},

	md: {
		fontSize: 14,
		lineHeight: 20,
		paddingHorizontal: 16,
		paddingVertical: 10,
	},

	lg: {
		fontSize: 16,
		lineHeight: 24,
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
});

const onlyIconSizeStyles = StyleSheet.create({
	sm: {
		paddingHorizontal: 6,
		paddingVertical: 6,
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
