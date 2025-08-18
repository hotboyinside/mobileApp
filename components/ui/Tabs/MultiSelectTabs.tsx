import { TabProps as RNTabProps } from '@rneui/base';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { TabItem } from './TabItem/TabItem';

export type MultiSelectTabsProps<T> = RNTabProps & {
	tabsTitles: T[];
	selectedValues: T[];
	getLabel: (
		value: T
	) => string | ReactElement<{}, string | JSXElementConstructor<any>>;
	onSelectionChange: (value: T) => void;
	isScroll?: boolean;
	extraStyle?: StyleProp<ViewStyle>;
	scrollStyles?: StyleProp<ViewStyle>;
};

export const MultiSelectTabs = <T extends string>({
	tabsTitles,
	selectedValues,
	getLabel,
	onSelectionChange,
	scrollStyles,
	extraStyle,
	isScroll = false,
}: MultiSelectTabsProps<T>) => {
	return (
		<>
			{isScroll && (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={[styles.contentContainerStyle, extraStyle]}
					style={[scrollStyles]}
				>
					{tabsTitles.map((tabTitle, index) => (
						<TabItem
							key={index}
							title={getLabel(tabTitle)}
							active={selectedValues.includes(tabTitle)}
							onPress={() => onSelectionChange(tabTitle)}
						/>
					))}
				</ScrollView>
			)}

			{!isScroll && (
				<ThemedView style={[styles.container, extraStyle]}>
					{tabsTitles.map((tabTitle, index) => (
						<TabItem
							key={index}
							title={getLabel(tabTitle)}
							active={selectedValues.includes(tabTitle)}
							onPress={() => onSelectionChange(tabTitle)}
						/>
					))}
				</ThemedView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	contentContainerStyle: { paddingHorizontal: 16 },

	buttonExtraStyles: {
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
});
