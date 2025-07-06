import { Badge } from '@/components/ui/Badge/Badge';
import { Change } from '@/components/ui/Change/Change';
import StarIcon from '@/assets/icons/star-icon.svg';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BadgeColor } from '@/components/ui/Badge/badgeTypes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';

export type Symbol = {
	symbol: string;
	absoluteChange: string;
};

export type Keyword = {
	text: string;
	icon?: string;
	bgColor: string;
};

export type MockItem = {
	id: number;
	title: string;
	createdTime: string;
	rating: 0 | 1 | 2 | 3 | 4;
	keywords: Keyword[];
	symbols: Symbol[];
};

type ListItemProps = {
	item: MockItem;
};

export const ListItem = ({ item }: ListItemProps) => {
	const { title, createdTime, rating, keywords, symbols } = item;

	const timeColor = useThemeColor({}, appTokens.text.quaternary);

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.6}
			onPress={() => console.log('Нажато!')}
		>
			<View style={styles.top}>
				<View style={styles.symbols}>
					{symbols.map(symbol => (
						<View style={styles.symbolWithChange} key={symbol.symbol}>
							<Badge variant='pillColor' color='gray' value={symbol.symbol} />
							<Change value={symbol.absoluteChange} />
						</View>
					))}
				</View>
				<View style={styles.rating}>
					{Array.from({ length: 4 }).map((_, index) => {
						return index < rating ? (
							<StarIcon key={index} color={'red'} />
						) : (
							<StarIcon key={index} />
						);
					})}
				</View>
			</View>
			<ThemedText type='textSm' style={styles.title}>
				{title}
			</ThemedText>
			<View style={styles.keywords}>
				{keywords.map(keyword => (
					<Badge
						value={(keyword?.icon || '') + keyword.text}
						key={keyword.text}
						variant='keywords'
						color={keyword.bgColor as BadgeColor}
					/>
				))}
			</View>
			<ThemedText type='textXs' style={[styles.time, { color: timeColor }]}>
				{createdTime}
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

	rating: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
		alignSelf: 'flex-start',
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
