import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Pressable, StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import CircleIcon from '@/assets/icons/circle-icon.svg';
import { KeywordsColorVariants } from '@/types/keywords';
import { useUnit } from 'effector-react';
import {
	$selectedColorDraft,
	changeDraftSelectedColor,
} from '@/stores/allNews/filtersPanel/keywords/selectedColor/model';
import { useKeywordsColors } from '@/hooks/useKeywordsColors';

type KeywordColorPickerProps = {
	onClose: () => void;
};

export const KeywordColorPicker = ({ onClose }: KeywordColorPickerProps) => {
	const selectedColorDraft = useUnit($selectedColorDraft);
	const onChangeSelectedColor = useUnit(changeDraftSelectedColor);

	const borderInactiveColor = useThemeColor(appTokens.border.tertiary);
	const borderActiveColor = useThemeColor(appTokens.border.brand);
	const fontColor = useThemeColor(appTokens.text.secondary);

	const keywordsColors = useKeywordsColors();

	return (
		<BottomSheetScrollView
			style={styles.wrapper}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 166 }}
		>
			<HeaderBottomSheet
				headerLabel='Color'
				onCloseFilters={() => {
					onClose();
				}}
			/>
			<ThemedView style={styles.container}>
				{Object.values(KeywordsColorVariants).map(
					(color: KeywordsColorVariants) => (
						<Pressable
							key={color}
							onPress={() => {
								onChangeSelectedColor(color);
							}}
							style={({ pressed }) => [
								styles.colorWrapper,
								selectedColorDraft === color
									? { borderColor: borderActiveColor }
									: { borderColor: borderInactiveColor },
								pressed && { transform: [{ scale: 0.97 }], opacity: 0.5 },
							]}
						>
							<ThemedView style={styles.colorContainer}>
								<CircleIcon
									width={20}
									height={20}
									fill={keywordsColors[color].icon}
								/>
								<ThemedText
									type='textSm'
									style={[styles.text, { color: fontColor }]}
								>
									{color}
								</ThemedText>
							</ThemedView>
						</Pressable>
					)
				)}
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},

	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: '4%',
		padding: 16,
	},

	colorWrapper: {
		borderWidth: 1,
		borderRadius: 12,
		width: '48%',
		paddingVertical: 12,
		paddingLeft: 12,
		paddingRight: 16,
	},

	colorContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
	},

	text: {
		fontFamily: 'MontserratSemiBold',
		fontWeight: 600,
	},
});
