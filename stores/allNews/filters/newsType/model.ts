import { createEvent, createStore } from "effector";

export enum NewsTypesLabels {
  News = "News",
  Filings = "Filings",
}

export enum NewsTypesNames {
  News = "news",
  Filings = "filings",
}

export const $newsType = createStore<NewsTypesNames[]>([
  NewsTypesNames.News,
  NewsTypesNames.Filings,
]);
export const $newsTypeDraft = createStore<NewsTypesLabels[]>([]);

export const changeNewsTypeDraft = createEvent<NewsTypesLabels[]>();

$newsTypeDraft.on(changeNewsTypeDraft, (_, payload) => payload);
