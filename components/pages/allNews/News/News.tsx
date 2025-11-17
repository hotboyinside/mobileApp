import { ThemedText } from '@/components/ThemedText';
import { Badge } from '@/components/ui/Badge/Badge';
import { Stars } from '@/components/ui/Stars';
import { NEWS_DETAILS } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { formatNewsTime } from '@/helpers/time/formatNewsTime';
import { useThemeColor } from '@/hooks/useThemeColor';
import { $now } from '@/stores/allNews/globalTick/model';
import { IFilteredNews } from '@/types/news';
import { useUnit } from 'effector-react';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ReadOnlyKeyword } from './ReadOnlyKeyword';
import { SymbolWithChange } from './SymbolWithChange';

type ListItemProps = {
	item: IFilteredNews;
};

export const ListItem = ({ item }: ListItemProps) => {
	const router = useRouter();
	const { _id, title, createdAt, keywords, symbols, rating } = item;
	const now = useUnit($now);
	const isNotEmptyKeywords = keywords.length > 0;
	const totalSymbols = symbols.length;
	const maxVisible = 5;
	const hiddenCount = totalSymbols - maxVisible;

	const handlePress = () => {
		router.push(NEWS_DETAILS(_id.toString()));
	};

	const formattedTime = useMemo(
		() => formatNewsTime(createdAt, now),
		[createdAt, now]
	);

	const timeColor = useThemeColor(appTokens.text.quaternary);
	const backgroundColor = useThemeColor(appTokens.background.primary);
	const borderColor = useThemeColor(appTokens.border.tertiary);

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ backgroundColor: backgroundColor, borderColor: borderColor },
			]}
			activeOpacity={0.6}
			onPress={handlePress}
		>
			<View style={styles.top}>
				<View style={styles.symbols}>
					{symbols.slice(0, maxVisible).map(symbol => (
						<View style={styles.symbolWithChange} key={symbol.symbol}>
							<Badge
								variant='pillColor'
								size='sm'
								color='gray'
								value={symbol.symbol}
							/>
							<SymbolWithChange symbol={symbol} />
						</View>
					))}

					{hiddenCount > 0 && (
						<Badge
							variant='pillColor'
							size='sm'
							color='gray'
							value={`+${hiddenCount}`}
						/>
					)}
				</View>
				<Stars rating={rating.score} />
			</View>
			<ThemedText type='textSm' numberOfLines={3} style={styles.title}>
				{title}
			</ThemedText>
			{isNotEmptyKeywords && (
				<View style={styles.keywords}>
					{keywords.map(keyword => (
						<ReadOnlyKeyword key={keyword._id} keyword={keyword} />
					))}
				</View>
			)}
			<ThemedText type='textXs' style={[styles.time, { color: timeColor }]}>
				{formattedTime}
			</ThemedText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		marginVertical: 4,
		marginHorizontal: 16,
		padding: 12,
		borderWidth: 1,
	},

	top: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	symbols: {
		maxWidth: '75%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 8,
	},

	symbolWithChange: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},

	title: {
		marginTop: 12,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	keywords: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 4,
		marginTop: 12,
	},

	keyword: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	time: {
		marginTop: 12,
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},
});
