import { combine, sample } from 'effector';
import {
	$stockType,
	$stockTypeDraft,
	getStockTypeLabel,
} from '../stockType/model';
import { $newsType, $newsTypeDraft, getNewsTypeLabel } from '../newsType/model';
import { $market, $marketDraft, getMarketLabel } from '../market/model';
import {
	$additionalFilters,
	$additionalFiltersDraft,
} from '../additionalFilters/model';
import { additionalFiltersLabels, AdditionalFilterKey } from '@/types/filters';
import {
	addSelectedTabFilters,
	FilterTabVariant,
	removeSelectedTabFilters,
} from '../../model';

export const $hasChangesInFilters = combine(
	$marketDraft,
	$market,
	$stockTypeDraft,
	$stockType,
	$newsTypeDraft,
	$newsType,
	$additionalFiltersDraft,
	$additionalFilters,
	(
		marketDraft,
		market,
		stockTypeDraft,
		stockType,
		newsTypeDraft,
		newsType,
		additionalDraft,
		additional
	) => {
		const marketChanged =
			JSON.stringify([...market].sort()) !==
			JSON.stringify([...marketDraft].sort());
		const stockTypeChanged =
			JSON.stringify([...stockType].sort()) !==
			JSON.stringify([...stockTypeDraft].sort());
		const newsTypeChanged =
			JSON.stringify([...newsType].sort()) !==
			JSON.stringify([...newsTypeDraft].sort());

		const additionalChanged =
			JSON.stringify(additionalDraft) !== JSON.stringify(additional);

		return (
			marketChanged || stockTypeChanged || newsTypeChanged || additionalChanged
		);
	}
);

export const $selectableFilters = combine(
	$marketDraft,
	$stockTypeDraft,
	$newsTypeDraft,
	$additionalFiltersDraft,
	(marketDraft, stockTypeDraft, newsTypeDraft, additionalFiltersDraft) => [
		...marketDraft.map(m => ({
			type: 'market' as const,
			value: m,
			label: getMarketLabel(m),
		})),
		...stockTypeDraft.map(s => ({
			type: 'stockType' as const,
			value: s,
			label: getStockTypeLabel(s),
		})),
		...newsTypeDraft.map(n => ({
			type: 'newsType' as const,
			value: n,
			label: getNewsTypeLabel(n),
		})),
		...Object.keys(additionalFiltersDraft ?? {})
			.filter(a => additionalFiltersDraft![a as AdditionalFilterKey].enabled)
			.map(a => ({
				type: 'additionalFilter' as const,
				value: a,
				label: additionalFiltersLabels[a as AdditionalFilterKey],
			})),
	]
);

export const $activeFiltersCount = $selectableFilters.map(
	filters => filters.length
);

sample({
	source: $activeFiltersCount,
	filter: count => count > 0,
	fn: () => FilterTabVariant.filters,
	target: addSelectedTabFilters,
});

sample({
	source: $activeFiltersCount,
	filter: count => count === 0,
	fn: () => FilterTabVariant.filters,
	target: removeSelectedTabFilters,
});
