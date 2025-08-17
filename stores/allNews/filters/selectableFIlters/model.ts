import { combine } from 'effector';
import { $stockTypeDraft, getStockTypeLabel } from '../stockType/model';
import { $newsTypeDraft, getNewsTypeLabel } from '../newsType/model';
import { $marketDraft, getMarketLabel } from '../market/model';
import { $additionalFiltersDraft } from '../additionalFilters/model';
import { additionalFiltersLabels, AdditionalFilterKey } from '@/types/filters';

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
