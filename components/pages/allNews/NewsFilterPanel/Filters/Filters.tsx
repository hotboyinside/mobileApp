import { BottomSheet } from '@rneui/base';
import { Button } from '@/components/ui/Button';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { AdditionalFilters } from './AdditionalFilters/AdditionalFilters';
import { ThemedView } from '@/components/ThemedView';
import { filtersApplyClick } from '@/stores/allNews/filters/model';
import { useUnit } from 'effector-react';
import { HeaderFilters } from './HeaderFilters';

type FiltersProps = {
	isVisible: boolean;
	onCloseFilters: () => void;
};

export const Filters = ({ isVisible, onCloseFilters }: FiltersProps) => {
	const applyFiltersFn = useUnit(filtersApplyClick);

	return (
		<BottomSheet
			modalProps={{
				animationType: 'fade',
				presentationStyle: 'overFullScreen',
				transparent: true,
			}}
			isVisible={isVisible}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				style={styles.wrapper}
				keyboardVerticalOffset={16}
			>
				<ThemedView style={styles.container}>
					<HeaderFilters onCloseFilters={onCloseFilters} />
					<AdditionalFilters />
					<Button
						variant='primary'
						size='lg'
						title='Apply'
						onPress={() => {
							applyFiltersFn();
							onCloseFilters();
						}}
					/>
				</ThemedView>
			</KeyboardAvoidingView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},

	container: {
		padding: 16,
	},
});
