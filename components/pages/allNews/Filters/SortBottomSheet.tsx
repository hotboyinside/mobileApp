import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import { BottomSheet } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CloseIcon from "@/assets/icons/close.svg";
import RestartIcon from "@/assets/icons/restart-icon.svg";
import { ThemedText } from "@/components/ThemedText";

const FILTERS = [
  "Newest First",
  "Highest Rating",
  "Biggest % Gain (Price Up)",
  "Biggest % Drop (Price Down)",
  "Biggest Volume",
  "Smallest",
  "Biggest Float",
  "Smallest Float",
];

type SortBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const SortBottomSheet = ({
  isVisible,
  onClose,
}: SortBottomSheetProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <BottomSheet
      modalProps={{
        animationType: "fade",
        presentationStyle: "overFullScreen",
        transparent: true,
      }}
      isVisible={isVisible}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Button
            style={styles.button}
            variant='secondary'
            onlyIcon
            icon={<RestartIcon />}
          />
          <ThemedText type='displayXs' style={styles.title}>
            Sort by
          </ThemedText>
          <Button
            style={styles.button}
            variant='secondary'
            onlyIcon
            icon={<CloseIcon />}
            onPress={onClose}
          />
        </View>

        <View style={styles.list}>
          {FILTERS.map((filter, index) => (
            <Checkbox
              key={filter}
              checked={index === selectedIndex}
              title={filter}
              onPress={() => setSelectedIndex(index)}
            />
          ))}
        </View>
        <Button variant='primary' size='lg' title='Apply' onPress={onClose} />
      </ThemedView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
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
