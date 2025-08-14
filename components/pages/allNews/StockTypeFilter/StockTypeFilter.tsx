import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { StyleSheet } from "react-native";

type StockTypeFilterProps = {};

export const StockTypeFilter = ({}: StockTypeFilterProps) => {
  return (
    <ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title} type='textLg'>
          Stock Type
        </ThemedText>
        <Button
          title='Clear'
          variant='link-gray'
          buttonStyle={styles.buttonExtra}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  buttonExtra: {
    paddingRight: 0,
  },
});
