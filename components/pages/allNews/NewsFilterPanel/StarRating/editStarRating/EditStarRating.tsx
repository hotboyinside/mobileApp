import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Stars } from '@/components/ui/Stars';
import { Switch } from '@/components/ui/Switch/Switch';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { useUnit } from 'effector-react';
import { $draftStarRatingKeywords } from '@/stores/starRating/model';
import { StarNumber } from '@/types/starRating';
import { Badge } from '@/components/ui/Badge/Badge';
import { HeaderBottomSheet } from '../../HeaderBottomSheet';

type EditStarRatingProps = {
	onClose: () => void;
};

const STARS = [4, 3, 2, 1, 0];

export const EditStarRating = ({ onClose }: EditStarRatingProps) => {
	const draftStarRatingKeywords = useUnit($draftStarRatingKeywords);

	const borderColor = useThemeColor({}, appTokens.border.tertiary);
	const bgColor = useThemeColor({}, appTokens.background.secondarySubtle);

	return (
		<BottomSheetScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet headerLabel='Edit Rating' onCloseFilters={onClose} />
			<ThemedView style={styles.container}>
				{STARS.map(star => (
					<ThemedView
						key={star}
						style={[
							styles.block,
							{ borderColor: borderColor, backgroundColor: bgColor },
						]}
					>
						<ThemedView style={[styles.header, { backgroundColor: bgColor }]}>
							<Stars rating={star} />
							<Switch />
						</ThemedView>
						{draftStarRatingKeywords[star as StarNumber] && (
							<ThemedView
								style={[styles.starKeywords, { backgroundColor: bgColor }]}
							>
								{draftStarRatingKeywords[star as StarNumber]?.map(
									ratingWord => (
										<Badge
											variant='pillColor'
											key={ratingWord}
											value={ratingWord}
										/>
									)
								)}
							</ThemedView>
						)}
					</ThemedView>
				))}
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 24,
		padding: 16,
	},

	block: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 12,
		gap: 12,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	starKeywords: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 4,
	},
});
