import CloseIcon from '@/assets/icons/close-icon.svg';
import { keywordsIcons } from '@/assets/icons/keywordsIcons';
import { ThemedText } from '@/components/ThemedText';
import { useKeywordsColors } from '@/hooks/useKeywordsColors';
import { deleteKeywordFx } from '@/stores/allNews/filtersPanel/keywords/handlers';
import {
	$keywordsInputError,
	setInputKeywordError,
	startEditKeyword,
} from '@/stores/allNews/filtersPanel/keywords/model';
import { UserKeyword } from '@/types/keywords';
import { useUnit } from 'effector-react';
import { Pressable, StyleSheet } from 'react-native';

export const Keyword = ({ keyword }: { keyword: UserKeyword }) => {
	const deleteKeyword = useUnit(deleteKeywordFx);
	const onStartEditKeyword = useUnit(startEditKeyword);
	const keywordsInputError = useUnit($keywordsInputError);

	const onSetInputKeywordError = useUnit(setInputKeywordError);

	const Icon = keywordsIcons[keyword.iconKey || ''];
	const keywordsColors = useKeywordsColors();
	const bgColor = keywordsColors[keyword.color].background;
	const textColor = keywordsColors[keyword.color].text;
	const iconColor = keywordsColors[keyword.color].icon;

	return (
		<Pressable
			onPress={() => {
				onStartEditKeyword(keyword);

				if (keywordsInputError) {
					onSetInputKeywordError(null);
				}
			}}
			style={({ pressed }) => [
				styles.container,
				{ backgroundColor: bgColor },
				pressed && { transform: [{ scale: 0.97 }], opacity: 0.5 },
			]}
		>
			<Icon width={16} height={16} fill={iconColor} />

			<ThemedText type='textSm' style={{ color: textColor }}>
				{keyword.word}
			</ThemedText>
			<Pressable
				onPress={() => deleteKeyword(keyword._id)}
				hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
			>
				<CloseIcon width={16} height={16} fill={iconColor} />
			</Pressable>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});
