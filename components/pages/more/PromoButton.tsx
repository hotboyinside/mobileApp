import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import gradientImg from '@/assets/images/Glow.png';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PREMIUM } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const PromoButton = () => {
	const bgOverlayColor = useThemeColor(appTokens.background.overlay);
	const iconFgColor = useThemeColor(appTokens.foreground.white);

	return (
		<TouchableOpacity onPress={() => router.push(PREMIUM)}>
			<ThemedView style={[styles.root, { backgroundColor: bgOverlayColor }]}>
				<ThemedText
					tokenColor={appTokens.text.primaryOnBrand}
					type='textMd'
					style={styles.title}
				>
					Upgrade to Premium
				</ThemedText>
				<ThemedText
					tokenColor={appTokens.text.primaryOnBrand}
					type='textSm'
					style={styles.description}
				>
					30 days free — get full access now!
				</ThemedText>
				<BoltDuoIcon
					width={60}
					height={60}
					fill={iconFgColor}
					style={styles.icon}
				/>
				<Image source={gradientImg} style={styles.gradientCircleLeft} />
				<Image source={gradientImg} style={styles.gradientCircleRight} />
			</ThemedView>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		borderRadius: 16,
		marginBottom: 24,
		padding: 16,
		overflow: 'hidden',
	},

	icon: {
		zIndex: 1,
		position: 'absolute',
		top: 10,
		right: 10,
		transform: [{ rotate: '15deg' }],
	},

	title: {
		zIndex: 1,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	description: {
		zIndex: 1,
		marginTop: 4,
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	gradientCircleLeft: {
		position: 'absolute',
		top: -25,
		left: -75,
		borderRadius: 40,
		width: 150,
		height: 150,
		transform: [{ rotate: '180deg' }],
	},

	gradientCircleRight: {
		position: 'absolute',
		top: -25,
		right: -55,
		borderRadius: 67,
		width: 150,
		height: 150,
	},
});
