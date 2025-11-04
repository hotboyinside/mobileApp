import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$keywords,
	$withVoiceOverKeywords,
} from '@/stores/allNews/filtersPanel/keywords';
import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const LimitsOfKeywords = () => {
	const keywords = useUnit($keywords);
	const withVoiceOverKeywords = useUnit($withVoiceOverKeywords);

	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const foregroundPrimaryColor = useThemeColor(
		appTokens.foreground.brandPrimary
	);

	return (
		<ThemedView style={styles.container}>
			{keywords.length >= 5 && (
				<ThemedView style={[styles.card, { borderColor: borderTertiaryColor }]}>
					<BoltDuoIcon width={24} height={24} fill={foregroundPrimaryColor} />
					<ThemedView>
						<ThemedText type='textSm' style={styles.title}>
							Free Keywords limit reached
						</ThemedText>
						<ThemedText
							tokenColor={appTokens.text.quaternary}
							type='textSm'
							style={styles.description}
						>
							Get Premium for unlimited access
						</ThemedText>
					</ThemedView>
				</ThemedView>
			)}

			{withVoiceOverKeywords.length >= 3 && (
				<ThemedView>
					<ThemedView
						style={[styles.card, { borderColor: borderTertiaryColor }]}
					>
						<BoltDuoIcon width={24} height={24} fill={foregroundPrimaryColor} />
						<ThemedView>
							<ThemedText type='textSm' style={styles.title}>
								Free Voiceover limit reached
							</ThemedText>
							<ThemedText
								tokenColor={appTokens.text.quaternary}
								type='textSm'
								style={styles.description}
							>
								Get Premium for unlimited access
							</ThemedText>
						</ThemedView>
					</ThemedView>
				</ThemedView>
			)}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},

	card: {
		borderRadius: 16,
		borderWidth: 2,
		flexDirection: 'row',
		gap: 8,
		padding: 16,
	},

	title: {
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	description: {
		marginTop: 4,
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},
});
