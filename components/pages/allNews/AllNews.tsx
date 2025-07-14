import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import Header from '@/components/ui/Header';
import { useEffect } from 'react';
import { TopNewsBlock } from './TopNewsBlock/TopNewsBlock';
import { Filters } from './Filters/Filters';
import { ListItem } from './News/News';
import { MOCK_NEWS } from '@/mocks/allNews';
import { useUnit } from 'effector-react';
import { pageMounted } from '@/stores/allNews/model';

export default function AllNews() {
	const handlePageMount = useUnit(pageMounted);

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
				data={MOCK_NEWS}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => <ListItem item={item} />}
				ListHeaderComponent={
					<>
						<TopNewsBlock />
						<Filters />
					</>
				}
				// stickyHeaderIndices={[0]}
			/>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
