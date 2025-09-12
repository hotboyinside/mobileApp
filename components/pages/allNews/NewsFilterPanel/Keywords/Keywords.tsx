import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import { KeywordCreator } from './KeywordCreator';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { VisualOnlyKeywords } from './VisualOnlyKeywords';
import { WithVoiceOverKeywords } from './WithVoiceOverKeywords';

type KeywordsProps = {
	onClose: () => void;
};

export const Keywords = ({ onClose }: KeywordsProps) => {
	return (
		<BottomSheetScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet headerLabel='Keywords' onCloseFilters={onClose} />
			<ThemedView style={styles.container}>
				<KeywordCreator />
				<VisualOnlyKeywords />
				<WithVoiceOverKeywords />
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 24,
		padding: 16,
		paddingBottom: 240,
	},
});
