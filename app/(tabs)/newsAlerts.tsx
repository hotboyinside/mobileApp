import { Image, StyleSheet } from 'react-native';
import Header from '@/components/ui/Header';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import React from 'react';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import FutureDevelopmentImage from '@/assets/images/FutureDevelopment.png';
import Social from '@/components/ui/Social';

export default function NewsAlertsScreen() {
	const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<ThemedViewWithSafeArea
			style={[styles.container, { backgroundColor: backgroundColor }]}
			safeEdges={['right', 'left']}
		>
			<Header title='News Alerts' />
			<ThemedView style={styles.content}>
				<Image source={FutureDevelopmentImage} style={styles.image} />
				<ThemedText type='textXl' style={styles.title}>
					Coming Soon
				</ThemedText>
				<ThemedText type='textMd' style={styles.description}>
					We’re building this feature. Follow us on socials for updates!
				</ThemedText>
				<Social />
			</ThemedView>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	image: {
		width: 60,
		height: 60,
		marginBottom: 16,
	},

	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},

	title: {
		textAlign: 'center',
		marginBottom: 4,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	description: {
		textAlign: 'center',
		marginBottom: 16,
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},
});
