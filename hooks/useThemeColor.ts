/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { appTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof appTheme.light & keyof typeof appTheme.dark
) {
	const theme = useColorScheme() ?? 'light';
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return appTheme[theme][colorName];
	}
}
