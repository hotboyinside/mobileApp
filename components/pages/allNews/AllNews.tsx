import { FlatList, StyleSheet } from 'react-native';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import Header from '@/components/ui/Header';
import { useEffect, useMemo, useRef } from 'react';
import { TopNewsBlock } from './TopNewsBlock/TopNewsBlock';
import { ListItem } from './News/News';
import { useUnit } from 'effector-react';
import { pageMounted } from '@/stores/allNews/model';
import { NewsFilterPanel } from './NewsFilterPanel/NewsFilterPanel';
import { fetchNewsFx, loadMoreNewsFx } from '@/stores/allNews/news/handlers';
import {
	$allNewsLoadStatus,
	$filteredNews,
	$lastAllNewsNewsDate,
	addNewsFromSseEvent,
	NewsLoadStatus,
} from '@/stores/allNews/news/model';
import { getAllNewsKeywordsFx } from '@/stores/allNews/filtersPanel/keywords/handlers';
import { addListener, removeListener, SseEvents } from '@/stores/sse/model';
import { getStarRatingFx } from '@/stores/starRating/handlers';

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

const keyExtractor = (item: any, index: number) => {
	if (item.type === 'news') {
		return item.id.toString() + index;
	}
	return item.id;
};

export default function AllNews() {
	const handlePageMount = useUnit(pageMounted);
	const allNews = useUnit($filteredNews);
	const allNewsLoadStatus = useUnit($allNewsLoadStatus);
	const lastAllNewsNewsDate = useUnit($lastAllNewsNewsDate);
	const isLoading = allNewsLoadStatus === NewsLoadStatus.Loading;

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

	useEffect(() => {
		handlePageMount();
	}, [handlePageMount]);

	useEffect(() => {
		getStarRatingFx();
		getAllNewsKeywordsFx();
		fetchNewsFx({
			start: new Date().getTime(),
		});
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
			style={styles.container}
			safeEdges={['right', 'left']}
		>
			<Header />
			<FlatList
				data={combinedData}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				stickyHeaderIndices={[1]}
				onEndReached={() => loadMoreNewsFx({ start: lastAllNewsNewsDate! })}
				onEndReachedThreshold={0.5}
				// onViewableItemsChanged={onViewableItemsChanged.current}
			/>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
