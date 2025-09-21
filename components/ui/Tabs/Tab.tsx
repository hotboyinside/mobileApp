import { Tab as RNTab, TabProps as RNTabProps } from '@rneui/base';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TabItem } from './TabItem/TabItem';

type tabElement =
	| string
	| ReactElement<object, string | JSXElementConstructor<any>>
	| undefined;

export type TabProps = RNTabProps & {
	tabsTitles: tabElement[];
	isScroll?: boolean;
	scrollStyles?: StyleProp<ViewStyle>;
};

export const Tab = ({
	tabsTitles,
	scrollStyles,
	isScroll = false,
	...props
}: TabProps) => {
	return (
		<>
			{isScroll && (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					style={[scrollStyles]}
				>
					<RNTab
						{...props}
						scrollable={false}
						disableIndicator
						buttonStyle={styles.buttonExtraStyles}
					>
						{tabsTitles.map((tabTitle, index) => (
							<TabItem key={index} title={tabTitle} />
						))}
					</RNTab>
				</ScrollView>
			)}

			{!isScroll && (
				<RNTab
					{...props}
					disableIndicator
					buttonStyle={styles.buttonExtraStyles}
				>
					{tabsTitles.map((tabTitle, index) => (
						<TabItem key={index} title={tabTitle} />
					))}
				</RNTab>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	contentContainerStyle: { paddingHorizontal: 16 },

	buttonExtraStyles: {
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
});
