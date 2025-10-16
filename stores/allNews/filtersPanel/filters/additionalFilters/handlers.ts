import { defaultAdditionalFiltersSet } from "@/constants/additionalFilters/defaultAdditionalFiltersSet";
import {
  additionalFiltersLabels,
  AdditionalFilterKey,
  FiltersStore,
} from "@/types/filters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect } from "effector";

const PREFIX = "all-news-filters";

export const getFiltersSnapshotFx = createEffect(
  async (): Promise<FiltersStore> => {
    const filterStore = structuredClone(defaultAdditionalFiltersSet);

    try {
      await Promise.all(
        Object.keys(additionalFiltersLabels).map(async filterLabel => {
          const [filterValueFrom, filterValueTo] = await Promise.all([
            AsyncStorage.getItem(`${PREFIX}-${filterLabel}-from`),
            AsyncStorage.getItem(`${PREFIX}-${filterLabel}-to`),
          ]);

          if (filterValueFrom || filterValueTo) {
            filterStore[filterLabel as AdditionalFilterKey].enabled = true;
            filterStore[filterLabel as AdditionalFilterKey].range.from =
              filterValueFrom ?? "";
            filterStore[filterLabel as AdditionalFilterKey].range.to =
              filterValueTo ?? "";
          }
        })
      );
    } catch (error) {
      console.error("Error retrieving filters data", error);
    } finally {
      return filterStore;
    }
  }
);

export const saveFilterFx = createEffect(async (filters: FiltersStore) => {
  try {
    for (const [key, filter] of Object.entries(filters)) {
      if (filter.enabled) {
        await AsyncStorage.setItem(`${PREFIX}-${key}-from`, filter.range.from);
        await AsyncStorage.setItem(`${PREFIX}-${key}-to`, filter.range.to);
      } else {
        await AsyncStorage.removeItem(`${PREFIX}-${key}-from`);
        await AsyncStorage.removeItem(`${PREFIX}-${key}-to`);
      }
    }
  } catch (error) {
    console.error("Error saving filters", error);
  }
});
