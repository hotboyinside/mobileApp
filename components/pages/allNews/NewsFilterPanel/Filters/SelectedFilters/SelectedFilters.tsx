import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { StyleSheet } from 'react-native';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';

import { useUnit } from 'effector-react';

import { AdditionalFilterKey } from '@/types/filters';
import { toggleFilterEnabled } from '@/stores/allNews/filtersPanel/filters/additionalFilters/model';
import {
	removeMarketFromDraft,
	MarketNames,
} from '@/stores/allNews/filtersPanel/filters/market/model';
import {
	removeNewsTypeFromDraft,
	NewsTypesNames,
} from '@/stores/allNews/filtersPanel/filters/newsType/model';
import { $selectableFilters } from '@/stores/allNews/filtersPanel/filters/selectableFIlters/model';
import {
	removeStockTypeFromDraft,
	StockTypesNames,
} from '@/stores/allNews/filtersPanel/filters/stockType/model';

export const SelectedFilters = () => {
	const selectableFilters = useUnit($selectableFilters);
	const handleRemoveFilter = (type: string, value: string) => {
		switch (type) {
			case 'market':
				removeMarketFromDraft(value as MarketNames);
				break;
			case 'stockType':
				removeStockTypeFromDraft(value as StockTypesNames);
				break;
			case 'newsType':
				removeNewsTypeFromDraft(value as NewsTypesNames);
				break;
			case 'additionalFilter':
				toggleFilterEnabled(value as AdditionalFilterKey);
		}
	};

	const iconColor = useThemeColor({}, appTokens.foreground.quinary);

	return (
		<ThemedView style={styles.container}>
			{selectableFilters.map(item => (
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
