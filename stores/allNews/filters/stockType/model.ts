import { createEvent, createStore, sample } from 'effector';
import { filtersApplyClick } from '../../model';

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

const defaultStockType = [
	StockTypesNames.RegularSecurities,
	StockTypesNames.PreferredSecurities,
];

export const $stockType = createStore<StockTypesNames[]>(defaultStockType);
export const $stockTypeDraft = createStore<StockTypesNames[]>(defaultStockType);

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
