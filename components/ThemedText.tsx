import { StyleSheet, Text, type TextProps } from 'react-native';

import { appTokens } from '@/constants/tokens';
import { ColorVariant, useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextType =
	| 'default'
	| 'displayXl'
	| 'displayLg'
	| 'displayMd'
	| 'displaySm'
	| 'displayXs'
	| 'textXl'
	| 'textLg'
	| 'textMd'
	| 'textSm'
	| 'textXs'
	| 'textXss';

export type ThemedTextProps = TextProps & {
	tokenColor?: ColorVariant;
	type?: ThemedTextType;
};

export function ThemedText({
	style,
	tokenColor = appTokens.text.primary,
	type = 'default',
	...rest
}: ThemedTextProps) {
	const textColor = useThemeColor(tokenColor);

	return (
		<Text
			style={[
				{ fontFamily: 'MontserratRegular' },
				{ color: textColor },
				type === 'default' ? styles.textMd : undefined,
				type === 'displayXl' ? styles.displayXl : undefined,
				type === 'displayLg' ? styles.displayLg : undefined,
				type === 'displayMd' ? styles.displayMd : undefined,
				type === 'displaySm' ? styles.displaySm : undefined,
				type === 'displayXs' ? styles.displayXs : undefined,
				type === 'textXl' ? styles.textXl : undefined,
				type === 'textLg' ? styles.textLg : undefined,
				type === 'textMd' ? styles.textMd : undefined,
				type === 'textSm' ? styles.textSm : undefined,
				type === 'textXs' ? styles.textXs : undefined,
				type === 'textXss' ? styles.textXss : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	displayXl: {
		fontSize: 60,
		lineHeight: 72,
		letterSpacing: 0,
	},
	displayLg: {
		fontSize: 48,
		lineHeight: 60,
	},
	displayMd: {
		fontSize: 36,
		lineHeight: 44,
	},
	displaySm: {
		fontSize: 30,
		lineHeight: 38,
	},
	displayXs: {
		fontSize: 24,
		lineHeight: 32,
	},
	textXl: {
		fontSize: 20,
		lineHeight: 30,
	},
	textLg: {
		fontSize: 18,
		lineHeight: 28,
	},
	textMd: {
		fontSize: 16,
		lineHeight: 24,
	},
	textSm: {
		fontSize: 14,
		lineHeight: 20,
	},
	textXs: {
		fontSize: 12,
		lineHeight: 18,
	},
	textXss: {
		fontSize: 10,
		lineHeight: 16,
	},
});
