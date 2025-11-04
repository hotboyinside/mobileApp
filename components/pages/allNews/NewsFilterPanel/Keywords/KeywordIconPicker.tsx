import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import { keywordsIcons } from '@/assets/icons/keywordsIcons';
import { ThemedView } from '@/components/ThemedView';
import { PREMIUM } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$selectedKeyIconDraft,
	changeSelectedKeyIconDraft,
} from '@/stores/allNews/filtersPanel/keywords/selectedIcon/model';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';

const ALLOWED_KEY_ICONS = ['like', 'bolt', 'rocket'];

const getAllowedKeyIcons = (isPremiumUser: boolean) => {
	if (isPremiumUser) {
		return Object.keys(keywordsIcons);
	}

	return ALLOWED_KEY_ICONS;
};

type KeywordIconPickerProps = {
	isPremiumUser: boolean;
	onCloseKeywordsBottomSheet: () => void;
	onClose: () => void;
};

export const KeywordIconPicker = ({
	isPremiumUser,
	onCloseKeywordsBottomSheet,
	onClose,
}: KeywordIconPickerProps) => {
	const selectedKeyIconDraft = useUnit($selectedKeyIconDraft);
	const onChangeSelectedKeyIconDraft = useUnit(changeSelectedKeyIconDraft);

	const allowedKeyIcons = getAllowedKeyIcons(isPremiumUser);
	const isKeyIconAllowed = (iconKey: string) =>
		allowedKeyIcons.includes(iconKey);

	const iconBgBrandPrimary = useThemeColor(appTokens.background.brandPrimary);
	const iconBrandPrimaryColor = useThemeColor(
		appTokens.foreground.brandPrimary
	);
	const bgColor = useThemeColor(appTokens.background.secondarySubtle);
	const iconInactiveColor = useThemeColor(
		appTokens.component.buttons.linkGray.fg
	);
	const iconActiveColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);
	const borderInactiveColor = useThemeColor(appTokens.border.tertiary);
	const borderActiveColor = useThemeColor(appTokens.border.brand);

	return (
		<BottomSheetScrollView
			style={styles.wrapper}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet headerLabel='Icon' onCloseFilters={onClose} />
			<ThemedView style={styles.container}>
				{Object.entries(keywordsIcons).map(([key, Icon]) => (
					<Pressable
						key={key}
						onPress={() => {
							if (!isKeyIconAllowed(key)) {
								onClose();
								onCloseKeywordsBottomSheet();
								router.push(PREMIUM);
								return;
							}

							onChangeSelectedKeyIconDraft(key);
						}}
						style={({ pressed }) => [
							styles.iconWrapper,
							{ backgroundColor: bgColor },
							selectedKeyIconDraft === key
								? { borderColor: borderActiveColor }
								: { borderColor: borderInactiveColor },
							pressed && { transform: [{ scale: 0.97 }], opacity: 0.5 },
						]}
					>
						<Icon
							width={24}
							height={24}
							fill={
								selectedKeyIconDraft === key
									? iconActiveColor
									: iconInactiveColor
							}
						/>
						{!isKeyIconAllowed(key) && (
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
				))}
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
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: '8',
		padding: 16,
	},

	iconWrapper: {
		position: 'relative',
		borderWidth: 1,
		borderRadius: 12,
		padding: 12,
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
});
