import { createEvent, createStore, sample } from 'effector';
import { discardFiltersDraft, filtersApplyClick } from '../model';
import { getMarketsSnapshotFx, saveMarketsFx } from './handlers';
import { MarketNames } from '@/types/market';

export const getMarketLabel = (value: MarketNames): string =>
	MarketNames[value];

export const $market = createStore<MarketNames[]>([]);
export const $marketDraft = createStore<MarketNames[]>([]);

export const toggleMarketDraft = createEvent<MarketNames>();
export const removeMarketFromDraft = createEvent<MarketNames>();
export const resetMarketDraft = createEvent();

$marketDraft.on(toggleMarketDraft, (state, payload) => {
	if (state.includes(payload)) {
		return state.filter(val => val !== payload);
	}
	return [...state, payload];
});

$marketDraft.on(removeMarketFromDraft, (state, payload) =>
	state.filter(value => value !== payload)
);

$marketDraft.on(resetMarketDraft, _ => []);

sample({
	clock: getMarketsSnapshotFx.doneData,
	target: [$market, $marketDraft],
});

sample({
	clock: filtersApplyClick,
	source: $marketDraft,
	target: [$market, saveMarketsFx],
});

sample({
	clock: discardFiltersDraft,
	source: $market,
	target: $marketDraft,
});
