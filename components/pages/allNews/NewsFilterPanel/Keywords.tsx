import { ThemedView } from "@/components/ThemedView";
import { BottomSheet } from "@rneui/base";
import { StyleSheet } from "react-native";

type KeywordsProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const Keywords = ({ isVisible, onClose }: KeywordsProps) => {
  return (
    <BottomSheet
      modalProps={{
        animationType: "slide",
        presentationStyle: "overFullScreen",
        transparent: true,
      }}
      isVisible={isVisible}
    >
      <ThemedView style={styles.container}></ThemedView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
