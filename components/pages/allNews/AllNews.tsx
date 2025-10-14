import { FlatList, StyleSheet, ViewToken } from "react-native";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import Header from "@/components/ui/Header";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TopNewsBlock } from "./TopNewsBlock/TopNewsBlock";
import { ListItem } from "./News/News";
import { useUnit } from "effector-react";
import { pageMounted } from "@/stores/allNews/model";
import { NewsFilterPanel } from "./NewsFilterPanel/NewsFilterPanel";
import {
  $allNewsLoadStatus,
  $filteredNews,
  $hasMoreNews,
  getNews,
  getNewsFroSseEvent,
  NewsLoadStatus,
} from "@/stores/allNews/news/model";
import { getAllNewsKeywordsFx } from "@/stores/allNews/filtersPanel/keywords/handlers";
import {
  $sseNewsEventSource,
  addListener,
  removeListener,
  SseEvents,
} from "@/stores/sse/model";
import { getStarRatingFx } from "@/stores/starRating/handlers";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import {
  handleTopBannersGetNews,
  handleFetchedNewsFromSse,
} from "@/stores/allNews/topBannersData/handlers";
import { setDefaultStateEvent } from "@/stores/allNews/topBannersData/model";
import {
  $socketSource,
  subscribeTopBanners,
  unsubscribeTopBanners,
} from "@/stores/socket/model";
import { WindowsNames } from "@/constants/socket/clientEvents";
import { symbolsSubscribeAndUnsubscribeEvent } from "@/stores/symbols/model";
import debounce from "lodash/debounce";

const NEWS_OVERSCAN_OFFSET = 10;

const keyExtractor = (item: any) => {
  if (item.type === "news") {
    return item.id.toString();
  }
  return item.id;
};

const renderItem = ({ item }: { item: any }) => {
  switch (item.type) {
    case "filters":
      return <NewsFilterPanel />;
    case "news":
      return <ListItem item={item.item} />;
    default:
      return null;
  }
};

export default function AllNews() {
  const [isShowBottomHeader, setIsShowBottomHeader] = useState(false);
  const allNews = useUnit($filteredNews);
  const allNewsLoadStatus = useUnit($allNewsLoadStatus);
  const hasMoreNews = useUnit($hasMoreNews);
  const socketSource = useUnit($socketSource);
  const sseNewsEventSource = useUnit($sseNewsEventSource);
  const isLoading = allNewsLoadStatus === NewsLoadStatus.Loading;
  const onPageMounted = useUnit(pageMounted);
  const onSubscribeTopBanners = useUnit(subscribeTopBanners);
  const onUnsubscribeTopBanners = useUnit(unsubscribeTopBanners);

  const currentRows = useRef<{ start: number; end: number } | null>(null);

  const handleScroll = useCallback((offsetY: number) => {
    setIsShowBottomHeader(offsetY > 0);
  }, []);

  const subscribeToTickersOnScreen = useCallback(
    (start: number, end: number) => {
      console.log("happend", start);
      const symbolsToSubscribe: string[] = [];

      for (let i = start; i <= end; i++) {
        const news = allNews[i];
        if (!news) continue;

        if (news.symbols?.length) {
          symbolsToSubscribe.push(
            ...news.symbols.map((sym: any) => sym.symbol)
          );
        }
      }

      if (symbolsToSubscribe.length) {
        symbolsSubscribeAndUnsubscribeEvent({
          symbolsToSubscribe,
          windowName: WindowsNames.MainWindow,
        });
      }
    },
    [allNews]
  );

  const onViewableItemsChanged = useMemo(
    () =>
      debounce(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const firstIndex = viewableItems[0]?.index ?? 0;
        const lastIndex = viewableItems[viewableItems.length - 1]?.index ?? 0;

        const overscanStart = Math.max(0, firstIndex - NEWS_OVERSCAN_OFFSET);
        const overscanEnd = Math.min(
          allNews.length - 1,
          lastIndex + NEWS_OVERSCAN_OFFSET
        );

        subscribeToTickersOnScreen(overscanStart, overscanEnd);

        currentRows.current = { start: overscanStart, end: overscanEnd };
      }, 300),
    [allNews, subscribeToTickersOnScreen]
  );

  const combinedData = useMemo(() => {
    return [
      { id: "filters", type: "filters" },
      ...allNews.map(item => ({
        id: item._id,
        type: "news",
        item,
      })),
    ];
  }, [allNews]);

  const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

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

    onSubscribeTopBanners();

    return () => {
      setDefaultStateEvent();
      onUnsubscribeTopBanners();
    };
  }, [onSubscribeTopBanners, onUnsubscribeTopBanners, socketSource]);

  useEffect(() => {
    onPageMounted();
  }, [onPageMounted]);

  useEffect(() => {
    getStarRatingFx();
    getAllNewsKeywordsFx();
    getNews({ isInitialNews: true });
  }, []);

  useEffect(() => {
    addListener({ eventName: SseEvents.News, listener: getNewsFroSseEvent });

    return () => {
      removeListener({
        eventName: SseEvents.News,
        listener: getNewsFroSseEvent,
      });
    };
  }, []);

  return (
    <ThemedViewWithSafeArea
      style={[styles.container, { backgroundColor: backgroundColor }]}
      safeEdges={["right", "left"]}
    >
      <Header title='All News' isShowBottomBorder={isShowBottomHeader} />
      <FlatList
        data={combinedData}
        ListHeaderComponent={<TopNewsBlock />}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        onEndReached={() => {
          if (hasMoreNews && !isLoading) {
            getNews({ isInitialNews: false });
          }
        }}
        onEndReachedThreshold={0.5}
        onScroll={event => handleScroll(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </ThemedViewWithSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
