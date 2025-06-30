import { Tab as RNTab, TabProps as RNTabProps } from "@rneui/base";
import React from "react";
import { StyleSheet } from "react-native";

export type TabProps = RNTabProps & {};

export const Tab = ({ ...props }: TabProps) => {
  return <RNTab buttonStyle={styles.buttonExtraStyles} containerStyle={styles.containerExtraStyles} {...props}></RNTab>;
};

Tab.Item = RNTab.Item;

const styles = StyleSheet.create({
  buttonExtraStyles: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  containerExtraStyles: {
    // flex: 0,
    paddingVertical: 6,
    // flexShrink: 1,
    paddingHorizontal: 12,
    // alignItems: 'center',
    justifyContent: 'center'
  },
})
