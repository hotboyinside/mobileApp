import {
  AdditionalFilterKey,
  FiltersStore,
  AdditionalFilterRange,
} from "@/types/filters";
import { createEvent, createStore, sample } from "effector";
import { getFiltersSnapshotFx, saveFilterFx } from "./handlers";
import { pageMounted } from "@/stores/allNews/model";
import { defaultAdditionalFiltersSet } from "@/constants/additionalFilters/defaultAdditionalFiltersSet";
import { filtersApplyClick } from "../model";

export const $additionalFilters = createStore<FiltersStore | null>(null);
export const $additionalFiltersDraft = createStore<FiltersStore | null>(null);

export const toggleFilterEnabled = createEvent<AdditionalFilterKey>();
export const updateFilterRange = createEvent<{
  key: AdditionalFilterKey;
  range: AdditionalFilterRange;
}>();
export const resetAdditionalFiltersDraft = createEvent();

$additionalFiltersDraft.on(toggleFilterEnabled, (state, key) => {
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

$additionalFiltersDraft.on(updateFilterRange, (state, { key, range }) => {
  if (!state) return state;

  return {
    ...state,
    [key]: {
      ...state[key],
      range: range,
    },
  };
});

$additionalFiltersDraft.on(resetAdditionalFiltersDraft, _ => {
  return defaultAdditionalFiltersSet;
});

sample({
  clock: pageMounted,
  target: getFiltersSnapshotFx,
});

sample({
  clock: getFiltersSnapshotFx.doneData,
  target: [$additionalFiltersDraft, $additionalFilters],
});

sample({
  clock: filtersApplyClick,
  source: $additionalFiltersDraft,
  target: [$additionalFilters, saveFilterFx],
});
