import {
  SortLabels,
  SortByStore,
  sortMapping,
  sortByStoreDefault,
} from "@/types/sortBy";
import { combine, createEvent, createStore, sample } from "effector";
import {
  FilterTabVariant,
  addSelectedTabFilters,
  removeSelectedTabFilters,
} from "../model";
import { WindowsNames } from "@/constants/socket/clientEvents";
import { getTimestampOfStartOfTheDay } from "@/helpers/date/getTimestampOfStartOfTheDay";
import { FiltersStore } from "@/types/filters";
import { fetchSortedNewsFx } from "../../news/handlers";
import {
  $allNews,
  addNewsFromSseEvent,
  INews,
  NewsTypesOrigins,
} from "../../news/model";
import { $additionalFilters } from "../filters/additionalFilters/model";
import { MarketNames, $market } from "../filters/market/model";
import { NewsTypesNames, $newsType } from "../filters/newsType/model";
import { StockTypesNames, $stockType } from "../filters/stockType/model";

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
  clock: applySortingClick,
  source: {
    sortBy: $sortBy,
    market: $market,
    stockType: $stockType,
    newsType: $newsType,
    additionalFilters: $additionalFilters,
  },
  filter: ({ sortBy }) => sortBy.currentLabel !== SortLabels.NewestFirst,
  fn: ({ sortBy, market, stockType, newsType, additionalFilters }) => {
    return {
      typeOrigin: NewsTypesOrigins.News,
      limit: 20,
      start: getTimestampOfStartOfTheDay(),
      signal: new AbortController().signal,
      filters: {
        sortBy,
        market,
        stockType,
        newsType,
        additionalFilters,
      },
    };
  },
  target: fetchSortedNewsFx,
});

sample({
  clock: addNewsFromSseEvent,
  source: {
    sortBy: $sortBy,
    market: $market,
    stockType: $stockType,
    newsType: $newsType,
    additionalFilters: $additionalFilters,
  },
  filter: ({ sortBy }) => sortBy.currentLabel === SortLabels.NewestFirst,
  fn({ market, stockType, newsType, additionalFilters }, newsFromSseJson) {
    const newsFromSse: INews[] = JSON.parse(newsFromSseJson.data);
    const filteredNews = newsFromSse.filter(news => {
      // Filter by market
      if (market.length > 0) {
        const symbolMarkets = news.symbols.map(s => s.exchange);
        if (!symbolMarkets.some(m => market.includes(m as MarketNames))) {
          return false;
        }
      }

      // Filter by stock type
      if (stockType.length > 0) {
        const symbolTypes = news.symbols.map(s => s.type);
        if (
          !symbolTypes.some(st => stockType.includes(st as StockTypesNames))
        ) {
          return false;
        }
      }

      // Filter by newsType
      if (newsType.length > 0) {
        if (!newsType.includes(news.types.type as NewsTypesNames)) {
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
              case "currentPrice":
                symbolValue = symbol.price;
                break;
              case "priceChange":
                symbolValue = symbol.priceChange;
                break;
              case "change":
                symbolValue = symbol.change;
                break;
              case "volume":
                symbolValue = symbol.volume;
                break;
              case "float":
                symbolValue = symbol.float;
                break;
              case "dayRange":
                symbolValue = symbol.daysRange;
                break;
            }

            if (symbolValue === undefined) continue;

            const from = Number(filterValue.range.from);
            const to = Number(filterValue.range.to);

            if (symbolValue < from || symbolValue > to) {
              return false;
            }
          }
        }
      }

      return true;
    });

    return filteredNews;
  },
  target: $allNews,
});
