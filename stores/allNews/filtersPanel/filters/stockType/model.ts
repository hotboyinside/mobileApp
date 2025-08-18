import { filtersApplyClick } from '@/stores/allNews/model';
import { createEvent, createStore, sample } from 'effector';

export enum StockTypesNames {
	RegularSecurities = 'CS',
	PreferredSecurities = 'PFD',
}

export const StockTypesLabels: Record<StockTypesNames, string> = {
	[StockTypesNames.RegularSecurities]: 'Regular securities',
	[StockTypesNames.PreferredSecurities]: 'Preferred securities',
};

export const getStockTypeLabel = (value: StockTypesNames): string =>
	StockTypesLabels[value];

export const $stockType = createStore<StockTypesNames[]>([]);
export const $stockTypeDraft = createStore<StockTypesNames[]>([]);

export const changeStockTypeDraft = createEvent<StockTypesNames[]>();
export const removeStockTypeFromDraft = createEvent<StockTypesNames>();
export const resetStockTypeDraft = createEvent();

$stockTypeDraft.on(changeStockTypeDraft, (_, payload) => payload);
$stockTypeDraft.on(removeStockTypeFromDraft, (state, payload) =>
	state.filter(value => value !== payload)
);

sample({
	clock: filtersApplyClick,
	source: $stockTypeDraft,
	target: $stockType,
});

sample({
	clock: resetStockTypeDraft,
	source: $stockType,
	target: $stockTypeDraft,
});
