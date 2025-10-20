import { createEffect } from 'effector';
import { getFiltersSnapshotFx } from './filtersPanel/filters/additionalFilters';
import { getMarketsSnapshotFx } from './filtersPanel/filters/market';
import { getNewsTypesSnapshotFx } from './filtersPanel/filters/newsType';
import { getStockTypesSnapshotFx } from './filtersPanel/filters/stockType';

export const initializeFiltersFx = createEffect(async () => {
	const [additionalFilters, markets, newsTypes, stockTypes] = await Promise.all(
		[
			getFiltersSnapshotFx(),
			getMarketsSnapshotFx(),
			getNewsTypesSnapshotFx(),
			getStockTypesSnapshotFx(),
		]
	);

	return {
		additionalFilters,
		markets,
		newsTypes,
		stockTypes,
	};
});
