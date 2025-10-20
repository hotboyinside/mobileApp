import CloseIcon from '@/assets/icons/close-icon.svg';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { toggleFilterEnabled } from '@/stores/allNews/filtersPanel/filters/additionalFilters/model';
import { removeMarketFromDraft } from '@/stores/allNews/filtersPanel/filters/market';
import { removeNewsTypeFromDraft } from '@/stores/allNews/filtersPanel/filters/newsType';
import {
	$activeFiltersCount,
	$selectableFilters,
} from '@/stores/allNews/filtersPanel/filters/selectableFilters';
import { removeStockTypeFromDraft } from '@/stores/allNews/filtersPanel/filters/stockType';
import { AdditionalFilterKey } from '@/types/filters';
import { MarketNames } from '@/types/market';
import { NewsTypesNames } from '@/types/newsType';
import { StockTypesNames } from '@/types/stockTypes';
import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const SelectedFilters = () => {
	const selectableFilters = useUnit($selectableFilters);
	const selectedFiltersCount = useUnit($activeFiltersCount);
	const onRemoveMarketFromDraft = useUnit(removeMarketFromDraft);
	const onRemoveStockTypeFromDraft = useUnit(removeStockTypeFromDraft);
	const onRemoveNewsTypeFromDraft = useUnit(removeNewsTypeFromDraft);
	const onToggleFilterEnabled = useUnit(toggleFilterEnabled);

	const handleRemoveFilter = (type: string, value: string) => {
		switch (type) {
			case 'market':
				onRemoveMarketFromDraft(value as MarketNames);
				break;
			case 'stockType':
				onRemoveStockTypeFromDraft(value as StockTypesNames);
				break;
			case 'newsType':
				onRemoveNewsTypeFromDraft(value as NewsTypesNames);
				break;
			case 'additionalFilter':
				onToggleFilterEnabled(value as AdditionalFilterKey);
				break;
		}
	};

	const iconColor = useThemeColor(appTokens.foreground.quinary);

	if (selectedFiltersCount === 0) {
		return null;
	}

	return (
		<ThemedView style={styles.container}>
			{selectableFilters &&
				selectableFilters.map(item => (
					<Badge
						key={item.value}
						value={item.label}
						size='xl'
						variant='pillColor'
						color='gray'
						icon={
							<CloseIcon
								width={16}
								height={16}
								fill={iconColor}
								onPress={() => handleRemoveFilter(item.type, item.value)}
							/>
						}
					/>
				))}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 4,
	},
});
