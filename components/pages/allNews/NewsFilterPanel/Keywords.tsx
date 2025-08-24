import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from './HeaderBottomSheet';
import { KeywordCreator } from './KeywordCreator';
import { ThemedView } from '@/components/ThemedView';

type KeywordsProps = {
	onClose: () => void;
};

export const Keywords = ({ onClose }: KeywordsProps) => {
	return (
		<BottomSheetScrollView
			style={styles.wrapper}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet
				headerLabel='Keywords'
				onResetDefaultValues={() => {}}
				onCloseFilters={() => {
					onClose();
				}}
			/>
			<ThemedView style={styles.container}>
				<KeywordCreator />
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginBottom: 80,
	},

	container: {
		padding: 16,
	},
});
