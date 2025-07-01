import { Tab as RNTab, TabProps as RNTabProps } from "@rneui/base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export type TabProps = RNTabProps & {};

export const Tab = ({ ...props }: TabProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      style={{ marginHorizontal: -16 }}
    >
      <RNTab
        disableIndicator
        buttonStyle={styles.buttonExtraStyles}
        {...props}
      ></RNTab>
    </ScrollView>
  );
};

Tab.Item = RNTab.Item;

const styles = StyleSheet.create({
  buttonExtraStyles: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
