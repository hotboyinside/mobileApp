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
import { Button } from '@/components/ui/Button';
import { router } from 'expo-router';
import { NOTIFICATIONS } from '@/constants/routes';

interface WithVoiceOverKeywordsProps {
	onCloseKeywords: () => void;
}

export const WithVoiceOverKeywords = ({
	onCloseKeywords,
}: WithVoiceOverKeywordsProps) => {
	const withVoiceOverKeywords = useUnit($withVoiceOverKeywords);
	const isVoiceOverEnabled = useUnit($isVoiceOverEnabled);

	const iconFgColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);
	const descriptionColor = useThemeColor(appTokens.text.quaternary);

	if (withVoiceOverKeywords.length === 0) {
		return null;
	}

	return (
		<ThemedView>
			<ThemedView style={styles.header}>
				<ThemedView>
					<ThemedText type='textLg' style={styles.title}>
						With Alert
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

				<Button
					variant='secondary'
					size='sm'
					onlyIcon
					icon={
						isVoiceOverEnabled ? (
							<VoiceOverOn width={20} height={20} fill={iconFgColor} />
						) : (
							<VoiceOverOff width={20} height={20} fill={iconFgColor} />
						)
					}
					onPress={() => {
						onCloseKeywords();
						router.push(NOTIFICATIONS);
					}}
				/>
			</ThemedView>

			<ThemedView style={styles.keywords}>
				{withVoiceOverKeywords &&
					withVoiceOverKeywords.map(keyword => (
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
