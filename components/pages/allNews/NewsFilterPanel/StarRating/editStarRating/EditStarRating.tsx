import CloseIcon from '@/assets/icons/close-icon.svg';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stars } from '@/components/ui/Stars';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$inputErrors,
	$userInputKeywords,
	changeUserInputKeyword,
	clearInputError,
} from '@/stores/allNews/filtersPanel/starRating/model';
import {
	$draftStarRatingKeywords,
	addDraftStarRatingKeyword,
	clearDraftStarRatingKeywordsByStar,
	deleteDraftStarRatingKeyword,
	resetToDefaultStarRatingKeywords,
} from '@/stores/starRating/model';
import { StarNumber } from '@/types/starRating';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../../HeaderBottomSheet';

type EditStarRatingProps = {
	onClose: () => void;
};

const STARS: StarNumber[] = [4, 3, 2, 1];

export const EditStarRating = ({ onClose }: EditStarRatingProps) => {
	const userInputKeywords = useUnit($userInputKeywords);
	const draftStarRatingKeywords = useUnit($draftStarRatingKeywords);
	const inputErrors = useUnit($inputErrors);

	const onDeleteDraftStarRatingKeyword = useUnit(deleteDraftStarRatingKeyword);
	const onChangeUserInputKeyword = useUnit(changeUserInputKeyword);
	const onAddDraftStarRatingKeyword = useUnit(addDraftStarRatingKeyword);
	const onResetToDefaultStarRatingKeywords = useUnit(
		resetToDefaultStarRatingKeywords
	);
	const onClearDraftStarRatingKeywordsByStar = useUnit(
		clearDraftStarRatingKeywordsByStar
	);
	const onClearInputError = useUnit(clearInputError);

	const borderColor = useThemeColor(appTokens.border.tertiary);
	const bgColor = useThemeColor(appTokens.background.secondarySubtle);
	const iconColor = useThemeColor(appTokens.foreground.quinary);

	return (
		<BottomSheetScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet
				headerLabel='Edit Rating'
				onCloseFilters={onClose}
				onResetDefaultValues={onResetToDefaultStarRatingKeywords}
			/>
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
							<Button
								title='Clear'
								variant='link-gray'
								onPress={() => onClearDraftStarRatingKeywordsByStar(star)}
							/>
						</ThemedView>
						<Input
							placeholder='Add keyword'
							containerStyle={styles.inputContainer}
							value={userInputKeywords[star]}
							onChangeText={text => {
								onClearInputError(star);
								onChangeUserInputKeyword({ star, text });
							}}
							onBlur={() => {
								onAddDraftStarRatingKeyword({
									changeableStar: star,
									word: userInputKeywords[star],
								});
							}}
							isError={!!inputErrors[star]}
							errorMessage={inputErrors[star] ?? ''}
							maxLength={25}
						/>
						{draftStarRatingKeywords[star] && (
							<ThemedView
								style={[styles.starKeywords, { backgroundColor: bgColor }]}
							>
								{draftStarRatingKeywords[star]?.map(ratingWord => (
									<Badge
										key={ratingWord}
										value={ratingWord}
										size='xl'
										variant='pillColor'
										color='gray'
										icon={
											<CloseIcon
												width={16}
												height={16}
												fill={iconColor}
												onPress={() => {
													onDeleteDraftStarRatingKeyword({
														changeableStar: star,
														word: ratingWord,
													});
												}}
											/>
										}
									/>
								))}
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

	inputContainer: {
		flex: 1,
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
