import { BottomSheet } from "@rneui/base";
import { Button } from "@/components/ui/Button";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { AdditionalFilters } from "./AdditionalFilters/AdditionalFilters";
import { ThemedView } from "@/components/ThemedView";
import { useUnit } from "effector-react";
import { HeaderFilters } from "./HeaderFilters";
import React from "react";
import { SelectedFilters } from "./SelectedFilters/SelectedFilters";
import { MarketFilter } from "./MarketFilter/MarketFilter";
import { StockTypeFilter } from "../../StockTypeFilter/StockTypeFilter";
import { NewsTypeFilter } from "./NewsTypeFilter/NewsTypeFilter";
import { filtersApplyClick } from "@/stores/allNews/model";

type FiltersProps = {
  isVisible: boolean;
  onCloseFilters: () => void;
};

export const Filters = ({ isVisible, onCloseFilters }: FiltersProps) => {
  const applyFiltersFn = useUnit(filtersApplyClick);

  return (
    <BottomSheet
      modalProps={{
        animationType: "fade",
        presentationStyle: "overFullScreen",
        transparent: true,
      }}
      isVisible={isVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
        keyboardVerticalOffset={16}
      >
        <ThemedView style={styles.container}>
          <HeaderFilters onCloseFilters={onCloseFilters} />
          <SelectedFilters />
          <MarketFilter />
          <StockTypeFilter />
          <NewsTypeFilter />
          <AdditionalFilters />
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
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    padding: 16,
  },
});
