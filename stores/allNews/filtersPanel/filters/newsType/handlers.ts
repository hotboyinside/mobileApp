import { NewsTypesNames } from '@/types/newsType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEffect } from 'effector';

const PREFIX = 'all-news-news-types';

export const getNewsTypesSnapshotFx = createEffect(
	async (): Promise<NewsTypesNames[]> => {
		try {
			const savedNewsTypes = await AsyncStorage.getItem(PREFIX);
			if (savedNewsTypes) {
				return JSON.parse(savedNewsTypes) as NewsTypesNames[];
			}
			return [];
		} catch (error) {
			console.error('Error retrieving news types data', error);
			return [];
		}
	}
);

export const saveNewsTypesFx = createEffect(
	async (newsTypes: NewsTypesNames[]) => {
		try {
			if (newsTypes.length > 0) {
				await AsyncStorage.setItem(PREFIX, JSON.stringify(newsTypes));
			} else {
				await AsyncStorage.removeItem(PREFIX);
			}
		} catch (error) {
			console.error('Error saving news types data', error);
		}
	}
);
