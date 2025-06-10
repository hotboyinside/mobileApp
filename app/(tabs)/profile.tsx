import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<Image
					source={require('@/assets/images/photo_2025-03-17_19-51-57.jpg')}
					style={styles.headerImage}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='title'></ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		height: '100%',
		width: '100%',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
