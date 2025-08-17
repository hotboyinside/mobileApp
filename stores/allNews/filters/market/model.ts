import { createEvent, createStore, sample } from 'effector';
import { filtersApplyClick } from '../../model';

export enum MarketNames {
	NASDAQ = 'NASDAQ',
	NYSE = 'NYSE',
	OTC = 'OTC',
}

export const getMarketLabel = (value: MarketNames): string =>
	MarketNames[value];

const defaultMarket = Object.values(MarketNames);

export const $market = createStore<MarketNames[]>(defaultMarket);
export const $marketDraft = createStore<MarketNames[]>(defaultMarket);

export const changeMarketDraft = createEvent<MarketNames[]>();
export const removeMarketFromDraft = createEvent<MarketNames>();
export const resetMarketDraft = createEvent();

$marketDraft.on(changeMarketDraft, (_, payload) => payload);

$marketDraft.on(removeMarketFromDraft, (state, payload) =>
	state.filter(value => value !== payload)
);

sample({
	clock: filtersApplyClick,
	source: $marketDraft,
	target: $market,
});

sample({
	clock: resetMarketDraft,
	source: $market,
	target: $marketDraft,
});
