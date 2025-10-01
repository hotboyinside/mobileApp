import { FlatList, StyleSheet, ViewToken } from 'react-native';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import Header from '@/components/ui/Header';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TopNewsBlock } from './TopNewsBlock/TopNewsBlock';
import { ListItem } from './News/News';
import { useUnit } from 'effector-react';
import { pageMounted } from '@/stores/allNews/model';
import { NewsFilterPanel } from './NewsFilterPanel/NewsFilterPanel';
import {
	$allNewsLoadStatus,
	$filteredNews,
	$hasMoreNews,
	addNewsFromSseEvent,
	getNews,
	NewsLoadStatus,
} from '@/stores/allNews/news/model';
import { getAllNewsKeywordsFx } from '@/stores/allNews/filtersPanel/keywords/handlers';
import {
	$sseNewsEventSource,
	addListener,
	removeListener,
	SseEvents,
} from '@/stores/sse/model';
import { getStarRatingFx } from '@/stores/starRating/handlers';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import {
	handleTopBannersGetNews,
	handleFetchedNewsFromSse,
} from '@/stores/allNews/topBannersData/handlers';
import { setDefaultStateEvent } from '@/stores/allNews/topBannersData/model';
import {
	$socketSource,
	subscribeTopBanners,
	unsubscribeTopBanners,
} from '@/stores/socket/model';
import { WindowsNames } from '@/constants/socket/clientEvents';
import { symbolsSubscribeAndUnsubscribeEvent } from '@/stores/symbols/model';

const NEWS_OVERSCAN_OFFSET = 10;

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

	const keyExtractor = useCallback((item: any, index: number) => {
		if (item.type === 'news') {
			return item.id.toString() + index;
		}
		return item.id ?? index;
	}, []);

	const renderItem = ({ item }: { item: any }) => {
		switch (item.type) {
			case 'topNews':
				return <TopNewsBlock />;
			case 'filters':
				return <NewsFilterPanel />;
			case 'news':
				return <ListItem item={item.item} />;
			default:
				return null;
		}
	};

	const handleScroll = useCallback((offsetY: number) => {
		setIsShowBottomHeader(offsetY > 0);
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

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			const firstIndex = viewableItems[0]?.index ?? 0;
			const lastIndex = viewableItems[viewableItems.length - 1]?.index ?? 0;

			const adjustedFirst = Math.max(0, firstIndex - 2);
			const adjustedLast = Math.max(0, lastIndex - 2);

			const overscanStart = Math.max(0, adjustedFirst - NEWS_OVERSCAN_OFFSET);
			const overscanEnd = Math.min(
				allNews.length - 1,
				adjustedLast + NEWS_OVERSCAN_OFFSET
			);

			if (
				currentRows.current &&
				currentRows.current.start <= overscanStart &&
				currentRows.current.end >= overscanEnd
			) {
				return;
			}

			subscribeToTickersOnScreen(overscanStart, overscanEnd);

			currentRows.current = { start: overscanStart, end: overscanEnd };
		},
		[allNews, subscribeToTickersOnScreen]
	);

	const combinedData = useMemo(() => {
		return [
			{ id: 'topNews', type: 'topNews' },
			{ id: 'filters', type: 'filters' },
			...allNews.map(item => ({
				id: item._id,
				type: 'news',
				item,
			})),
		];
	}, [allNews]);

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
		addListener({ eventName: SseEvents.News, listener: addNewsFromSseEvent });

		return () => {
			removeListener({
				eventName: SseEvents.News,
				listener: addNewsFromSseEvent,
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
