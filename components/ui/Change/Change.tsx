import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ArrowDownIcon from '@/assets/icons/alt-arrow-down-icon.svg';
import ArrowUpIcon from '@/assets/icons/alt-arrow-up-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

type ChangeProps = {
	value: string;
};

export const Change = ({ value }: ChangeProps) => {
	const valueIsNumber = !isNaN(Number(value));
	const formattedValue = Number(value);
	const isPositiveValue = formattedValue >= 0;

	let percentChange;
	if (valueIsNumber) {
		percentChange = `${value}%`;
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
					<ArrowUpIcon width={16} height={16} color={iconColor} />
				)}
				{valueIsNumber && !isPositiveValue && (
					<ArrowDownIcon width={16} height={16} color={iconColor} />
				)}
			</View>
			<ThemedText style={[styles.change, { color: textColor }]} type='textXs'>
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
		fontSize: 12,
		fontWeight: 600,
		lineHeight: 20,
	},
});
