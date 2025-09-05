import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { $onlyVisualKeywords } from '@/stores/allNews/filtersPanel/keywords/model';
import { useUnit } from 'effector-react';
import { Keyword } from './Keyword';

export const VisualOnlyKeywords = () => {
	const onlyVisualKeywords = useUnit($onlyVisualKeywords);

	return (
		<ThemedView>
			<ThemedText type='textLg' style={styles.title}>
				Visual only
			</ThemedText>

			<ThemedView style={styles.keywords}>
				{onlyVisualKeywords.map(keyword => (
					<Keyword key={keyword._id} keyword={keyword} />
				))}
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	keywords: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 4,
		marginTop: 8,
	},
});
