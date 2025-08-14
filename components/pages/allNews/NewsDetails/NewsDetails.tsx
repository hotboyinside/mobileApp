import { ThemedView } from "@/components/ThemedView";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import { Button } from "@/components/ui/Button";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { MOCK_NEWS } from "@/mocks/allNews";
import ArrowIcon from "@/assets/icons/arrow-left-soft-icon.svg";
import { NewsInformation } from "./NewsInformation";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";

const goBack = () => {
  router.back();
};

export const NewsDetails = () => {
  const { id } = useLocalSearchParams();
  const MOCK_NEWS_ITEM = MOCK_NEWS.find(news => news.id === Number(id));

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
          icon={<ArrowIcon color={backButtonColor} />}
          onPress={goBack}
          containerStyle={styles.buttonContainer}
        />

        <NewsInformation news={MOCK_NEWS_ITEM} />
      </ThemedView>

      <Button
        variant='secondary'
        size='lg'
        title='Open full article'
        containerStyle={[{ borderColor }, styles.buttonOpenArticle]}
      />
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

  buttonContainer: {
    alignSelf: "flex-start",
    marginVertical: 4,
    paddingHorizontal: 16,
  },

  buttonOpenArticle: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
});
