import {
	NEWS_GET_NEWS,
	NEWS_GET_SORTED_NEWS,
	USERS_KEYWORDS,
} from '@/constants/apiRoutes';
import { api } from './axios';
import { INews, NewsSortValuesExtended } from '@/stores/allNews/news/model';
import { PaginationDefaults } from '@/constants/paginationDefaultLimit';
import { NewsSortValues, OrderValues } from '@/types/sortBy';
import { WindowsNames } from '@/constants/socket/clientEvents';
import { MarketNames } from '@/stores/allNews/filtersPanel/filters/market/model';
import { NewsTypesNames } from '@/stores/allNews/filtersPanel/filters/newsType/model';
import { StockTypesNames } from '@/stores/allNews/filtersPanel/filters/stockType/model';
import { AdditionalFilterKey, AdditionalFilterRange } from '@/types/filters';
import { StarNumberStateKey } from '@/types/starRating';

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
	filters?: any;
	signal?: AbortSignal;
}

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
  limit?: number;
  amountOfPagesToInclude?: number;
  start?: number;
  typeOrigin?: NewsTypesOrigins;
  typeCategory?: NewsTypesCategories;
  sort?: NewsSortValuesExtended;
  order?: OrderValues;
  windowName: WindowsNames;
}

interface PreparedFilters {
  market?: MarketNames[];
  stockType?: StockTypesNames[];
  newsType?: NewsTypesNames;
  rating?: StarNumberStateKey[];
  additionalFilters?: Record<AdditionalFilterKey, AdditionalFilterRange>
}

export const getSortedNewsRequest = async ({
	typeOrigin,
	typeCategory,
	limit = PaginationDefaults.DefaultLimit,
	amountOfPagesToInclude = PaginationDefaults.DefaultAmountOfPagesToInclude,
	start,
	filters = {},
	signal,
}: IParamsGetSortedNews = {}) => {
  const {
    sort,
    order,
    windowName,
    ...otherFilters
  } = filters;
  
  let preparedFilters: PreparedFilters = {};
  let preparedParams = {};

	return api.post(
		NEWS_GET_NEWS,
		{ filters: preparedFilters },
		{ params: preparedParams, signal }
	);
};
