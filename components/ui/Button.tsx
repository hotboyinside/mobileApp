// components/MyButton.tsx
import { ButtonProps, Button as RNButton } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

export const Button = (props: ButtonProps) => {
  return <RNButton {...props} buttonStyle={styles.extraButton} />;
};

const styles = StyleSheet.create({
  extraButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    fontFamily: "MontserratRegular",
  },
});
