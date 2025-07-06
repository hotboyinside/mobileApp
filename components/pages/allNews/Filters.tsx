import { Tab } from '@/components/ui/Tab/Tab';
import SortIcon from '@/assets/icons/sort-icon.svg';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export const Filters = () => {
	const [index, setIndex] = useState(0);
	return (
		<Tab
			value={index}
			onChange={e => setIndex(e)}
			tabsTitles={[<SortIcon key={'sort'} />, 'FIlters', 'Keywords', 'Rating']}
			style={styles.tabContainer}
		/>
	);
};

const styles = StyleSheet.create({
	tabContainer: {
		marginHorizontal: 16,
		marginBottom: 4,
	},
});
