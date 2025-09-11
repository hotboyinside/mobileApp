import { ThemedView } from '@/components/ThemedView';
import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { interpolate, interpolateColor } from 'react-native-reanimated';

export const Switch = () => {
	const translateAnimation = useRef(new Animated.Value(0)).current;
	const colorChange = useRef(new Animated.Value(0)).current;
	const [isActive, setIsActive] = useState(false);

	const translateIn = () => {
		Animated.parallel([
			Animated.timing(translateAnimation, {
				toValue: 20,
				duration: 240,
				useNativeDriver: true,
			}),
		]).start();
	};

	const translateOut = () => {
		Animated.timing(translateAnimation, {
			toValue: 0,
			duration: 240,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Pressable
			onPress={() => {
				setIsActive(prev => !prev);
				if (isActive) {
					translateOut();
				} else {
					translateIn();
				}
			}}
			style={styles.root}
		>
			<Animated.View
				style={[
					styles.circle,
					{ transform: [{ translateX: translateAnimation }] },
				]}
			></Animated.View>
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
		backgroundColor: 'orange',
	},

	circle: {
		borderRadius: 16,
		width: 20,
		height: 20,
		backgroundColor: 'white',
	},
});
