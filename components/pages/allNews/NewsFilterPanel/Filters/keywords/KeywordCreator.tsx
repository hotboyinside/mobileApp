import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StyleSheet } from 'react-native';
import CheckLineIcon from '@/assets/icons/check-line-icon.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import CircleIcon from '@/assets/icons/circle-icon.svg';
import SmileIcon from '@/assets/icons/smile-icon.svg';
import VoiceOverOff from '@/assets/icons/voiceover-off-icon.svg';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import { Filters } from '../Filters';

export const KeywordCreator = () => {
	const { openBottomSheet, closeBottomSheet } = useGlobalSheet();

	const disabledColor = useThemeColor({}, appTokens.foreground.disabled);
	const borderColor = useThemeColor({}, appTokens.border.tertiary);
	const utilityGray = useThemeColor({}, appTokens.utilityGray[400]);

	const openNewBottomSheet = () => {
		openBottomSheet(<Filters onCloseFilters={() => {}} />);
	};

	return (
		<ThemedView style={[styles.container, { borderColor: borderColor }]}>
			<ThemedView style={styles.topButtons}>
				<Input
					placeholder='Add keyword'
					containerStyle={styles.inputContainer}
				/>
				<Button
					variant='secondary'
					size='lg'
					onlyIcon
					icon={<CheckLineIcon width={20} height={20} fill={disabledColor} />}
				/>
			</ThemedView>
			<ThemedView style={styles.bottomButtons}>
				<Button
					icon={<CircleIcon width={20} height={20} fill={utilityGray} />}
					title='Color'
					variant='link-gray'
					iconPosition='left'
					onPress={openNewBottomSheet}
				/>
				<Button
					icon={<SmileIcon width={20} height={20} fill={utilityGray} />}
					title='Icon'
					variant='link-gray'
					iconPosition='left'
				/>
				<Button
					icon={<VoiceOverOff width={20} height={20} fill={utilityGray} />}
					title='Voiceover off'
					variant='link-gray'
					iconPosition='left'
				/>
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 12,
	},

	inputContainer: {
		flex: 1,
	},

	topButtons: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
	},

	bottomButtons: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
	},
});
