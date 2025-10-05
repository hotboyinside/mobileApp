import { ThemedText, ThemedTextType } from '@/components/ThemedText';
import { StyleSheet, View } from 'react-native';
import ArrowDownIcon from '@/assets/icons/alt-arrow-down-icon.svg';
import ArrowUpIcon from '@/assets/icons/alt-arrow-up-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

type ChangeProps = {
	value?: number;
	priceChange?: number;
	size?: 'xs' | 'sm';
	showPercent?: boolean;
};

type ChangeSizeStyles = {
	iconSize: number;
	fontType: ThemedTextType;
};

export const Change = ({
	value,
	priceChange,
	size = 'sm',
	showPercent = true,
}: ChangeProps) => {
	const hasValue = value !== undefined && value !== null;

	let displayValue = '-';
	let isPositive: boolean | undefined;

	if (hasValue) {
		displayValue = showPercent ? `${value}%` : String(value.toPrecision(3));
	}

	if (hasValue && priceChange) {
		isPositive = priceChange >= 0;
	} else if (hasValue) {
		isPositive = value >= 0;
	}

	let changeSizeStyles: ChangeSizeStyles;
	if (size === 'xs') {
		changeSizeStyles = { iconSize: 12, fontType: 'textXs' };
	} else {
		changeSizeStyles = { iconSize: 16, fontType: 'textSm' };
	}

	const successText = useThemeColor(appTokens.text.successPrimary);
	const errorText = useThemeColor(appTokens.text.errorPrimary);
	const successIcon = useThemeColor(appTokens.foreground.successPrimary);
	const errorIcon = useThemeColor(appTokens.foreground.errorPrimary);

	let textColor: string | undefined;
	let iconColor: string | undefined;

	if (isPositive === true) {
		textColor = successText;
		iconColor = successIcon;
	} else if (isPositive === false) {
		textColor = errorText;
		iconColor = errorIcon;
	}

	return (
		<View style={styles.changeContainer}>
			{isPositive === true && (
				<ArrowUpIcon
					width={changeSizeStyles.iconSize}
					height={changeSizeStyles.iconSize}
					color={iconColor}
				/>
			)}
			{isPositive === false && (
				<ArrowDownIcon
					width={changeSizeStyles.iconSize}
					height={changeSizeStyles.iconSize}
					color={iconColor}
				/>
			)}
			<ThemedText
				style={[styles.change, textColor ? { color: textColor } : null]}
				type={changeSizeStyles.fontType}
			>
				{displayValue}
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
		fontWeight: '600',
	},
});
