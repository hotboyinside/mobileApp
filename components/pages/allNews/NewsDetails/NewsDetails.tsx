import { ThemedView } from "@/components/ThemedView";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import { Button } from "@/components/ui/Button";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import ArrowIcon from "@/assets/icons/arrow-left-soft-icon.svg";
import { NewsInformation } from "./NewsInformation";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUnit } from "effector-react";
import { $filteredNews } from "@/stores/allNews/news/model";

const goBack = () => {
  router.back();
};

export const NewsDetails = () => {
  const { id } = useLocalSearchParams();
  const allNews = useUnit($filteredNews);
  const news = allNews.find(news => news._id === id);

  const backButtonColor = useThemeColor(
    {},
    appTokens.component.buttons.secondaryGray.fg
  );
  const borderColor = useThemeColor({}, appTokens.border.tertiary);

  return (
    <ThemedViewWithSafeArea
      safeEdges={["top", "right", "bottom", "left"]}
      style={styles.wrapper}
    >
      <ThemedView style={styles.container}>
        <Button
          variant='secondary'
          onlyIcon
          icon={<ArrowIcon width={20} height={20} fill={backButtonColor} />}
          onPress={goBack}
          containerStyle={styles.buttonContainerExtra}
        />

        {news && <NewsInformation news={news} />}
      </ThemedView>

      <ThemedView style={[styles.buttonWrapper, { borderColor: borderColor }]}>
        <Button variant='secondary' size='lg' title='Open full article' />
      </ThemedView>
    </ThemedViewWithSafeArea>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  buttonContainerExtra: {
    alignSelf: "flex-start",
    marginVertical: 4,
    marginHorizontal: 16,
    overflow: "hidden",
  },

  buttonWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});
