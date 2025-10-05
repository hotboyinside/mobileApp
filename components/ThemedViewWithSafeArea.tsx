import React, { useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewWithSafeAreaProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
	safeEdges?: Edge[];
};

export function ThemedViewWithSafeArea({
	style,
	lightColor,
	darkColor,
	safeEdges,
	...otherProps
}: ThemedViewWithSafeAreaProps) {
	const insets = useSafeAreaInsets();

	const backgroundColor = useThemeColor(appTokens.background.primary);

	const safeStyle = useMemo(() => {
		if (!safeEdges || safeEdges.length === 0) return {};
		return {
			paddingTop: safeEdges.includes('top') ? insets.top : 0,
			paddingBottom: safeEdges.includes('bottom') ? insets.bottom : 0,
			paddingLeft: safeEdges.includes('left') ? insets.left : 0,
			paddingRight: safeEdges.includes('right') ? insets.right : 0,
		};
	}, [insets, safeEdges]);

	return (
		<View style={[{ backgroundColor }, safeStyle, style]} {...otherProps} />
	);
}
