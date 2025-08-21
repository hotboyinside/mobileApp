import SortIcon from "@/assets/icons/sort-icon.svg";
import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { SortList } from "./SortList";
import { resetMarketDraft } from "@/stores/allNews/filtersPanel/filters/market/model";
import { resetNewsTypeDraft } from "@/stores/allNews/filtersPanel/filters/newsType/model";
import { resetStockTypeDraft } from "@/stores/allNews/filtersPanel/filters/stockType/model";
import { useUnit } from "effector-react";
import { $activeFiltersCount } from "@/stores/allNews/filtersPanel/filters/selectableFIlters/model";
import { MultiSelectTabs } from "@/components/ui/Tabs/MultiSelectTabs";
import {
  FilterTabVariant,
  $selectedTabsFilters,
  $openedFilterTab,
  closeFilterTab,
  openFilterTab,
} from "@/stores/allNews/filtersPanel/model";
import { ActiveTabWithCount } from "./ActiveTabWithCount";
import { ThemedView } from "@/components/ThemedView";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Filters } from "./Filters/Filters copy";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";

interface CustomFooterProps extends BottomSheetFooterProps {}

const CustomFooter = ({ animatedFooterPosition }: CustomFooterProps) => {
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  const bgColor = useThemeColor({}, appTokens.background.primary);
  const borderColor = useThemeColor({}, appTokens.border.tertiary);

  return (
    <BottomSheetFooter
      bottomInset={bottomSafeArea}
      animatedFooterPosition={animatedFooterPosition}
    >
      <ThemedView
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingHorizontal: 16,
          padding: 16,
          overflow: "hidden",
        }}
      >
        <Button variant='primary' size='lg' title='Apply' onPress={() => {}} />
      </ThemedView>
    </BottomSheetFooter>
  );
};

export const NewsFilterPanel = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const selectedTabFilters = useUnit($selectedTabsFilters);
  const openedFilterTab = useUnit($openedFilterTab);
  const countOfActiveFilters = useUnit($activeFiltersCount);

  const closeFilterTabFx = useUnit(closeFilterTab);
  const openFilterTabFx = useUnit(openFilterTab);

  const openTabFilters = (value: any) => {
    openFilterTabFx(value);
    handlePresentModalPress();
  };

  const closeFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    closeFilterTabFx();
    resetMarketDraft();
    resetStockTypeDraft();
    resetNewsTypeDraft();
  };

  const getLabel = (tabTitle: FilterTabVariant) => {
    switch (tabTitle) {
      case FilterTabVariant.sort:
        return <SortIcon />;
      case FilterTabVariant.filters:
        if (countOfActiveFilters > 0) {
          return (
            <ActiveTabWithCount
              label={FilterTabVariant.filters}
              count={countOfActiveFilters}
            />
          );
        }
        return FilterTabVariant.filters;
      case FilterTabVariant.keywords:
        return FilterTabVariant.keywords;
      case FilterTabVariant.rating:
        return FilterTabVariant.rating;
    }
  };

  const bgColor = useThemeColor({}, appTokens.background.primary);

  return (
    <ThemedView style={{ backgroundColor: bgColor }}>
      <MultiSelectTabs<FilterTabVariant>
        tabsTitles={Object.values(FilterTabVariant)}
        selectedValues={selectedTabFilters}
        onSelectionChange={openTabFilters}
        getLabel={getLabel}
        extraStyle={styles.container}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["100%"]}
        keyboardBehavior='interactive'
        // keyboardBlurBehavior='restore'
        footerComponent={CustomFooter}
      >
        {openedFilterTab === FilterTabVariant.sort && (
          <SortList isVisible onClose={closeFilterTabFx} />
        )}
        {openedFilterTab === FilterTabVariant.filters && (
          <Filters isVisible onCloseFilters={closeFilters} />
        )}
        {openedFilterTab === FilterTabVariant.keywords && (
          <SortList isVisible onClose={closeFilterTabFx} />
        )}
        {openedFilterTab === FilterTabVariant.rating && (
          <SortList isVisible onClose={closeFilterTabFx} />
        )}
      </BottomSheetModal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 4,
  },
});
