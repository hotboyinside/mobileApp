import { Tab } from '@/components/ui/Tab/Tab';
import SortIcon from '@/assets/icons/sort-icon.svg';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SortList } from './SortList';
import { Filters } from './Filters/Filters';

export const NewsFilterPanel = () => {
	const [activeFilter, setActiveFilter] = useState<
		null | 'sort' | 'filters' | 'keywords' | 'rating'
	>(null);
	const closeDialog = () => setActiveFilter(null);

	const handleTabChange = (index: number) => {
		switch (index) {
			case 0:
				setActiveFilter('sort');
				break;
			case 1:
				setActiveFilter('filters');
				break;
			case 2:
				setActiveFilter('keywords');
				break;
			case 3:
				setActiveFilter('rating');
				break;
			default:
				break;
		}
	};

	return (
		<>
			<Tab
				value={-1}
				onChange={handleTabChange}
				tabsTitles={[
					<SortIcon key={'sort'} />,
					'FIlters',
					'Keywords',
					'Rating',
				]}
				style={styles.tabContainer}
			/>

			{activeFilter === 'sort' && <SortList isVisible onClose={closeDialog} />}
			{activeFilter === 'filters' && (
				<Filters isVisible onCloseFilters={closeDialog} />
			)}
			{activeFilter === 'keywords' && (
				<SortList isVisible onClose={closeDialog} />
			)}
			{activeFilter === 'rating' && (
				<SortList isVisible onClose={closeDialog} />
			)}
		</>
	);
};

const styles = StyleSheet.create({
	tabContainer: {
		marginHorizontal: 16,
		marginBottom: 4,
	},
});
