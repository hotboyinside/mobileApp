import { combine, createEvent, createStore } from 'effector';
import { fetchNewsFx, loadMoreNewsFx } from './handlers';
import { $keywords } from '../filtersPanel/keywords/model';
import { UserKeyword } from '@/types/keywords';
import { ISymbol } from '@/types/symbols';
import { $starRatingKeywords } from '@/stores/starRating/model';
import { $starRatingEnabledState } from '../filtersPanel/starRating/starRatingEnabledState/model';
import {
	StarNumber,
	StarNumberStateKey,
	StarRatingEnabledState,
} from '@/types/starRating';

export interface INews {
	_id: string;
	title: string;
	description: string;
	publishedAt: string;
	symbols: ISymbol[];
	url: string;
	createdAt: string;
	sourceId: string;
	industries: string[];
	content: string;
	categories: string[];
	sectors: string[];
}

export interface IFilteredNews extends INews {
	keywords: UserKeyword[];
	rating: {
		score: StarNumberStateKey;
		foundWords: string[];
	};
}

export enum NewsSortValuesExtended {
	Time = 'time',
	Float = 'float',
	Rating = 'rating',
	Change = 'change',
}

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

export const addNewsFromSseEvent = createEvent<MessageEvent>();

$allNews.on(addNewsFromSseEvent, (state, payload) => {
	const newsFromSse = JSON.parse(payload.data);

	return [...newsFromSse, ...state];
});

$allNews.on(fetchNewsFx.doneData, (_, docs) => docs);
$allNews.on(loadMoreNewsFx.doneData, (state, payload) => {
	return [...state, ...payload];
});

$allNewsLoadStatus
	.on(fetchNewsFx.pending, (_, pending) =>
		pending ? NewsLoadStatus.Loading : NewsLoadStatus.Idle
	)
	.on(fetchNewsFx.fail, () => NewsLoadStatus.Error)
	.on(fetchNewsFx.done, () => NewsLoadStatus.Idle);

$allNewsLoadStatus
	.on(loadMoreNewsFx.pending, (_, pending) =>
		pending ? NewsLoadStatus.LoadingMore : NewsLoadStatus.Idle
	)
	.on(loadMoreNewsFx.fail, () => NewsLoadStatus.Error)
	.on(loadMoreNewsFx.done, () => NewsLoadStatus.Idle);
