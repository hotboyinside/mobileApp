import { appColors } from '@/constants/colors';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
	interpolateColor,
} from 'react-native-reanimated';

export const Switch = () => {
	const [isActive, setIsActive] = useState(false);
	const translateX = useSharedValue<number>(0);
	const progress = useSharedValue<number>(0);

	const brandColor = appColors.brand[400];
	const tertiaryColor = useThemeColor({}, appTokens.background.tertiary);

	const toggle = () => {
		setIsActive(prev => {
			const next = !prev;
			translateX.value = withSpring(next ? 20 : 0);
			progress.value = withSpring(next ? 1 : 0);
			return next;
		});
	};

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateX: withSpring(translateX.value) }],
	}));

	const animatedColor = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[brandColor, tertiaryColor]
		);

		return { backgroundColor };
	});

	return (
		<Pressable onPress={toggle}>
			<Animated.View
				style={[styles.root, animatedColor, !isActive && styles.boxShadow]}
			>
				<Animated.View style={[styles.circle, animatedStyles]}></Animated.View>
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	root: {
		borderRadius: 12,
		justifyContent: 'center',
		width: 44,
		height: 24,
		padding: 2,
	},

	circle: {
		borderRadius: 16,
		width: 20,
		height: 20,
		backgroundColor: 'white',
	},

	boxShadow: {
		shadowColor: '#0A0D121F',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.12,
		shadowRadius: 3,

		// Android
		elevation: 3,
	},
});
