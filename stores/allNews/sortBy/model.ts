import {
  SortLabels,
  OrderValues,
  NewsSortValues,
  SortByStore,
  sortMapping,
} from "@/types/sortBy";
import { createEvent, createStore, sample } from "effector";

export const sortByStoreDefault = {
  currentLabel: SortLabels.NewestFirst,
  order: OrderValues.Descending,
  sortValue: NewsSortValues.Time,
};

export const $sortBy = createStore<SortByStore>(sortByStoreDefault);
export const $sortByDraft = createStore<SortLabels>(SortLabels.NewestFirst);

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
