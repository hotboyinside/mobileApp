import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import { useSession } from '@/components/appProvider/session/SessionContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { CheckboxBlock } from '@/components/ui/CheckBoxBlock';
import { PREMIUM } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { isUserPremium } from '@/helpers/userStatus/isUserPremium';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$additionalFiltersDraft,
	$additionalFiltersErrors,
	resetAdditionalFiltersDraft,
	resetFilterErrors,
	setFilterError,
	toggleFilterEnabled,
	updateFilterRange,
} from '@/stores/allNews/filtersPanel/filters/additionalFilters';
import { AdditionalFilterKey, additionalFiltersLabels } from '@/types/filters';
import { useUnit } from 'effector-react';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { RangeInput } from './RangeInput';

const ERROR_INVALID_INPUT = 'Invalid input. Use numeric values only.';

type AdditionalFiltersProps = {
	onCloseFilters: () => void;
};

export const AdditionalFilters = ({
	onCloseFilters,
}: AdditionalFiltersProps) => {
	const { session } = useSession();
	const isPremiumUser = isUserPremium(session);
	const additionalFiltersDraft = useUnit($additionalFiltersDraft);
	const additionalFiltersErrors = useUnit($additionalFiltersErrors);
	const onSetFilterError = useUnit(setFilterError);

	const onToggleFilter = useUnit(toggleFilterEnabled);
	const onUpdateFilterRange = useUnit(updateFilterRange);
	const onResetAdditionalFiltersDraft = useUnit(resetAdditionalFiltersDraft);
	const onResetFiltersErrors = useUnit(resetFilterErrors);

	const validateRange = (
		key: AdditionalFilterKey,
		from: string,
		to: string
	) => {
		const fromNum = Number(from);
		const toNum = Number(to);

		let error = '';

		if (from && isNaN(fromNum)) {
			error = ERROR_INVALID_INPUT;
		} else if (to && isNaN(toNum)) {
			error = ERROR_INVALID_INPUT;
		}

		onSetFilterError({ key, error });
		onUpdateFilterRange({ key, range: { from, to } });
	};

	const iconBrandPrimary = useThemeColor(appTokens.foreground.brandPrimary);

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedView style={styles.titleContainer}>
					{!isPremiumUser && (
						<BoltDuoIcon width={24} height={24} fill={iconBrandPrimary} />
					)}
					<ThemedText style={styles.title} type='textLg'>
						Additional Filters
					</ThemedText>
				</ThemedView>
				{isPremiumUser && (
					<Button
						title='Clear'
						variant='link-gray'
						buttonStyle={styles.buttonExtra}
						onPress={() => {
							onResetAdditionalFiltersDraft();
							onResetFiltersErrors();
						}}
					/>
				)}
			</ThemedView>
			<ThemedView style={styles.list}>
				{additionalFiltersDraft &&
					Object.entries(additionalFiltersDraft).map(([key, filter]) => (
						<CheckboxBlock
							key={key}
							checked={filter.enabled}
							title={additionalFiltersLabels[key as AdditionalFilterKey]}
							bottomComponent={
								<RangeInput
									from={filter.range.from}
									to={filter.range.to}
									onChange={(from, to) =>
										validateRange(key as AdditionalFilterKey, from, to)
									}
									error={
										additionalFiltersErrors[key as AdditionalFilterKey]
											? additionalFiltersErrors[key as AdditionalFilterKey]
											: null
									}
								/>
							}
							onPress={() => {
								if (isPremiumUser) {
									onToggleFilter(key as AdditionalFilterKey);
								} else {
									onCloseFilters();
									router.push(PREMIUM);
									return;
								}
							}}
						/>
					))}
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},

	title: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	buttonExtra: {
		paddingRight: 0,
	},

	list: {
		marginTop: 8,
		gap: 8,
	},
});
