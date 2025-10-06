import { appColors } from '@/constants/colors';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
	interpolateColor,
} from 'react-native-reanimated';

type SwitchProps = {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
};

export const Switch = ({ value, onChange, disabled }: SwitchProps) => {
	const translateX = useSharedValue<number>(0);
	const progress = useSharedValue<number>(0);

	const handleToggle = () => {
		if (!disabled) {
			onChange(!value);
		}
	};

	const brandColor = appColors.brand[400];
	const tertiaryColor = useThemeColor(appTokens.background.tertiary);

	const animatedCircle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const animatedBackground = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[tertiaryColor, brandColor]
		);
		return { backgroundColor };
	});

	useEffect(() => {
		translateX.value = withSpring(value ? 20 : 0);
		progress.value = withSpring(value ? 1 : 0);
	}, [value, progress, translateX]);

	return (
		<Pressable onPress={handleToggle} disabled={disabled}>
			<Animated.View
				style={[
					styles.root,
					animatedBackground,
					!value && styles.boxShadow,
					disabled && styles.disabled,
				]}
			>
				<Animated.View style={[styles.circle, animatedCircle]} />
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

	disabled: {
		opacity: 0.5,
	},
});
