import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import { ThemedText } from "@/components/ThemedText";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  handleTopBannersGetNews,
  handleFetchedNewsFromSse,
} from "@/stores/allNews/topBannersData/handlers";
import {
  $sseNewsEventSource,
  addListener,
  removeListener,
  SseEvents,
} from "@/stores/sse/model";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import {
  setDefaultStateEvent,
} from "@/stores/allNews/topBannersData/model";
import {
  $socketSource,
  subscribeTopBanners,
  unsubscribeTopBanners,
} from "@/stores/socket/model";

export const TopNewsBlock = () => {
  const socketSource = useUnit($socketSource);
  const sseNewsEventSource = useUnit($sseNewsEventSource);

  const backgroundColor = useThemeColor(
    {},
    appTokens.background.secondarySubtle
  );

  useEffect(() => {
    handleTopBannersGetNews();

    addListener({
      eventName: SseEvents.News,
      listener: handleFetchedNewsFromSse,
    });
    return () => {
      removeListener({
        eventName: SseEvents.News,
        listener: handleFetchedNewsFromSse,
      });
    };
  }, [sseNewsEventSource]);

  useEffect(() => {
    if (!socketSource) {
      return;
    }

    subscribeTopBanners();

    return () => {
      setDefaultStateEvent();
      unsubscribeTopBanners();
    };
  }, [socketSource]);

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <TopGainers />
      <TopLosers />
      <ThemedText type='textLg' style={styles.title}>
        Feed
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingTop: 24,
  },

  title: {
    marginHorizontal: 16,
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },
});
