import { keywordsIcons } from '@/assets/icons/keywordsIcons';
import { ThemedText } from '@/components/ThemedText';
import { keywordsColors, UserKeyword } from '@/types/keywords';
import { Pressable, StyleSheet } from 'react-native';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { useUnit } from 'effector-react';
import { deleteKeywordFx } from '@/stores/allNews/filtersPanel/keywords/handlers';
import { editKeyword } from '@/stores/allNews/filtersPanel/keywords/model';

export const Keyword = ({ keyword }: { keyword: UserKeyword }) => {
	const deleteKeyword = useUnit(deleteKeywordFx);
	const onEditKeyword = useUnit(editKeyword);

	const Icon = keywordsIcons[keyword.iconKey || ''];
	const bgColor = keywordsColors[keyword.color].background;
	const textColor = keywordsColors[keyword.color].text;
	const iconColor = keywordsColors[keyword.color].icon;

	return (
		<Pressable
			onPress={() => {
				onEditKeyword(keyword);
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
			<CloseIcon
				width={16}
				height={16}
				fill={iconColor}
				onPress={() => deleteKeyword(keyword._id)}
			/>
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
