import { View, type ViewProps } from 'react-native';

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
	const backgroundColor = useThemeColor(appTokens.background.primary, {
		light: lightColor,
		dark: darkColor,
	});

	return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
