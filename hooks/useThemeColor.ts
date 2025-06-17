import { useColorScheme } from '@/hooks/useColorScheme';

type ColorVariant = {
	light: string;
	dark: string;
};

export function useThemeColor(
	props: { light?: string; dark?: string },
	tokenColor: ColorVariant
) {
	const theme = useColorScheme() ?? 'light';
	const override = props[theme];

	return override ?? tokenColor[theme];
}
