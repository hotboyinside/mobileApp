import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import Header from '@/components/ui/Header';
import { useEffect, useMemo, useState } from 'react';
import { TopNewsBlock } from './TopNewsBlock/TopNewsBlock';
import { ListItem, MockItem } from './News/News';
import { MOCK_NEWS } from '@/mocks/allNews';
import { useUnit } from 'effector-react';
import { pageMounted } from '@/stores/allNews/model';
import { NewsFilterPanel } from './NewsFilterPanel/NewsFilterPanel';

const renderItem = ({ item }: { item: any }) => {
	switch (item.type) {
		case 'topNews':
			return <TopNewsBlock />;
		case 'filters':
			return (
				<View style={{ backgroundColor: 'white' }}>
					<NewsFilterPanel />
				</View>
			);
		case 'news':
			return <ListItem item={item.item} />;
		default:
			return null;
	}
};

const keyExtractor = (item: any, index: number) => {
	if (item.type === 'news') {
		return item.item.id.toString();
	}
	return item.id;
};

export default function AllNews() {
	const handlePageMount = useUnit(pageMounted);

	const [news, setNews] = useState<MockItem[]>(MOCK_NEWS);

	const combinedData = useMemo(() => {
		return [
			{ id: 'topNews', type: 'topNews' },
			{ id: 'filters', type: 'filters' },
			...news.map(item => ({
				id: item.id,
				type: 'news',
				item,
			})),
		];
	}, [news]);

	useEffect(() => {
		handlePageMount();
	}, [handlePageMount]);

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
