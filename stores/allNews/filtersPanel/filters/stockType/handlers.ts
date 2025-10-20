import { StockTypesNames } from '@/types/stockTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEffect } from 'effector';

const PREFIX = 'all-news-stock-types';

export const getStockTypesSnapshotFx = createEffect(
	async (): Promise<StockTypesNames[]> => {
		try {
			const savedStockTypes = await AsyncStorage.getItem(PREFIX);
			if (savedStockTypes) {
				return JSON.parse(savedStockTypes) as StockTypesNames[];
			}
			return [];
		} catch (error) {
			console.error('Error retrieving stock types data', error);
			return [];
		}
	}
);

export const saveStockTypesFx = createEffect(
	async (stockTypes: StockTypesNames[]) => {
		try {
			if (stockTypes.length > 0) {
				await AsyncStorage.setItem(PREFIX, JSON.stringify(stockTypes));
			} else {
				await AsyncStorage.removeItem(PREFIX);
			}
		} catch (error) {
			console.error('Error saving stock types data', error);
		}
	}
);
