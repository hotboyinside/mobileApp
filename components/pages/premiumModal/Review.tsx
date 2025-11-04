import ReviewAvatar from '@/assets/images/ReviewAvatar.png';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const Review = () => {
	const textPrimaryColor = useThemeColor(appTokens.text.primary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);

	const backgroundSecondaryColor = useThemeColor(
		appTokens.background.secondary
	);
	const borderAltColor = useThemeColor(appTokens.border.alt);

	return (
		<>
			<ThemedText
				type='textLg'
				style={[styles.title, { color: textPrimaryColor }]}
			>
				Your edge is one click away
			</ThemedText>
			<ThemedView
				style={[
					styles.review,
					{
						backgroundColor: backgroundSecondaryColor,
						borderColor: borderAltColor,
					},
				]}
			>
				<ThemedView
					style={[
						styles.reviewContainer,
						{ backgroundColor: backgroundSecondaryColor },
					]}
				>
					<Image source={ReviewAvatar} style={styles.reviewAvatar} />
					<ThemedView
						style={[
							styles.reviewContent,
							{ backgroundColor: backgroundSecondaryColor },
						]}
					>
						<ThemedText
							type='textMd'
							style={[styles.reviewText, { color: textPrimaryColor }]}
						>
							“I didn’t realize what I was missing until I upgraded.”
						</ThemedText>
						<ThemedText
							type='textSm'
							style={[styles.reviewAuthor, { color: textQuaternaryColor }]}
						>
							Andrew Isaacson, actual FoxRunner user
						</ThemedText>
					</ThemedView>
				</ThemedView>
			</ThemedView>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		marginBottom: 20,
		paddingHorizontal: 20,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	review: {
		borderWidth: 1,
		borderRadius: 16,
		marginHorizontal: 20,
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginBottom: 24,
	},

	reviewContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 16,
	},

	reviewContent: {
		flex: 1,
	},

	reviewAvatar: {
		width: 40,
		height: 40,
	},

	reviewText: {
		marginBottom: 4,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	reviewAuthor: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},
});
