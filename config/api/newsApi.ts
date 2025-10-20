import { NEWS_BY_ID, NEWS_GET_NEWS } from '@/constants/apiRoutes';
import { PaginationDefaults } from '@/constants/paginationDefaultLimit';
import { WindowsNames } from '@/constants/socket/clientEvents';
import { FiltersStore } from '@/types/filters';
import { MarketNames } from '@/types/market';
import { NewsTypesNames } from '@/types/newsType';
import {
	NewsSortValues,
	OrderValues,
	SortByStore,
	SortLabels,
} from '@/types/sortBy';
import { StarNumberStateKey } from '@/types/starRating';
import { StockTypesNames } from '@/types/stockTypes';
import { api } from './axios';

export enum NewsTypesOrigins {
	News = 'news',
	Article = 'article',
}

export enum NewsTypesCategories {
	DealNews = 'dealNews',
	Insiders = 'insiders',
}

export type FiltersData = {
	sortBy?: SortByStore;
	market?: MarketNames[];
	stockType?: StockTypesNames[];
	newsType?: NewsTypesNames[];
	additionalFilters?: FiltersStore | null;
	windowName?: WindowsNames;
};

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

type BackendFilter = { from: number | string; to: number | string };
type BackendFilters = Record<string, BackendFilter>;

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

export const getNewsByIdRequest = (newsId: string) => {
	return api.get(NEWS_BY_ID(newsId));
};
