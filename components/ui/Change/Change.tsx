import { ThemedText, ThemedTextType } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ArrowDownIcon from '@/assets/icons/alt-arrow-down-icon.svg';
import ArrowUpIcon from '@/assets/icons/alt-arrow-up-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

type ChangeProps = {
	value: string;
	size?: 'xs' | 'sm';
};

type ChangeSizeStyles = {
	iconSize: number;
	fontType: ThemedTextType;
};

export const Change = ({ value, size = 'sm' }: ChangeProps) => {
	const valueIsNumber = !isNaN(Number(value));
	const formattedValue = Number(value);
	const isPositiveValue = formattedValue >= 0;

	let percentChange;
	if (valueIsNumber) {
		percentChange = `${value}%`;
	}

	let changeSizeStyles: ChangeSizeStyles = {
		iconSize: 12,
		fontType: 'textXs',
	};

	switch (size) {
		case 'xs':
			changeSizeStyles['iconSize'] = 12;
			changeSizeStyles['fontType'] = 'textXs';
			break;
		case 'sm':
			changeSizeStyles['iconSize'] = 16;
			changeSizeStyles['fontType'] = 'textSm';
			break;
	}

	const textColor = useThemeColor(
		{},
		isPositiveValue
			? appTokens.text.successPrimary
			: appTokens.text.errorPrimary
	);
	const iconColor = useThemeColor(
		{},
		isPositiveValue
			? appTokens.foreground.successPrimary
			: appTokens.foreground.errorPrimary
	);

	return (
		<View style={styles.changeContainer}>
			<View>
				{valueIsNumber && isPositiveValue && (
					<ArrowUpIcon
						width={changeSizeStyles.iconSize}
						height={changeSizeStyles.iconSize}
						color={iconColor}
					/>
				)}
				{valueIsNumber && !isPositiveValue && (
					<ArrowDownIcon
						width={changeSizeStyles.iconSize}
						height={changeSizeStyles.iconSize}
						color={iconColor}
					/>
				)}
			</View>
			<ThemedText
				style={[styles.change, { color: textColor }]}
				type={changeSizeStyles.fontType}
			>
				{percentChange}
			</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	changeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	change: {
		fontFamily: 'MontserratSemiBold',
		fontWeight: 600,
	},
});
