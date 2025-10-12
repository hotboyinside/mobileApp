import { createStore, createEvent } from 'effector';

export interface NewsToastContent {
	title: string;
	keywords: string[];
	onPress?: () => void;
}

export const addNewsToast = createEvent<NewsToastContent | null>();

export const $newsToast = createStore<NewsToastContent | null>(null);

$newsToast.on(addNewsToast, (_, toast) => {
	if (toast) {
		return toast;
	}
});
