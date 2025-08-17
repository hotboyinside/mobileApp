import { ThemedText } from '@/components/ThemedText';
import RestartIcon from '@/assets/icons/restart-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useUnit } from 'effector-react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { resetDraftFilters } from '@/stores/allNews/filters/additionalFilters/model';

type HeaderFiltersProps = {
	onCloseFilters: () => void;
};

export const HeaderFilters = ({ onCloseFilters }: HeaderFiltersProps) => {
	const resetDraftFiltersFn = useUnit(resetDraftFilters);

	const iconColor = useThemeColor(
		{},
		appTokens.component.buttons.secondaryGray.fg
	);

	return (
		<View style={styles.header}>
			<Button
				onlyIcon
				variant='secondary'
				icon={<RestartIcon fill={iconColor} width={20} height={20} />}
				style={styles.button}
			/>
			<ThemedText type='displayXs' style={styles.title}>
				Filters
			</ThemedText>
			<Button
				style={styles.button}
				variant='secondary'
				onlyIcon
				icon={<CloseIcon width={20} height={20} fill={iconColor} />}
				onPress={() => {
					onCloseFilters();
					resetDraftFiltersFn();
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 17,
		paddingBottom: 16,
	},

	button: {
		alignSelf: 'flex-start',
	},

	title: {
		flex: 1,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
		textAlign: 'center',
	},
});
