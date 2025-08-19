import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import { BottomSheet } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  $sortByDraft,
  applySortingClick,
  closeSortByClick,
  resetSortingDraft,
  updateSortingDraft,
} from "@/stores/allNews/filtersPanel/sortBy/model";
import { useUnit } from "effector-react";
import { SortLabels } from "@/types/sortBy";
import { HeaderBottomSheet } from "./HeaderBottomSheet";

type SortListProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const SortList = ({ isVisible, onClose }: SortListProps) => {
  const currentSortValue = useUnit($sortByDraft);

  const updateSortValueFx = useUnit(updateSortingDraft);
  const resetSortingFx = useUnit(resetSortingDraft);
  const applySortingClickFx = useUnit(applySortingClick);
  const closeSortByClickFx = useUnit(closeSortByClick);

  return (
    <BottomSheet
      modalProps={{
        animationType: "slide",
        presentationStyle: "overFullScreen",
        transparent: true,
      }}
      isVisible={isVisible}
    >
      <ThemedView style={styles.container}>
        <HeaderBottomSheet
          onResetDefaultValues={resetSortingFx}
          onCloseFilters={() => {
            onClose();
            closeSortByClickFx();
          }}
          headerLabel='Sort by'
        />

        <View style={styles.list}>
          {Object.values(SortLabels).map((filter, index) => (
            <Checkbox
              key={filter}
              checked={filter === currentSortValue}
              title={filter}
              onPress={() => updateSortValueFx(filter)}
            />
          ))}
        </View>
        <Button
          variant='primary'
          size='lg'
          title='Apply'
          onPress={() => {
            applySortingClickFx();
            onClose();
          }}
        />
      </ThemedView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    paddingBottom: 16,
  },

  button: {
    alignSelf: "flex-start",
  },

  title: {
    flex: 1,
    fontWeight: 700,
    fontFamily: "MontserratBold",
    textAlign: "center",
  },

  list: {
    paddingVertical: 16,
    gap: 8,
  },
});
