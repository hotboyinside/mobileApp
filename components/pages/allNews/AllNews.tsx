import { FlatList, StyleSheet } from 'react-native';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import Header from '@/components/ui/Header';
import { useEffect, useMemo } from 'react';
import { TopNewsBlock } from './TopNewsBlock/TopNewsBlock';
import { ListItem } from './News/News';
import { useUnit } from 'effector-react';
import { pageMounted } from '@/stores/allNews/model';
import { NewsFilterPanel } from './NewsFilterPanel/NewsFilterPanel';
import { fetchNewsFx } from '@/stores/allNews/news/handlers';
import {
	$filteredNews,
	$lastAllNewsDocDateStore,
} from '@/stores/allNews/news/model';
import { getAllNewsKeywordsFx } from '@/stores/allNews/filtersPanel/keywords/handlers';

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
		return item.id.toString();
	}
	return item.id;
};

export default function AllNews() {
	const handlePageMount = useUnit(pageMounted);

	const lastDateOfNews = useUnit($lastAllNewsDocDateStore);
	const allNews = useUnit($filteredNews);

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
		getAllNewsKeywordsFx();
		fetchNewsFx({
			start: lastDateOfNews,
		});
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
			/>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
