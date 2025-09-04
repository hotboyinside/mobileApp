import {
  NEWS_GET_NEWS,
  NEWS_GET_SORTED_NEWS,
  USERS_KEYWORDS,
} from "@/constants/apiRoutes";
import { api } from "./axios";
import { INews, NewsSortValuesExtended } from "@/stores/allNews/news/model";
import { PaginationDefaults } from "@/constants/paginationDefaultLimit";
import { NewsSortValues, OrderValues } from "@/types/sortBy";

export enum NewsTypesOrigins {
  News = "news",
  Article = "article",
}

export enum NewsTypesCategories {
  DealNews = "dealNews",
  Insiders = "insiders",
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
    if (key === "additionalFilters") {
      continue;
    }

    if (typeof value === "object") {
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
