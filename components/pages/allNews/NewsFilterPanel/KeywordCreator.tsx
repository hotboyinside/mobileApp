import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StyleSheet } from 'react-native';
import CheckLineIcon from '@/assets/icons/check-line-icon.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';

export const KeywordCreator = () => {
	const disabledColor = useThemeColor({}, appTokens.foreground.disabled);
	const borderColor = useThemeColor({}, appTokens.border.tertiary);

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
				<Button variant='link-gray' />
				<Button variant='link-gray' />
				<Button variant='link-gray' />
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
		width: 278,
	},

	topButtons: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
	},

	bottomButtons: {
		flex: 1,
		flexDirection: 'row',
	},
});
