import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import VoiceOverOff from '@/assets/icons/voiceover-off-icon.svg';
import VoiceOverOn from '@/assets/icons/voiceover-on-icon.svg';
import { StyleSheet } from 'react-native';
import { useUnit } from 'effector-react';
import { $isVoiceOverEnabled } from '@/stores/userSettings/voiceOver/model';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { $withVoiceOverKeywords } from '@/stores/allNews/filtersPanel/keywords/model';
import { Keyword } from './Keyword';

export const WithVoiceOverKeywords = () => {
	const withVoiceOverKeywords = useUnit($withVoiceOverKeywords);
	const isVoiceOverEnabled = useUnit($isVoiceOverEnabled);

	const iconBgColor = useThemeColor(
		{},
		appTokens.component.buttons.secondaryGray.bg
	);
	const iconBorderColor = useThemeColor({}, appTokens.border.tertiary);
	const descriptionColor = useThemeColor({}, appTokens.text.quaternary);

	if (withVoiceOverKeywords.length === 0) {
		return null;
	}

	return (
		<ThemedView>
			<ThemedView style={styles.header}>
				<ThemedView>
					<ThemedText type='textLg' style={styles.title}>
						With Voiceover
					</ThemedText>
					{!isVoiceOverEnabled && (
						<ThemedText
							type='textXs'
							style={[styles.description, { color: descriptionColor }]}
						>
							Voiceover is disabled in Notification Settings
						</ThemedText>
					)}
				</ThemedView>

				<ThemedView
					style={[
						styles.iconContainer,
						{ backgroundColor: iconBgColor, borderColor: iconBorderColor },
					]}
				>
					{isVoiceOverEnabled ? <VoiceOverOn /> : <VoiceOverOff />}
				</ThemedView>
			</ThemedView>

			<ThemedView style={styles.keywords}>
				{withVoiceOverKeywords.map(keyword => (
					<Keyword key={keyword._id} keyword={keyword} />
				))}
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},

	iconContainer: {
		borderWidth: 1,
		borderRadius: 16,
		padding: 6,
	},

	title: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	description: {
		marginTop: 2,
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	keywords: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 4,
		marginTop: 8,
	},
});
