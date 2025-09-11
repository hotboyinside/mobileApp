import { combine, createEvent, createStore } from "effector";
import { fetchNewsFx, loadMoreNewsFx } from "./handlers";
import { $keywords } from "../filtersPanel/keywords/model";
import { UserKeyword } from "@/types/keywords";
import { ISymbol } from "@/types/symbols";

export interface INews {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  symbols: ISymbol[];
  url: string;
  createdAt: string;
  sourceId: string;
  industries: string[];
  content: string;
  categories: string[];
  sectors: string[];
}

export interface IFilteredNews extends INews {
  keywords: UserKeyword[];
}

export enum NewsSortValuesExtended {
  Time = "time",
  Float = "float",
  Rating = "rating",
  Change = "change",
}

export enum NewsLoadStatus {
  Idle = "idle",
  Loading = "loading",
  LoadingMore = "loadingMore",
  Error = "error",
}

export const $allNewsLoadStatus = createStore<NewsLoadStatus>(
  NewsLoadStatus.Idle
);
export const $allNews = createStore<INews[]>([]);
export const $lastAllNewsNewsDate = $allNews.map(docs => {
  if (docs.length < 1) return null;

  const lastDoc = docs.at(-1);
  return new Date((lastDoc as INews).createdAt).getTime();
});
export const $filteredNews = combine(
  $allNews,
  $keywords,
  (news: INews[], keywords: UserKeyword[]): IFilteredNews[] => {
    return news.map(item => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();

      const matchedKeywords = keywords.filter(keyword => {
        const word = keyword.word.toLowerCase();
        return title.includes(word) || description.includes(word);
      });

      return {
        ...item,
        keywords: matchedKeywords,
      };
    });
  }
);

export const addNewsFromSseEvent = createEvent<MessageEvent>();

$allNews.on(addNewsFromSseEvent, (state, payload) => {
  const newsFromSse = JSON.parse(payload.data);

  return [...newsFromSse, ...state];
});

$allNews.on(fetchNewsFx.doneData, (_, docs) => docs);
$allNews.on(loadMoreNewsFx.doneData, (state, payload) => {
  return [...state, ...payload];
});

$allNewsLoadStatus
  .on(fetchNewsFx.pending, (_, pending) =>
    pending ? NewsLoadStatus.Loading : NewsLoadStatus.Idle
  )
  .on(fetchNewsFx.fail, () => NewsLoadStatus.Error)
  .on(fetchNewsFx.done, () => NewsLoadStatus.Idle);

$allNewsLoadStatus
  .on(loadMoreNewsFx.pending, (_, pending) =>
    pending ? NewsLoadStatus.LoadingMore : NewsLoadStatus.Idle
  )
  .on(loadMoreNewsFx.fail, () => NewsLoadStatus.Error)
  .on(loadMoreNewsFx.done, () => NewsLoadStatus.Idle);
