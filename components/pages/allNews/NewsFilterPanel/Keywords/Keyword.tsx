import { keywordsIcons } from '@/assets/icons/keywordsIcons';
import { ThemedText } from '@/components/ThemedText';
import { keywordsColors, UserKeyword } from '@/types/keywords';
import { Pressable, StyleSheet } from 'react-native';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { deleteKeyword } from '@/stores/allNews/filtersPanel/keywords/model';
import { useUnit } from 'effector-react';

export const Keyword = ({ keyword }: { keyword: UserKeyword }) => {
	const onDeleteKeyword = useUnit(deleteKeyword);

	const Icon = keywordsIcons[keyword.iconKey || ''];
	const bgColor = keywordsColors[keyword.color].background;
	const textColor = keywordsColors[keyword.color].text;
	const iconColor = keywordsColors[keyword.color].icon;

	return (
		<Pressable
			onPress={() => {}}
			style={({ pressed }) => [
				styles.container,
				{ backgroundColor: bgColor },
				pressed && { transform: [{ scale: 0.97 }], opacity: 0.5 },
			]}
		>
			<Icon width={16} height={16} fill={iconColor} />

			<ThemedText type='textSm' style={{ color: textColor }}>
				{keyword.text}
			</ThemedText>
			<CloseIcon
				width={16}
				height={16}
				fill={iconColor}
				onPress={() => onDeleteKeyword(keyword._id)}
			/>
		</Pressable>
	);
};

{
	/* <Badge
	key={keyword.text}
	value={keyword.text}
	variant='keywords'
	size='xl'
	iconLeft={<Icon width={20} height={20} />}
	iconRight={
		<CloseIcon
			width={16}
			height={16}
			fill={'white'}
			onPress={() => onDeleteKeyword(keyword._id)}
		/>
	}
	gapBetweenTitleAndIcon={2}
	badgeStyle={{ backgroundColor: keywordsColors[keyword.color] }}
	textStyle={{ color: 'white' }}
/>; */
}

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
