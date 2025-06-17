import { View, ViewStyle, type ViewProps } from 'react-native';

import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		appTokens.background.brandPrimary
	);

	return (
		<View style={[{ backgroundColor } as ViewStyle, style]} {...otherProps} />
	);
}
