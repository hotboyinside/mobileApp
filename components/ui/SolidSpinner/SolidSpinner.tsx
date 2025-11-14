import { appTokens } from '@/constants/tokens';
import { ColorVariant, useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

interface SolidSpinnerProps {
	size?: number;
	thickness?: number;
	token?: ColorVariant;
	duration?: number;
}

export const SolidSpinner: React.FC<SolidSpinnerProps> = ({
	size = 20,
	thickness = 2,
	token = appTokens.component.buttons.primary.fg,
	duration = 800,
}) => {
	const color = useThemeColor(token);
	const rotation = useSharedValue(0);

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration,
				easing: Easing.linear,
			}),
			-1
		);
	}, [rotation, duration]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<Animated.View style={[animatedStyle, { width: size, height: size }]}>
			<View
				style={{
					width: size,
					height: size,
					borderWidth: thickness,
					borderColor: color,
					borderTopColor: 'transparent',
					borderRadius: size / 2,
				}}
			/>
		</Animated.View>
	);
};
