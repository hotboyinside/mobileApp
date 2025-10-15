import { NEWS_DETAILS } from '@/constants/routes';
import { extractKeywordsInText } from '@/helpers/keywords/extractKeywordsInText';
import { addNewsToast } from '@/stores/notificationsToasts/model';
import { $starRatingKeywords } from '@/stores/starRating/model';
import { $isKeywordsEnabled } from '@/stores/userSettings/keywordsEnabled';
import { UserKeyword } from '@/types/keywords';
import { IFilteredNews, INews } from '@/types/news';
import { combine, createEvent, createStore, sample } from 'effector';
import { router } from 'expo-router';
import { $isVoiceOverEnabled } from '../../userSettings/voiceOver/model';
import {
	$keywords,
	$withVoiceOverKeywords,
} from '../filtersPanel/keywords/model';
import { $starRatingEnabledState } from '../filtersPanel/starRating/starRatingEnabledState/model';
import { fetchNewsFx, loadMoreNewsFx, speakTtsFx } from './handlers';

export enum NewsLoadStatus {
	Idle = 'idle',
	Loading = 'loading',
	LoadingMore = 'loadingMore',
	Error = 'error',
}

export const $allNewsLoadStatus = createStore<NewsLoadStatus>(
	NewsLoadStatus.Idle
);
export const $allNews = createStore<INews[]>([]);
export const $hasMoreNews = createStore<boolean>(true);
export const $allNewsPagination = createStore<{ page: number }>({ page: 1 });
export const $lastAllNewsNewsDate = $allNews.map(docs => {
	if (docs.length < 1) return null;

	const lastDoc = docs.at(-1);
	return new Date((lastDoc as INews).createdAt).getTime();
});
export const $filteredNews = combine(
	$allNews,
	$keywords,
	$starRatingKeywords,
	$starRatingEnabledState,
	(
		news: INews[],
		keywords: UserKeyword[],
		starRatingKeywords,
		starRatingEnabledState
	): IFilteredNews[] => {
		const allowedStars = (
			Object.entries(starRatingEnabledState) as [string, boolean][]
		)

			.filter(([_, enabled]) => enabled)
			.map(([star]) => Number(star) as 0 | 1 | 2 | 3 | 4);

		return news.map(item => {
			const title = (item.title || '').toLowerCase();
			const description = (item.description || '').toLowerCase();
			const combinedText = `${title} ${description}`;

			const matchedKeywords = keywords.filter(keyword => {
				const word = keyword.word.toLowerCase();
				return title.includes(word) || description.includes(word);
			});

			let score: 0 | 1 | 2 | 3 | 4 = 0;
			let foundWords: string[] = [];

			const allowedStarsExcludeZero = allowedStars
				.filter(star => star !== 0)
				.sort((a, b) => b - a) as (1 | 2 | 3 | 4)[];

			for (const star of allowedStarsExcludeZero) {
				const keywordsForStar = starRatingKeywords[star] || [];
				const matched = keywordsForStar.filter(keyword =>
					combinedText.includes(keyword.toLowerCase())
				);

				if (matched.length > 0) {
					score = star;
					foundWords = matched;
					break;
				}
			}

			return {
				...item,
				keywords: matchedKeywords,
				rating: {
					score,
					foundWords,
				},
			};
		});
	}
);

export const getNewsFroSseEvent = createEvent<MessageEvent>();
export const addNewsFromSseEvent = createEvent<INews[]>();
export const getNews = createEvent<{ isInitialNews: boolean }>();

sample({
	clock: getNewsFroSseEvent,
	source: $allNews,
	fn: (currentNews, newsFromSseJson) => {
		const newsFromSse: INews[] = JSON.parse(newsFromSseJson.data);

		const newNews = newsFromSse.filter(
			n => !currentNews.some(c => c._id === n._id)
		);

		return newNews;
	},
	target: addNewsFromSseEvent,
});

sample({
	clock: addNewsFromSseEvent,
	source: {
		withVoiceOverKeywords: $withVoiceOverKeywords,
		isKeywordsEnabled: $isKeywordsEnabled,
		keywordsAlertsSoundIsEnabled: $isVoiceOverEnabled,
	},
	fn(
		{ withVoiceOverKeywords, isKeywordsEnabled, keywordsAlertsSoundIsEnabled },
		newsFromSse
	) {
		if (!keywordsAlertsSoundIsEnabled || !isKeywordsEnabled) {
			return;
		}

		for (const news of newsFromSse) {
			const text = [news.title, news.description].filter(Boolean).join(' ');
			const matched = extractKeywordsInText(withVoiceOverKeywords, text);
			if (matched.length > 0) {
				return matched[0].word;
			}
		}

		return null;
	},
	target: speakTtsFx,
});

sample({
	clock: addNewsFromSseEvent,
	source: {
		withVoiceOverKeywords: $withVoiceOverKeywords,
		isKeywordsEnabled: $isKeywordsEnabled,
		keywordsAlertsSoundIsEnabled: $isVoiceOverEnabled,
	},
	fn(
		{ withVoiceOverKeywords, isKeywordsEnabled, keywordsAlertsSoundIsEnabled },
		newsFromSse
	) {
		if (!keywordsAlertsSoundIsEnabled || !isKeywordsEnabled) {
			return null;
		}

		for (const news of newsFromSse) {
			const text = [news.title, news.description].filter(Boolean).join(' ');
			const matched = extractKeywordsInText(withVoiceOverKeywords, text);
			if (matched.length > 0) {
				return {
					title: news.title,
					keywords: matched.map(k => k.word),
					onPress: () => {
						router.push(NEWS_DETAILS(news._id));
					},
				};
			}
		}

		return null;
	},
	target: addNewsToast,
});

$allNews.on(fetchNewsFx.doneData, (_, response) => response.docs);
$allNewsPagination.on(fetchNewsFx.doneData, (_, response) => ({
	page: response.page + 1,
}));
$hasMoreNews.on(fetchNewsFx.doneData, (_, response) => {
	if (response.nextPage === null) return false;
	return true;
});

$allNews.on(loadMoreNewsFx.doneData, (state, response) => {
	return [...state, ...response.docs];
});
$allNewsPagination.on(loadMoreNewsFx.doneData, (_, response) => ({
	page: response.page + 1,
}));
$hasMoreNews.on(loadMoreNewsFx.doneData, (_, response) => {
	if (response.nextPage === null) return false;
	return true;
});

$allNewsLoadStatus
	.on(fetchNewsFx.pending, (_, pending) =>
		pending ? NewsLoadStatus.Loading : NewsLoadStatus.Idle
	)
	.on(loadMoreNewsFx.pending, (_, pending) =>
		pending ? NewsLoadStatus.Loading : NewsLoadStatus.Idle
	)
	.on(fetchNewsFx.done, () => NewsLoadStatus.Idle)
	.on(loadMoreNewsFx.done, () => NewsLoadStatus.Idle)
	.on(fetchNewsFx.fail, () => NewsLoadStatus.Error)
	.on(loadMoreNewsFx.fail, () => NewsLoadStatus.Error);
