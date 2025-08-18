import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MultiSelectTabs } from '@/components/ui/MultiSelectTabs/MultiSelectTabs';
import {
	$newsTypeDraft,
	changeNewsTypeDraft,
	NewsTypesNames,
	getNewsTypeLabel,
} from '@/stores/allNews/filtersPanel/filters/newsType/model';

import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const NewsTypeFilter = () => {
	const newsTypeDraft = useUnit($newsTypeDraft);
	const changeNewsTypeDraftFx = useUnit(changeNewsTypeDraft);

	return (
		<ThemedView>
			<ThemedText style={styles.title} type='textLg'>
				News type
			</ThemedText>

			<MultiSelectTabs<NewsTypesNames>
				tabsTitles={Object.values(NewsTypesNames)}
				selectedValues={newsTypeDraft}
				onSelectionChange={changeNewsTypeDraftFx}
				getLabel={getNewsTypeLabel}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	title: {
		marginBottom: 8,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},
});
