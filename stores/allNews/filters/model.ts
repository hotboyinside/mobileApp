import { FilterKey, FiltersStore, Range } from "@/types/filters";
import { createEvent, createStore, sample } from "effector";
import { filtersApplyClick, pageMounted } from "../model";
import { getFiltersSnapshotFx, saveFilterFx } from "./handlers";

export const $filters = createStore<FiltersStore | null>(null);
export const $draftFilters = createStore<FiltersStore | null>(null);

export const toggleFilterEnabled = createEvent<FilterKey>();
export const updateFilterRange = createEvent<{
  key: FilterKey;
  range: Range;
}>();
export const resetDraftFilters = createEvent();

$draftFilters.on(toggleFilterEnabled, (state, key) => {
  if (!state) return state;

  return {
    ...state,
    [key]: {
      ...state[key],
      enabled: !state[key].enabled,
      range: state[key].enabled ? { from: "", to: "" } : state[key].range,
    },
  };
});

$draftFilters.on(updateFilterRange, (state, { key, range }) => {
  if (!state) return state;

  return {
    ...state,
    [key]: {
      ...state[key],
      range: range,
    },
  };
});

sample({
  clock: pageMounted,
  target: getFiltersSnapshotFx,
});

sample({
  clock: getFiltersSnapshotFx.doneData,
  target: [$draftFilters, $filters],
});

sample({
  clock: resetDraftFilters,
  source: $filters,
  target: $draftFilters,
});

sample({
  clock: filtersApplyClick,
  source: $draftFilters,
  target: [$filters, saveFilterFx],
});
