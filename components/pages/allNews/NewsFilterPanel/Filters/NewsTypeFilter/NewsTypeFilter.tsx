import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MultiSelectTabs } from "@/components/ui/MultiSelectTabs/MultiSelectTabs";
import {
  $newsTypeDraft,
  changeNewsTypeDraft,
  NewsTypesLabels,
} from "@/stores/allNews/filters/newsType/model";
import { useUnit } from "effector-react";
import { StyleSheet } from "react-native";

type NewsTypeFilterProps = {};

export const NewsTypeFilter = ({}: NewsTypeFilterProps) => {
  const newsTypeDraft = useUnit($newsTypeDraft);
  const changeNewsTypeDraftFx = useUnit(changeNewsTypeDraft);

  return (
    <ThemedView>
      <ThemedText style={styles.title} type='textLg'>
        News type
      </ThemedText>

      <MultiSelectTabs<NewsTypesLabels>
        tabsTitles={Object.values(NewsTypesLabels)}
        selectedValues={newsTypeDraft}
        onSelectionChange={changeNewsTypeDraftFx}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },
});
