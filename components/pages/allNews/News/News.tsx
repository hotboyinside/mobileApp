import { Badge } from '@/components/ui/Badge/Badge';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { useRouter } from 'expo-router';
import { NEWS_DETAILS } from '@/constants/routes';
import { Stars } from '@/components/ui/Stars';
import { ReadOnlyKeyword } from './ReadOnlyKeyword';
import { $now } from '@/stores/allNews/globalTick/model';
import { useUnit } from 'effector-react';
import { $dataSymbolsData } from '@/stores/symbols/model';
import { formatNewsTime } from '@/helpers/time/formatNewsTime';
import { SymbolWithChange } from './SymbolWithChange';
import { useMemo } from 'react';
import { IFilteredNews } from '@/types/news';

type ListItemProps = {
	item: IFilteredNews;
};

export const ListItem = ({ item }: ListItemProps) => {
	const router = useRouter();
	const { _id, title, createdAt, keywords, symbols, rating } = item;
	const dataSymbolsData = useUnit($dataSymbolsData);
	const now = useUnit($now);

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
					{symbols.map(symbol => (
						<View style={styles.symbolWithChange} key={symbol.symbol}>
							<Badge
								variant='pillColor'
								size='sm'
								color='gray'
								value={symbol.symbol}
							/>
							<SymbolWithChange
								symbol={symbol}
								dataSymbolsData={dataSymbolsData}
							/>
						</View>
					))}
				</View>
				<Stars rating={rating.score} />
			</View>
			<ThemedText type='textSm' numberOfLines={2} style={styles.title}>
				{title}
			</ThemedText>
			<View style={styles.keywords}>
				{keywords.map(keyword => (
					<ReadOnlyKeyword key={keyword._id} keyword={keyword} />
				))}
			</View>
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
		borderColor: '#eee',
		backgroundColor: '#fff',
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
