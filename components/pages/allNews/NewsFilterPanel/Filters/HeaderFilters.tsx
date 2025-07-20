import { ThemedText } from '@/components/ThemedText';
import RestartIcon from '@/assets/icons/restart-icon.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { resetDraftFilters } from '@/stores/allNews/filters/model';
import { useUnit } from 'effector-react';

type HeaderFiltersProps = {
	onCloseFilters: () => void;
};

export const HeaderFilters = ({ onCloseFilters }: HeaderFiltersProps) => {
	const resetDraftFiltersFn = useUnit(resetDraftFilters);

	return (
		<View style={styles.header}>
			<Button
				style={styles.button}
				variant='secondary'
				onlyIcon
				icon={<RestartIcon />}
			/>
			<ThemedText type='displayXs' style={styles.title}>
				Filters
			</ThemedText>
			<Button
				style={styles.button}
				variant='secondary'
				onlyIcon
				icon={<CloseIcon />}
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
