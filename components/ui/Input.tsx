import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { InputProps, Input as RNInput } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

export const Input = (props: InputProps) => {
  const labelColor = useThemeColor({}, appTokens.text.secondary);

  return (
    <RNInput
      {...props}
      containerStyle={styles.containerExtra}
      inputContainerStyle={styles.inputContainerExtra}
      labelStyle={[{ color: labelColor }, styles.labelExtra]}
      inputStyle={styles.inputExtra}
    />
  );
};

const styles = StyleSheet.create({
  labelExtra: {
    marginBottom: 6,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "MontserratRegular",
  },

  containerExtra: {
    paddingHorizontal: 0,
  },

  inputContainerExtra: {
    borderWidth: 1,
    borderColor: appTokens.border.tertiary.light,
    backgroundColor: appTokens.background.secondary.light,
    borderRadius: 12,
  },

  inputExtra: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 0,
    borderRadius: 12,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "MontserratRegular",
  },
});
