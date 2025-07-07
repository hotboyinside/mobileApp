import { ThemedView } from '@/components/ThemedView';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import { Button } from '@/components/ui/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MOCK_NEWS } from '@/mocks/allNews';
import ArrowIcon from '@/assets/icons/arrow-left-soft-icon.svg';
import { NewsInformation } from './NewsInformation';

const goBack = () => {
	router.back();
};

export const NewsDetails = () => {
	const { id } = useLocalSearchParams();
	const MOCK_NEWS_ITEM = MOCK_NEWS.find(news => news.id === Number(id));

	return (
		<ThemedViewWithSafeArea
			safeEdges={['top', 'right', 'bottom', 'left']}
			style={styles.wrapper}
		>
			<ThemedView style={styles.container}>
				<Button
					variant='secondary'
					onlyIcon
					icon={<ArrowIcon />}
					onPress={goBack}
					containerStyle={styles.buttonContainer}
				/>

				<NewsInformation news={MOCK_NEWS_ITEM} />

				<Button variant='secondary' title='Open full article' />
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
		paddingHorizontal: 16,
	},

	buttonContainer: {
		alignSelf: 'flex-start',
		marginVertical: 4,
	},
});
