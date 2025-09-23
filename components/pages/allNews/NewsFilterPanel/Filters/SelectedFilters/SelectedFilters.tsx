import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/ui/Badge/Badge";
import { StyleSheet } from "react-native";
import CloseIcon from "@/assets/icons/close-icon.svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { useUnit } from "effector-react";
import { AdditionalFilterKey } from "@/types/filters";
import { toggleFilterEnabled } from "@/stores/allNews/filtersPanel/filters/additionalFilters/model";
import {
  removeMarketFromDraft,
  MarketNames,
} from "@/stores/allNews/filtersPanel/filters/market/model";
import {
  removeNewsTypeFromDraft,
  NewsTypesNames,
} from "@/stores/allNews/filtersPanel/filters/newsType/model";
import {
  $activeFiltersCount,
  $selectableFilters,
} from "@/stores/allNews/filtersPanel/filters/selectableFilters/model";
import {
  removeStockTypeFromDraft,
  StockTypesNames,
} from "@/stores/allNews/filtersPanel/filters/stockType/model";

export const SelectedFilters = () => {
  const selectableFilters = useUnit($selectableFilters);
  const selectedFiltersCount = useUnit($activeFiltersCount);
  const onRemoveMarketFromDraft = useUnit(removeMarketFromDraft);
  const onRemoveStockTypeFromDraft = useUnit(removeStockTypeFromDraft);
  const onRemoveNewsTypeFromDraft = useUnit(removeNewsTypeFromDraft);
  const onToggleFilterEnabled = useUnit(toggleFilterEnabled);

  const handleRemoveFilter = (type: string, value: string) => {
    switch (type) {
      case "market":
        onRemoveMarketFromDraft(value as MarketNames);
        break;
      case "stockType":
        onRemoveStockTypeFromDraft(value as StockTypesNames);
        break;
      case "newsType":
        onRemoveNewsTypeFromDraft(value as NewsTypesNames);
        break;
      case "additionalFilter":
        onToggleFilterEnabled(value as AdditionalFilterKey);
        break;
    }
  };

  const iconColor = useThemeColor({}, appTokens.foreground.quinary);

  if (selectedFiltersCount === 0) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      {selectableFilters &&
        selectableFilters.map(item => (
          <Badge
            key={item.value}
            value={item.label}
            size='xl'
            variant='pillColor'
            color='gray'
            icon={
              <CloseIcon
                width={16}
                height={16}
                fill={iconColor}
                onPress={() => handleRemoveFilter(item.type, item.value)}
              />
            }
          />
        ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
});
