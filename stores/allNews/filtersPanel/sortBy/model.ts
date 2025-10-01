import {
	SortLabels,
	SortByStore,
	sortMapping,
	sortByStoreDefault,
} from '@/types/sortBy';
import { combine, createEvent, createStore, sample } from 'effector';
import {
	FilterTabVariant,
	addSelectedTabFilters,
	removeSelectedTabFilters,
} from '../model';
import { WindowsNames } from '@/constants/socket/clientEvents';
import { getTimestampOfStartOfTheDay } from '@/helpers/date/getTimestampOfStartOfTheDay';
import { FiltersStore } from '@/types/filters';
import { fetchNewsFx, loadMoreNewsFx } from '../../news/handlers';
import {
	$allNews,
	$allNewsPagination,
	$lastAllNewsNewsDate,
	addNewsFromSseEvent,
	getNews,
	INews,
	NewsTypesOrigins,
} from '../../news/model';
import { $additionalFilters } from '../filters/additionalFilters/model';
import { MarketNames, $market } from '../filters/market/model';
import { NewsTypesNames, $newsType } from '../filters/newsType/model';
import { StockTypesNames, $stockType } from '../filters/stockType/model';
import { filtersApplyClick } from '../../model';

export const $sortBy = createStore<SortByStore>(sortByStoreDefault);
export const $sortByDraft = createStore<SortLabels>(SortLabels.NewestFirst);
export const $isSortDefault = $sortBy.map(
	sortValue => sortValue.currentLabel === sortByStoreDefault.currentLabel
);
export const $isSortByChanged = combine(
	$sortBy,
	$sortByDraft,
	(sortBy, sortByDraft) => sortBy.currentLabel !== sortByDraft
);

export const updateSortingDraft = createEvent<SortLabels>();
export const resetSortingDraft = createEvent();

export const applySortingClick = createEvent();
export const closeSortByClick = createEvent();

$sortByDraft.on(updateSortingDraft, (_, payload) => {
	return payload;
});

$sortByDraft.on(resetSortingDraft, () => SortLabels.NewestFirst);

sample({
	clock: applySortingClick,
	source: $sortByDraft,
	fn(sortingLabel, _) {
		return sortMapping[sortingLabel] ?? sortByStoreDefault;
	},
	target: $sortBy,
});

sample({
	clock: closeSortByClick,
	source: $sortBy,
	fn(sortingValue, _) {
		return sortingValue.currentLabel;
	},
	target: $sortByDraft,
});

sample({
	source: $sortBy,
	filter: sortBy => sortBy.currentLabel !== SortLabels.NewestFirst,
	fn: () => FilterTabVariant.sort,
	target: addSelectedTabFilters,
});

sample({
	source: $sortBy,
	filter: sortBy => sortBy.currentLabel === SortLabels.NewestFirst,
	fn: () => FilterTabVariant.sort,
	target: removeSelectedTabFilters,
});

export type FiltersData = {
	sortBy?: SortByStore;
	market?: MarketNames[];
	stockType?: StockTypesNames[];
	newsType?: NewsTypesNames[];
	additionalFilters?: FiltersStore | null;
	windowName?: WindowsNames;
};

sample({
	clock: addNewsFromSseEvent,
	source: {
		sortBy: $sortBy,
		market: $market,
		stockType: $stockType,
		newsType: $newsType,
		additionalFilters: $additionalFilters,
		allNews: $allNews,
	},
	filter: ({ sortBy }) => sortBy.currentLabel === SortLabels.NewestFirst,
	fn(
		{ market, stockType, newsType, additionalFilters, allNews },
		newsFromSseJson
	) {
		const newsFromSse: INews[] = JSON.parse(newsFromSseJson.data);
		console.log('newsFromSse', newsFromSse);
		const filteredNews = newsFromSse.filter(news => {
			// Filter by market
			if (market.length > 0) {
				const symbolMarkets = news.symbols.map(s => s.exchange);
				if (!symbolMarkets.some(m => market.includes(m as MarketNames))) {
					console.log('exit');
					return false;
				}
			}

			// Filter by stock type
			if (stockType.length > 0) {
				const symbolTypes = news.symbols.map(s => s.type);
				if (
					!symbolTypes.some(st => stockType.includes(st as StockTypesNames))
				) {
					console.log('exit');
					return false;
				}
			}

			// Filter by newsType
			if (newsType.length > 0) {
				if (!newsType.includes(news.types.type as NewsTypesNames)) {
					console.log('exit');
					return false;
				}
			}

			// Filter by newsType additionalFilters
			if (additionalFilters) {
				for (const [key, filterValue] of Object.entries(additionalFilters)) {
					if (!filterValue.enabled) continue;

					for (const symbol of news.symbols) {
						let symbolValue: number | undefined;

						switch (key) {
							case 'currentPrice':
								symbolValue = symbol.price;
								break;
							case 'priceChange':
								symbolValue = symbol.priceChange;
								break;
							case 'change':
								symbolValue = symbol.change;
								break;
							case 'currentVolume':
								symbolValue = symbol.volume;
								break;
							case 'float':
								symbolValue = symbol.float;
								break;
							case 'currentDayRange':
								symbolValue = symbol.daysRange;
								break;
						}

						if (symbolValue === undefined) continue;

						const from = Number(filterValue.range.from);
						const to = Number(filterValue.range.to);

						if (symbolValue < from || symbolValue > to) {
							console.log('exit');
							return false;
						}
					}
				}
			}

			console.log('ща придет');
			return true;
		});

		return [...allNews, ...filteredNews];
	},
	target: $allNews,
});

sample({
	clock: getNews,
	source: {
		sortBy: $sortBy,
		market: $market,
		stockType: $stockType,
		newsType: $newsType,
		additionalFilters: $additionalFilters,
		lastAllNewsNewsDate: $lastAllNewsNewsDate,
	},
	filter: (_, { isInitialNews }) => isInitialNews,
	fn: ({ sortBy, market, stockType, newsType, additionalFilters }) => ({
		typeOrigin: NewsTypesOrigins.News,
		limit: 20,
		start: new Date().getTime(),
		signal: new AbortController().signal,
		filters: { sortBy, market, stockType, newsType, additionalFilters },
	}),
	target: fetchNewsFx,
});

sample({
	clock: [applySortingClick, filtersApplyClick],
	source: {
		sortBy: $sortBy,
		market: $market,
		stockType: $stockType,
		newsType: $newsType,
		additionalFilters: $additionalFilters,
	},
	fn: ({ sortBy, market, stockType, newsType, additionalFilters }) => ({
		typeOrigin: NewsTypesOrigins.News,
		limit: 20,
		start:
			sortBy.currentLabel === SortLabels.NewestFirst
				? new Date().getTime()
				: getTimestampOfStartOfTheDay(),
		signal: new AbortController().signal,
		filters: {
			sortBy,
			market,
			stockType,
			newsType,
			additionalFilters,
		},
		isMobile: true,
		page: 1,
	}),
	target: fetchNewsFx,
});

sample({
	clock: getNews,
	source: {
		sortBy: $sortBy,
		market: $market,
		stockType: $stockType,
		newsType: $newsType,
		additionalFilters: $additionalFilters,
		lastAllNewsNewsDate: $lastAllNewsNewsDate,
		allNewsPagination: $allNewsPagination,
	},
	filter: (_, { isInitialNews }) => !isInitialNews,
	fn: ({
		sortBy,
		market,
		stockType,
		newsType,
		additionalFilters,
		lastAllNewsNewsDate,
		allNewsPagination,
	}) => ({
		typeOrigin: NewsTypesOrigins.News,
		limit: 20,
		start:
			sortBy.currentLabel === SortLabels.NewestFirst
				? lastAllNewsNewsDate!
				: getTimestampOfStartOfTheDay(),
		signal: new AbortController().signal,
		filters: { sortBy, market, stockType, newsType, additionalFilters },
		isMobile: true,
		page: allNewsPagination.page,
	}),
	target: loadMoreNewsFx,
});
