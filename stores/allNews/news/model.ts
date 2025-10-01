import { combine, createEvent, createStore } from 'effector';
import { fetchNewsFx, fetchSortedNewsFx, loadMoreNewsFx } from './handlers';
import { $keywords } from '../filtersPanel/keywords/model';
import { UserKeyword } from '@/types/keywords';
import { ISymbol } from '@/types/symbols';
import { $starRatingKeywords } from '@/stores/starRating/model';
import { $starRatingEnabledState } from '../filtersPanel/starRating/starRatingEnabledState/model';
import { StarNumberStateKey } from '@/types/starRating';

export enum NewsTypesOrigins {
	News = 'news',
	Article = 'article',
}

export interface INews {
	_id: string;
	types: {
		origin: NewsTypesOrigins;
		type: string;
	};
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
export const $hasMoreNews = createStore<boolean>(true);
export const $allNewsPagination = createStore<{ page: number }>({ page: 1 });
$allNewsPagination.watch(state => console.log('state', state));
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
export const getNews = createEvent<{ isInitialNews: boolean }>();

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
	.on(fetchNewsFx.fail, () => NewsLoadStatus.Error)
	.on(fetchNewsFx.done, () => NewsLoadStatus.Idle);

$allNews.on(fetchSortedNewsFx.doneData, (_, docs) => docs);
