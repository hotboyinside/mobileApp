import { ExternalLinks } from '@/constants/links';
import React from 'react';
import { TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import DiscordIcon from '@/assets/icons/discord-icon.svg';
import YoutubeIcon from '@/assets/icons/youtube-icon.svg';
import InstagramIcon from '@/assets/icons/instagram-icon.svg';
import XIcon from '@/assets/icons/x-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Social() {
	const borderTertiaryColor = useThemeColor({}, appTokens.border.tertiary);
	const iconQuaternaryColor = useThemeColor(
		{},
		appTokens.foreground.quaternary
	);

	return (
		<ThemedView style={styles.social}>
			<TouchableOpacity
				onPress={() => Linking.openURL(ExternalLinks.discordUrl)}
				style={[styles.socialIcon, { borderColor: borderTertiaryColor }]}
			>
				<DiscordIcon width={20} height={20} fill={iconQuaternaryColor} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => Linking.openURL(ExternalLinks.youtubeUrl)}
				style={[styles.socialIcon, { borderColor: borderTertiaryColor }]}
			>
				<YoutubeIcon width={20} height={20} fill={iconQuaternaryColor} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => Linking.openURL(ExternalLinks.instagramUrl)}
				style={[styles.socialIcon, { borderColor: borderTertiaryColor }]}
			>
				<InstagramIcon width={20} height={20} fill={iconQuaternaryColor} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => Linking.openURL(ExternalLinks.xUrl)}
				style={[styles.socialIcon, { borderColor: borderTertiaryColor }]}
			>
				<XIcon width={20} height={20} fill={iconQuaternaryColor} />
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	social: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 8,
	},

	socialIcon: {
		borderWidth: 2,
		borderRadius: 16,
		padding: 14,
	},
});
