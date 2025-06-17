import { StyleSheet, Text, type TextProps } from 'react-native';

import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'displayXl' | 'displayLg' | 'displayMd' | 'displaySm' | 'displayXs' | 'textXl' | 'textLg' | 'textMd' | 'textSm' | 'textXs' | 'textXss';
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'default',
	...rest
}: ThemedTextProps) {
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		appTokens.text.primary
	);

	return (
		<Text
			style={[
				{ color },
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
		fontWeight: '700',
	},
	displayLg: {
		fontSize: 48,
		lineHeight: 60,
		fontWeight: '700',
	},
	displayMd: {
		fontSize: 36,
		lineHeight: 44,
		fontWeight: '700',
	},
	displaySm: {
		fontSize: 30,
		lineHeight: 38,
		fontWeight: '700',
	},
	displayXs: {
		fontSize: 24,
		lineHeight: 32,
		fontWeight: '700',
	},
	textXl: {
		fontSize: 20,
		lineHeight: 30,
		fontWeight: '700',
	},
	textLg: {
		fontSize: 18,
		lineHeight: 28,
		fontWeight: '700',
	},
	textMd: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '700',
	},
	textSm: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: '700',
	},
	textXs: {
		fontSize: 12,
		lineHeight: 18,
		fontWeight: '700',
	},
	textXss: {
		fontSize: 10,
		lineHeight: 16,
		fontWeight: '700',
	},
});
