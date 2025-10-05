import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import { ThemedView } from '@/components/ThemedView';
import { Stars } from '@/components/ui/Stars';
import { Switch } from '@/components/ui/Switch/Switch';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { useUnit } from 'effector-react';
import {
	$starRatingKeywords,
	openEditStarRating,
} from '@/stores/starRating/model';
import { StarNumber, StarNumberStateKey } from '@/types/starRating';
import { Badge } from '@/components/ui/Badge/Badge';
import EditIcon from '@/assets/icons/edit-icon.svg';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import {
	FilterSubTabVariant,
	closeFilterSubTab,
	openFilterSubTab,
} from '@/stores/allNews/filtersPanel/model';
import { BottomSheetApplyFooter } from '../BottomSheetApplyFooter';
import { EditStarRating } from './editStarRating/EditStarRating';
import { useCallback } from 'react';
import {
	$draftStarRatingEnabledState,
	toggleDraftStarRatingEnabledState,
} from '@/stores/allNews/filtersPanel/starRating/starRatingEnabledState/model';

type StarRatingProps = {
	onClose: () => void;
};

const STARS = [4, 3, 2, 1, 0];

export const StarRating = ({ onClose }: StarRatingProps) => {
	const { openSheetModal, closeSheetModal } = useGlobalSheet();
	const draftStarRatingEnabledState = useUnit($draftStarRatingEnabledState);
	const starRatingKeywords = useUnit($starRatingKeywords);

	const onOpenFilterSubTab = useUnit(openFilterSubTab);
	const onCloseFilterSubTab = useUnit(closeFilterSubTab);
	const onToggleDraftStarRatingEnabledState = useUnit(
		toggleDraftStarRatingEnabledState
	);

	const openEditRatingSheet = useCallback(() => {
		onClose();
		onOpenFilterSubTab(FilterSubTabVariant.editRating);
		openEditStarRating();
		openSheetModal(
			'secondary',
			<EditStarRating
				onClose={() => {
					onCloseFilterSubTab();
					closeSheetModal('secondary');
				}}
			/>,
			props => (
				<BottomSheetApplyFooter
					{...props}
					applyButtonTitle='Save'
					onClose={() => {
						onCloseFilterSubTab();
						closeSheetModal('secondary');
					}}
				/>
			)
		);
	}, []);

	const borderColor = useThemeColor(appTokens.border.tertiary);
	const bgColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<BottomSheetScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet
				headerLabel='Rating'
				leftIcon={EditIcon}
				onResetDefaultValues={openEditRatingSheet}
				onCloseFilters={() => onClose()}
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
							<Switch
								value={draftStarRatingEnabledState[star as StarNumberStateKey]}
								onChange={() =>
									onToggleDraftStarRatingEnabledState(
										star as StarNumberStateKey
									)
								}
							/>
						</ThemedView>
						{starRatingKeywords[star as StarNumber] && (
							<ThemedView
								style={[styles.starKeywords, { backgroundColor: bgColor }]}
							>
								{starRatingKeywords[star as StarNumber]?.map(ratingWord => (
									<Badge
										size='sm'
										variant='pillColor'
										color='gray'
										key={ratingWord}
										value={ratingWord}
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
