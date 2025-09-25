import {
	NEWS_GET_NEWS,
	NEWS_GET_SORTED_NEWS,
} from '@/constants/apiRoutes';
import { api } from './axios';
import { INews } from '@/stores/allNews/news/model';
import { PaginationDefaults } from '@/constants/paginationDefaultLimit';
import { NewsSortValues, OrderValues } from '@/types/sortBy';
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
	typeOrigin?: NewsTypesOrigins.News;
	typeCategory?: NewsTypesCategories;
	limit?: number;
	amountOfPagesToInclude?: number;
	start: number;
	startFromOppositeSide?: boolean;
	// todo type
	filters?: any;
	signal?: AbortSignal;
}

export interface IParamsGetSortedNews {
	typeOrigin?: NewsTypesOrigins;
	typeCategory?: NewsTypesCategories;
	limit?: number;
	amountOfPagesToInclude?: number;
	start?: number;
	filters?: FiltersData;
	signal?: AbortSignal;
}

type BackendFilter = { from: number; to: number };
type BackendFilters = Record<string, BackendFilter>;

export interface GetNewsResponse {
	data: {
		success: {
			docs: INews[];
		};
		errors: any;
	};
}

export const getNewsRequest = async (data: IParamsGetNews) => {
	const {
		typeOrigin,
		typeCategory,
		limit = 20,
		amountOfPagesToInclude = PaginationDefaults.DefaultAmountOfPagesToInclude,
		start,
		startFromOppositeSide = true,
		filters = {},
		signal,
	} = data;
	const { sort, order, windowName, ...preparedFilters } = filters;

	for (const [key, value] of Object.entries(preparedFilters)) {
		if (key === 'additionalFilters') {
			continue;
		}

		if (typeof value === 'object') {
			// @ts-ignore
			preparedFilters[key] = Object.values(value).map(val => val?.value);
			continue;
		}

		preparedFilters[key] = value;
	}

	let preparedParams: {
		limit?: number;
		amountOfPagesToInclude?: number;
		start: number;
		startFromOppositeSide: boolean;
		typeOrigin?: NewsTypesOrigins;
		typeCategory?: NewsTypesCategories;
		sort?: NewsSortValues;
		order?: OrderValues;
	} = {
		limit,
		sort,
		start,
		startFromOppositeSide,
		order,
		amountOfPagesToInclude,
	};

	if (typeOrigin) {
		preparedParams.typeOrigin = typeOrigin;
	}

	return api.post(
		NEWS_GET_NEWS,
		{ filters: preparedFilters },
		{ params: preparedParams, signal }
	);
};

interface PreparedParameters {
	isMobile: boolean;
	windowName: WindowsNames;
  order: OrderValues;
  limit?: number;
  amountOfPagesToInclude?: number;
  start?: number;
  typeOrigin?: NewsTypesOrigins;
  typeCategory?: NewsTypesCategories;
  sort?: NewsSortValues;
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
	filters={},
	signal,
}: IParamsGetSortedNews = {}) => {
  const {
    sortBy,
		windowName,
    ...otherFilters
  } = filters;

	const {market, stockType, newsType, additionalFilters} = otherFilters;

	const prepareAdditionalFilters: BackendFilters = {};
	if (additionalFilters) {
		Object.entries(additionalFilters).forEach(([key, value]) => {
		if (value && value.enabled) {
			prepareAdditionalFilters[key] = {
				from: Number(value.range.from),
				to: Number(value.range.to),
			}
		}})
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
		isMobile: true,
		windowName: windowName ?? WindowsNames.MainWindow,
		order: sortBy?.order ?? OrderValues.Ascending, 
		limit,
		amountOfPagesToInclude,
		sort: sortBy?.sortValue,
		start: start,
		typeOrigin: typeOrigin,
	};

	console.log('preparedFilters', preparedFilters);
	console.log('preparedParams', preparedParams);

	return api.post(
		NEWS_GET_SORTED_NEWS,
		{ filters: preparedFilters },
		{ params: preparedParams, signal }
	);
};
