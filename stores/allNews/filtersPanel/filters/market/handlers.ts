import { MarketNames } from '@/types/market';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEffect } from 'effector';

const PREFIX = 'all-news-markets';

export const getMarketsSnapshotFx = createEffect(
	async (): Promise<MarketNames[]> => {
		try {
			const savedMarkets = await AsyncStorage.getItem(PREFIX);
			if (savedMarkets) {
				return JSON.parse(savedMarkets) as MarketNames[];
			}
			return [];
		} catch (error) {
			console.error('Error retrieving markets data', error);
			return [];
		}
	}
);

export const saveMarketsFx = createEffect(async (markets: MarketNames[]) => {
	try {
		if (markets.length > 0) {
			await AsyncStorage.setItem(PREFIX, JSON.stringify(markets));
		} else {
			await AsyncStorage.removeItem(PREFIX);
		}
	} catch (error) {
		console.error('Error saving markets data', error);
	}
});
