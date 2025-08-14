import { CheckboxBlock } from "@/components/ui/CheckBoxBlock";
import { FILTER_LABELS, FilterKey } from "@/types/filters";
import { View, StyleSheet } from "react-native";
import { RangeInput } from "./RangeInput";
import { useUnit } from "effector-react";
import {
  $draftFilters,
  toggleFilterEnabled,
  updateFilterRange,
} from "@/stores/allNews/filters/model";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";

export const AdditionalFilters = () => {
  const filtersState = useUnit($draftFilters);
  const toggleFilterFn = useUnit(toggleFilterEnabled);
  const updateFilterRangeFn = useUnit(updateFilterRange);

  if (!filtersState) return;

  return (
    <ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title} type='textLg'>
          Additional Filters
        </ThemedText>
        <Button
          title='Clear'
          variant='link-gray'
          buttonStyle={styles.buttonExtra}
        />
      </ThemedView>
      <View style={styles.list}>
        {Object.entries(filtersState).map(([key, filter]) => (
          <CheckboxBlock
            key={key}
            checked={filter.enabled}
            title={FILTER_LABELS[key as FilterKey]}
            bottomComponent={
              <RangeInput
                from={filter.range.from}
                to={filter.range.to}
                onChange={(from, to) =>
                  updateFilterRangeFn({
                    key: key as FilterKey,
                    range: { from, to },
                  })
                }
              />
            }
            onPress={() => toggleFilterFn(key as FilterKey)}
          />
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  buttonExtra: {
    paddingRight: 0,
  },

  list: {
    marginTop: 8,
    paddingBottom: 16,
    gap: 8,
  },
});
