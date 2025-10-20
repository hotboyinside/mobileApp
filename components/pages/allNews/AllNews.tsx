import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import Header from '@/components/ui/Header';
import Loader from '@/components/ui/Loader/Loader';
import { WindowsNames } from '@/constants/socket/clientEvents';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { pageMounted } from '@/stores/allNews/model';
import {
	$allNewsLoadStatus,
	$filteredNews,
	$hasMoreNews,
	getNews,
	getNewsFroSseEvent,
	NewsLoadStatus,
} from '@/stores/allNews/news/model';
import {
	handleFetchedNewsFromSse,
	handleTopBannersGetNews,
} from '@/stores/allNews/topBannersData/handlers';
import { setDefaultStateEvent } from '@/stores/allNews/topBannersData/model';
import {
	$socketSource,
	subscribeTopBanners,
	unsubscribeTopBanners,
} from '@/stores/socket/model';
import {
	$sseNewsEventSource,
	addListener,
	removeListener,
	SseEvents,
} from '@/stores/sse/model';
import { symbolsSubscribeAndUnsubscribeEvent } from '@/stores/symbols/model';
import { useUnit } from 'effector-react';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, ViewToken } from 'react-native';
import { ListItem } from './News/News';
import { NewsFilterPanel } from './NewsFilterPanel/NewsFilterPanel';
import { TopNewsBlock } from './TopNewsBlock/TopNewsBlock';

const NEWS_OVERSCAN_OFFSET = 10;

const keyExtractor = (item: any) => {
	if (item.type === 'news') {
		return item.id.toString();
	}
	return item.id;
};

const renderItem = ({ item }: { item: any }) => {
	switch (item.type) {
		case 'filters':
			return <NewsFilterPanel />;
		case 'news':
			return <ListItem item={item.item} />;
		default:
			return null;
	}
};

export default function AllNews() {
	const [isRefreshing, setIsRefreshing] = useState(false);
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

	const handleScroll = useCallback((offsetY: number) => {
		setIsShowBottomHeader(offsetY > 0);
	}, []);

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true);
		try {
			onPageMounted();
		} finally {
			setIsRefreshing(false);
		}
	}, []);

	const subscribeToTickersOnScreen = useCallback(
		(start: number, end: number) => {
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

	const handleLoadMore = useMemo(
		() =>
			debounce(() => {
				if (hasMoreNews && !isLoading) {
					getNews({ isInitialNews: false });
				}
			}, 500),
		[hasMoreNews, isLoading]
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
			}, 300),
		[allNews, subscribeToTickersOnScreen]
	);

	const combinedData = useMemo(() => {
		return [
			{ id: 'filters', type: 'filters' },
			...allNews.map(item => ({
				id: item._id,
				type: 'news',
				item,
			})),
		];
	}, [allNews]);

	const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

	useEffect(() => {
		onPageMounted();
	}, [onPageMounted]);

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
			safeEdges={['right', 'left']}
		>
			<Header title='All News' isShowBottomBorder={isShowBottomHeader} />

			<FlatList
				data={combinedData}
				ListHeaderComponent={<TopNewsBlock />}
				ListFooterComponent={() => (isLoading ? <Loader /> : null)}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				stickyHeaderIndices={[1]}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				onScroll={event => handleScroll(event.nativeEvent.contentOffset.y)}
				scrollEventThrottle={16}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 50,
				}}
				refreshing={isRefreshing}
				onRefresh={handleRefresh}
			/>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
