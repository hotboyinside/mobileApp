import { useColorScheme } from '@/hooks/useColorScheme';

export type ColorVariant = {
	light: string;
	dark: string;
};

type OverridableColor = {
	light?: string;
	dark?: string;
};

export function useThemeColor(
	tokenColor: ColorVariant,
	props: Partial<OverridableColor> = {}
) {
	const theme = useColorScheme() || 'light';
	const override = props[theme];

	return override ?? tokenColor[theme];
}
