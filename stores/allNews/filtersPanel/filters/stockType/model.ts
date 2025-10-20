import { StockTypesLabels, StockTypesNames } from '@/types/stockTypes';
import { createEvent, createStore, sample } from 'effector';
import { discardFiltersDraft, filtersApplyClick } from '../model';
import { getStockTypesSnapshotFx, saveStockTypesFx } from './handlers';

export const getStockTypeLabel = (value: StockTypesNames): string =>
	StockTypesLabels[value];

export const $stockType = createStore<StockTypesNames[]>([]);
export const $stockTypeDraft = createStore<StockTypesNames[]>([]);

export const toggleStockTypeDraft = createEvent<StockTypesNames>();
export const removeStockTypeFromDraft = createEvent<StockTypesNames>();
export const resetStockTypeDraft = createEvent();

$stockTypeDraft.on(toggleStockTypeDraft, (state, payload) => {
	if (state.includes(payload)) {
		return state.filter(val => val !== payload);
	}
	return [...state, payload];
});
$stockTypeDraft.on(removeStockTypeFromDraft, (state, payload) =>
	state.filter(value => value !== payload)
);
$stockTypeDraft.on(resetStockTypeDraft, _ => []);

// sample({
// 	clock: pageMounted,
// 	target: getStockTypesSnapshotFx,
// });

sample({
	clock: getStockTypesSnapshotFx.doneData,
	target: [$stockType, $stockTypeDraft],
});

sample({
	clock: filtersApplyClick,
	source: $stockTypeDraft,
	target: [$stockType, saveStockTypesFx],
});

sample({
	clock: discardFiltersDraft,
	source: $stockType,
	target: $stockTypeDraft,
});
