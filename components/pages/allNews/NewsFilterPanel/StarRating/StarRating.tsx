import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import { ThemedView } from '@/components/ThemedView';
import { Stars } from '@/components/ui/Stars';
import { Switch } from '@/components/ui/Switch/Switch';

type StarRatingProps = {
	onClose: () => void;
};

const STARS = [4, 3, 2, 1, 0];

export const StarRating = ({ onClose }: StarRatingProps) => {
	return (
		<BottomSheetScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet
				headerLabel='Rating'
				onCloseFilters={() => {
					onClose();
				}}
			/>
			<ThemedView style={styles.container}>
				{STARS.map(star => (
					<ThemedView key={star}>
						<ThemedView style={styles.header}>
							<Stars rating={star} />
							<Switch />
						</ThemedView>
					</ThemedView>
				))}
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	container: {
		flex: 1,
		gap: 24,
		padding: 16,
		paddingBottom: 240,
	},
});
