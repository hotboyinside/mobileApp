import { useColorScheme } from '@/hooks/useColorScheme';

export type ColorVariant = {
	light: string;
	dark: string;
};

export function useThemeColor(
	props: { light?: string; dark?: string },
	tokenColor: ColorVariant
) {
	const theme = 'dark';
	const override = props[theme];

	return override ?? tokenColor[theme];
}
