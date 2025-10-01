import { NEWS_GET_NEWS, NEWS_GET_SORTED_NEWS } from '@/constants/apiRoutes';
import { api } from './axios';
import { INews } from '@/stores/allNews/news/model';
import { PaginationDefaults } from '@/constants/paginationDefaultLimit';
import { NewsSortValues, OrderValues, SortLabels } from '@/types/sortBy';
import { WindowsNames } from '@/constants/socket/clientEvents';
import { MarketNames } from '@/stores/allNews/filtersPanel/filters/market/model';
import { NewsTypesNames } from '@/stores/allNews/filtersPanel/filters/newsType/model';
import { StockTypesNames } from '@/stores/allNews/filtersPanel/filters/stockType/model';
import { StarNumberStateKey } from '@/types/starRating';
import { FiltersData } from '@/stores/allNews/filtersPanel/sortBy/model';

export enum NewsTypesOrigins {
	News = 'news',
	Article = 'article',
}

export enum NewsTypesCategories {
	DealNews = 'dealNews',
	Insiders = 'insiders',
}

export interface IParamsGetNews {
	typeOrigin?: NewsTypesOrigins;
	typeCategory?: NewsTypesCategories;
	limit?: number;
	amountOfPagesToInclude?: number;
	start: number;
	startFromOppositeSide?: boolean;
	filters?: FiltersData;
	signal?: AbortSignal;
	page?: number;
	isMobile?: boolean;
}

export interface IParamsGetSortedNews {
	typeOrigin?: NewsTypesOrigins;
	typeCategory?: NewsTypesCategories;
	limit?: number;
	amountOfPagesToInclude?: number;
	start?: number;
	startFromOppositeSide?: boolean;
	filters?: FiltersData;
	signal?: AbortSignal;
}

type BackendFilter = { from: number | string; to: number | string };
type BackendFilters = Record<string, BackendFilter>;

export interface GetNewsResponse {
	data: {
		success: {
			docs: INews[];
		};
		errors: any;
	};
}

export const getNewsRequest = async ({
	typeOrigin,
	limit = PaginationDefaults.DefaultLimit,
	amountOfPagesToInclude = PaginationDefaults.DefaultAmountOfPagesToInclude,
	start,
	startFromOppositeSide = true,
	filters = {},
	signal,
	page,
	isMobile,
}: IParamsGetNews) => {
	const { sortBy, windowName, ...otherFilters } = filters;

	const { market, stockType, newsType, additionalFilters } = otherFilters;

	const prepareAdditionalFilters: BackendFilters = {};
	if (additionalFilters) {
		Object.entries(additionalFilters).forEach(([key, value]) => {
			if (value && value.enabled) {
				prepareAdditionalFilters[key] = {
					from: value.range.from ? Number(value.range.from) : '',
					to: value.range.to ? Number(value.range.to) : '',
				};
			}
		});
	}

	const preparedFilters: PreparedFilters = {
		market: market ? [...market] : [],
		stockType: stockType ? [...stockType] : [],
		additionalFilters: prepareAdditionalFilters,
		rating: [0, 1, 2, 3, 4],
	};

	if (newsType && newsType.length === 1) {
		preparedFilters['newsType'] = newsType[0];
	}

	const preparedParams: PreparedParameters = {
		typeOrigin: typeOrigin,
		limit,
		amountOfPagesToInclude,
		start: start,
		sort: sortBy?.sortValue,
		order: sortBy?.order ?? OrderValues.Ascending,
		page,
		isMobile,
	};

	if (sortBy?.currentLabel === SortLabels.NewestFirst) {
		preparedParams['startFromOppositeSide'] = startFromOppositeSide;
	}

	return api.post(
		NEWS_GET_NEWS,
		{ filters: preparedFilters },
		{ params: preparedParams, signal }
	);
};

interface PreparedParameters {
	isMobile?: boolean;
	windowName?: WindowsNames;
	order: OrderValues;
	limit?: number;
	startFromOppositeSide?: boolean;
	amountOfPagesToInclude?: number;
	start?: number;
	typeOrigin?: NewsTypesOrigins;
	typeCategory?: NewsTypesCategories;
	sort?: NewsSortValues;
	page?: number;
}

interface PreparedFilters {
	market?: MarketNames[];
	stockType?: StockTypesNames[];
	rating?: StarNumberStateKey[];
	newsType?: NewsTypesNames;
	additionalFilters?: BackendFilters;
}

export const getSortedNewsRequest = async ({
	typeOrigin,
	limit = PaginationDefaults.DefaultLimit,
	amountOfPagesToInclude = PaginationDefaults.DefaultAmountOfPagesToInclude,
	start,
	filters = {},
	signal,
}: IParamsGetSortedNews = {}) => {
	const { sortBy, windowName, ...otherFilters } = filters;

	const { market, stockType, newsType, additionalFilters } = otherFilters;

	const prepareAdditionalFilters: BackendFilters = {};
	if (additionalFilters) {
		Object.entries(additionalFilters).forEach(([key, value]) => {
			if (value && value.enabled) {
				prepareAdditionalFilters[key] = {
					from: value.range.from ? Number(value.range.from) : '',
					to: value.range.to ? Number(value.range.to) : '',
				};
			}
		});
	}

	const preparedFilters: PreparedFilters = {
		market: market ? [...market] : [],
		stockType: stockType ? [...stockType] : [],
		additionalFilters: prepareAdditionalFilters,
		rating: [0, 1, 2, 3, 4],
	};

	if (newsType && newsType.length === 1) {
		preparedFilters['newsType'] = newsType[0];
	}

	const preparedParams: PreparedParameters = {
		typeOrigin: typeOrigin,
		windowName: windowName ?? WindowsNames.MainWindow,
		amountOfPagesToInclude,
		sort: sortBy?.sortValue,
		order: sortBy?.order ?? OrderValues.Ascending,
		start: start,
		isMobile: true,
		limit,
	};

	return api.post(
		NEWS_GET_SORTED_NEWS,
		{ filters: preparedFilters },
		{ params: preparedParams, signal }
	);
};
