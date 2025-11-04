import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import CircleIcon from '@/assets/icons/circle-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PREMIUM } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { useKeywordsColors } from '@/hooks/useKeywordsColors';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$selectedColorDraft,
	changeDraftSelectedColor,
} from '@/stores/allNews/filtersPanel/keywords/selectedColor/model';
import { KeywordsColorVariants } from '@/types/keywords';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';

type KeywordColorPickerProps = {
	isPremiumUser: boolean;
	onCloseKeywordsBottomSheet: () => void;
	onClose: () => void;
};

const ALLOWED_KEY_COLORS = ['Red', 'Blue', 'Green'];

const getAllowedKeyColors = (isPremiumUser: boolean) => {
	if (isPremiumUser) {
		return Object.values(KeywordsColorVariants);
	}

	return ALLOWED_KEY_COLORS;
};

export const KeywordColorPicker = ({
	isPremiumUser,
	onCloseKeywordsBottomSheet,
	onClose,
}: KeywordColorPickerProps) => {
	const selectedColorDraft = useUnit($selectedColorDraft);
	const onChangeSelectedColor = useUnit(changeDraftSelectedColor);

	const allowedKeyColors = getAllowedKeyColors(isPremiumUser);
	const isKeyColorAllowed = (iconKey: string) =>
		allowedKeyColors.includes(iconKey);

	const iconBgBrandPrimary = useThemeColor(appTokens.background.brandPrimary);
	const iconBrandPrimaryColor = useThemeColor(
		appTokens.foreground.brandPrimary
	);
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
								if (!isKeyColorAllowed(color)) {
									onClose();
									onCloseKeywordsBottomSheet();
									router.push(PREMIUM);
									return;
								}

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
							{!isKeyColorAllowed(color) && (
								<ThemedView
									style={[
										styles.closedIcon,
										{ backgroundColor: iconBgBrandPrimary },
									]}
								>
									<BoltDuoIcon
										width={12}
										height={12}
										fill={iconBrandPrimaryColor}
									/>
								</ThemedView>
							)}
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
		position: 'relative',
		borderWidth: 1,
		borderRadius: 12,
		width: '48%',
		paddingVertical: 12,
		paddingLeft: 12,
		paddingRight: 16,
	},

	closedIcon: {
		position: 'absolute',
		top: -5,
		right: -5,
		width: 24,
		height: 24,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
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
