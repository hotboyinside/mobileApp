import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { useSession } from '@/components/appProvider/session/SessionContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stars } from '@/components/ui/Stars';
import { MAX_MODIFICATION_IN_STAR_RATING } from '@/constants/limits';
import { appTokens } from '@/constants/tokens';
import { isUserPremium } from '@/helpers/userStatus/isUserPremium';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$inputErrors,
	$sessionModifiedKeywords,
	$userInputKeywords,
	addSessionKeyword,
	changeUserInputKeyword,
	clearInputError,
	removeSessionKeyword,
	removeSessionKeywordsByStar,
} from '@/stores/allNews/filtersPanel/starRating/model';
import {
	$draftStarRatingKeywords,
	$modificationCountDraft,
	addDraftStarRatingKeyword,
	clearDraftStarRatingKeywordsByStar,
	decrementModificationCountDraft,
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
	const { session } = useSession();
	const isPremiumUser = isUserPremium(session);

	const userInputKeywords = useUnit($userInputKeywords);
	const draftStarRatingKeywords = useUnit($draftStarRatingKeywords);
	const sessionModifiedKeywords = useUnit($sessionModifiedKeywords);
	const modificationCountDraft = useUnit($modificationCountDraft);
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

	const iconForegroundColor = useThemeColor(appTokens.foreground.brandPrimary);
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
			{!isPremiumUser &&
				modificationCountDraft < MAX_MODIFICATION_IN_STAR_RATING && (
					<ThemedView
						style={[styles.modificationLimit, { borderColor: borderColor }]}
					>
						<BoltDuoIcon width={24} height={24} fill={iconForegroundColor} />
						<ThemedText type='textSm' style={styles.modificationLimitText}>
							{`${modificationCountDraft}/${MAX_MODIFICATION_IN_STAR_RATING} Customizations used`}
						</ThemedText>
					</ThemedView>
				)}

			{!isPremiumUser &&
				modificationCountDraft >= MAX_MODIFICATION_IN_STAR_RATING && (
					<ThemedView
						style={[
							styles.modificationLimitArchived,
							{ borderColor: borderColor },
						]}
					>
						<BoltDuoIcon width={24} height={24} fill={iconForegroundColor} />
						<ThemedView style={styles.textContainer}>
							<ThemedText type='textSm' style={styles.modificationLimitText}>
								Limit reached
							</ThemedText>
							<ThemedText
								type='textSm'
								tokenColor={appTokens.text.quaternary}
								style={styles.modificationLimitArchivedText}
							>
								Reset or upgrade for unlimited customizations
							</ThemedText>
						</ThemedView>
					</ThemedView>
				)}

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
								onPress={() => {
									if (!isPremiumUser) {
										const sessionLengthByStar =
											sessionModifiedKeywords[star].length;

										if (sessionLengthByStar > 0) {
											decrementModificationCountDraft(sessionLengthByStar);
											removeSessionKeywordsByStar(star);
										}
									}

									onClearDraftStarRatingKeywordsByStar(star);
								}}
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
								if (!isPremiumUser && modificationCountDraft < 5) {
									const trimmedWord = userInputKeywords[star]
										.trim()
										.toLowerCase();

									if (trimmedWord === '') return;

									const isDuplicate = Object.values(
										draftStarRatingKeywords
									).some(keywords =>
										keywords.some(
											(k: string) => k.toLowerCase() === trimmedWord
										)
									);

									if (!isDuplicate) {
										addSessionKeyword({ star, word: trimmedWord });
									}

									onAddDraftStarRatingKeyword({
										changeableStar: star,
										word: userInputKeywords[star],
									});
								}

								if (isPremiumUser) {
									onAddDraftStarRatingKeyword({
										changeableStar: star,
										word: userInputKeywords[star],
									});
								}
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
													if (!isPremiumUser) {
														const currentWord = ratingWord.toLowerCase();
														if (
															sessionModifiedKeywords[star].includes(
																currentWord
															)
														) {
															decrementModificationCountDraft(1);
															removeSessionKeyword({
																star,
																word: currentWord,
															});
														}
													}

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
	modificationLimit: {
		borderWidth: 2,
		borderRadius: 16,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginHorizontal: 16,
		padding: 16,
		marginBottom: 8,
		marginTop: 16,
	},

	modificationLimitArchived: {
		borderWidth: 2,
		borderRadius: 16,
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 8,
		marginHorizontal: 16,
		padding: 16,
		marginBottom: 8,
		marginTop: 16,
	},

	textContainer: {
		maxWidth: 280,
	},

	modificationLimitText: {
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	modificationLimitArchivedText: {
		marginTop: 4,
	},

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
