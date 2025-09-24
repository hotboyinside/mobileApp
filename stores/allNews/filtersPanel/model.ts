import { combine, createEvent, createStore, sample } from 'effector';
import { $sortBy, applySortingClick } from './sortBy/model';
import { filtersApplyClick } from '../model';
import { $market, MarketNames } from './filters/market/model';
import { $stockType, StockTypesNames } from './filters/stockType/model';
import { $newsType, NewsTypesNames } from './filters/newsType/model';
import { $additionalFilters } from './filters/additionalFilters/model';
import { SortByStore, SortLabels } from '@/types/sortBy';
import { NewsTypesOrigins } from '../news/model';
import { FiltersStore } from '@/types/filters';
import { getTimestampOfStartOfTheDay } from '@/helpers/date/getTimestampOfStartOfTheDay';
import { fetchSortedNewsFx } from '../news/handlers';

export enum FilterTabVariant {
	sort = 'Sort',
	filters = 'Filters',
	keywords = 'Keywords',
	rating = 'Rating',
}

export enum FilterSubTabVariant {
	keywordsColor = 'Color',
	keywordsIcon = 'Icon',
	editRating = 'EditRating',
}

export const $selectedTabsFilters = createStore<FilterTabVariant[]>([]);
export const $openedFilterTab = createStore<FilterTabVariant | null>(null);
export const $openedFilterSubTab = createStore<FilterSubTabVariant | null>(
	null
);

export const addSelectedTabFilters = createEvent<FilterTabVariant>();
export const removeSelectedTabFilters = createEvent<FilterTabVariant>();

export const openFilterTab = createEvent<FilterTabVariant>();
export const closeFilterTab = createEvent();

export const openFilterSubTab = createEvent<FilterSubTabVariant>();
export const closeFilterSubTab = createEvent();

$selectedTabsFilters.on(addSelectedTabFilters, (state, payload) => {
	if (!state.includes(payload)) {
		return [...state, payload];
	}
	return state;
});

$selectedTabsFilters.on(removeSelectedTabFilters, (state, payload) => {
	return state.filter(tab => tab !== payload);
});

$openedFilterTab.on(openFilterTab, (_, payload) => payload);
$openedFilterTab.on(closeFilterTab, () => null);

$openedFilterSubTab.on(openFilterSubTab, (_, payload) => payload);
$openedFilterSubTab.on(closeFilterSubTab, () => null);

type FiltersData = {
	sortBy: SortByStore;
	market: MarketNames[];
	stockType: StockTypesNames[];
	newsType: NewsTypesNames[];
	additionalFilters: FiltersStore | null;
};

const filtersStore = combine({
	sortBy: $sortBy,
	market: $market,
	stockType: $stockType,
	newsType: $newsType,
	additionalFilters: $additionalFilters,
});

sample({
	clock: [applySortingClick, filtersApplyClick],
	source: filtersStore,
	filter: (filtersStore: FiltersData) =>
		filtersStore.sortBy.currentLabel !== SortLabels.NewestFirst,
	fn: (filters: FiltersData) => {
		return ({
			typeOrigin: NewsTypesOrigins.News,
			limit: 0,
			start: getTimestampOfStartOfTheDay(),
			signal: new AbortController().signal,
			filters: filters,
		})
	},
	target: fetchSortedNewsFx,
});
