import { TabProps as RNTabProps } from "@rneui/base";
import React from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TabItem } from "./TabItem";
import { ThemedView } from "@/components/ThemedView";

export type MultiSelectTabsProps<T> = RNTabProps & {
  tabsTitles: T[];
  selectedValues: T[];
  onSelectionChange: (values: T[]) => void;
  isScroll?: boolean;
  scrollStyles?: StyleProp<ViewStyle>;
};

export const MultiSelectTabs = <T extends string>({
  tabsTitles,
  selectedValues,
  onSelectionChange,
  scrollStyles,
  isScroll = false,
}: MultiSelectTabsProps<T>) => {
  const toggleValue = (value: T) => {
    let newSelectedValues;
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(val => val !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }

    onSelectionChange(newSelectedValues);
  };

  return (
    <>
      {isScroll && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          style={[scrollStyles]}
        >
          {tabsTitles.map((tabTitle, index) => (
            <TabItem
              key={index}
              title={tabTitle}
              active={selectedValues.includes(tabTitle)}
              onPress={() => toggleValue(tabTitle)}
            />
          ))}
        </ScrollView>
      )}

      {!isScroll && (
        <ThemedView style={styles.container}>
          {tabsTitles.map((tabTitle, index) => (
            <TabItem
              key={index}
              title={tabTitle}
              active={selectedValues.includes(tabTitle)}
              onPress={() => toggleValue(tabTitle)}
            />
          ))}
        </ThemedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  contentContainerStyle: { paddingHorizontal: 16 },

  buttonExtraStyles: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
