import { appColors } from '@/constants/colors';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

export const Button = () => {
	const backgroundColorRef = new Animated.Value(0);
	const backgroundColor = useThemeColor({}, appTokens.background.secondary);

	const handlePress = () => {
		Animated.timing(backgroundColorRef, {
			toValue: 1,
			duration: 60,
			useNativeDriver: true,
		}).start();
	};

	const handleRelease = () => {
		Animated.timing(backgroundColorRef, {
			toValue: 0,
			duration: 60,
			useNativeDriver: true,
		}).start();
	};

	// Интерполяция цвета фона
	// const backgroundColor = backgroundColorRef.interpolate({
	//   inputRange: [0, 1],
	//   outputRange: ["#EAB68F", "#D98E73"],
	// });

	return (
		<Pressable
			accessibilityRole='button'
			accessibilityLabel='Press me'
			onPressIn={handlePress}
			onPressOut={handleRelease}
		>
			<Animated.View style={[styles.buttonContainer, { backgroundColor }]}>
				<ThemedText style={styles.buttonText}>Press me</ThemedText>
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		backgroundColor: appColors.gradient.primarySubtle,
	},

	buttonText: {
		color: appTokens.button.primaryFg,
		fontWeight: 500,
	},
});
