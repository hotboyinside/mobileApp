import { Button } from "@/components/ui/Button";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { AdditionalFilters } from "./AdditionalFilters/AdditionalFilters";
import { ThemedView } from "@/components/ThemedView";
import { useUnit } from "effector-react";
import { HeaderBottomSheet } from "../HeaderBottomSheet";
import React, { Ref } from "react";
import { SelectedFilters } from "./SelectedFilters/SelectedFilters";
import { MarketFilter } from "./MarketFilter/MarketFilter";
import { StockTypeFilter } from "./StockTypeFilter/StockTypeFilter";
import { NewsTypeFilter } from "./NewsTypeFilter/NewsTypeFilter";
import { filtersApplyClick } from "@/stores/allNews/model";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { resetDraftFilters } from "@/stores/allNews/filtersPanel/filters/additionalFilters/model";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type FiltersProps = {
  isVisible: boolean;
  onCloseFilters: () => void;
};

export const Filters = ({ isVisible, onCloseFilters }: FiltersProps) => {
  const resetDraftFiltersFn = useUnit(resetDraftFilters);
  const applyFiltersFn = useUnit(filtersApplyClick);

  const bgColor = useThemeColor({}, appTokens.background.primary);
  const borderColor = useThemeColor({}, appTokens.border.tertiary);

  return (
    <BottomSheetView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={16}
        style={[styles.wrapper, { backgroundColor: bgColor }]}
      >
        <HeaderBottomSheet
          onResetDefaultValues={resetDraftFiltersFn}
          onCloseFilters={onCloseFilters}
          headerLabel='Filters'
        />

        <BottomSheetScrollView style={styles.container}>
          <SelectedFilters />
          <MarketFilter />
          <StockTypeFilter />
          <NewsTypeFilter />
          <AdditionalFilters />
        </BottomSheetScrollView>

        <ThemedView
          style={[styles.containerButton, { borderColor: borderColor }]}
        >
          <Button
            variant='primary'
            size='lg'
            title='Apply'
            onPress={() => {
              applyFiltersFn();
              onCloseFilters();
            }}
          />
        </ThemedView>
      </KeyboardAvoidingView>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },

  containerButton: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    padding: 16,
  },
});
