import { StarNumber } from '@/types/starRating';
import { createEvent, createStore, sample } from 'effector';

export const $userInputKeywords = createStore<Record<StarNumber, string>>({
	1: '',
	2: '',
	3: '',
	4: '',
});
export const $inputErrors = createStore<Record<StarNumber, string | null>>({
	1: null,
	2: null,
	3: null,
	4: null,
});
export const $sessionModifiedKeywords = createStore<
	Record<StarNumber, string[]>
>({
	1: [],
	2: [],
	3: [],
	4: [],
});

export const changeUserInputKeyword = createEvent<{
	star: StarNumber;
	text: string;
}>();
export const showDuplicateError = createEvent<{
	star: StarNumber;
	message: string;
}>();
export const clearInputError = createEvent<StarNumber>();
export const addSessionKeyword = createEvent<{
	star: StarNumber;
	word: string;
}>();
export const removeSessionKeyword = createEvent<{
	star: StarNumber;
	word: string;
}>();
export const removeSessionKeywordsByStar = createEvent<StarNumber>();
export const removeAllSessionKeywords = createEvent();
export const resetSessionKeywords = createEvent<void>();

$userInputKeywords.on(changeUserInputKeyword, (state, { star, text }) => ({
	...state,
	[star]: text,
}));
$inputErrors.on(showDuplicateError, (state, { star, message }) => ({
	...state,
	[star]: message,
}));
$inputErrors.on(clearInputError, (state, star) => ({
	...state,
	[star]: null,
}));

sample({
	clock: changeUserInputKeyword,
	fn: ({ star }) => star,
	target: clearInputError,
});

sample({
	clock: showDuplicateError,
	filter: payload => payload !== null,
	fn: ({ star, message }) => ({
		...$inputErrors.getState(),
		[star]: message,
	}),
	target: $inputErrors,
});

sample({
	clock: addSessionKeyword,
	source: $sessionModifiedKeywords,
	fn: (keywordsByStar, { star, word }) => ({
		...keywordsByStar,
		[star]: keywordsByStar[star].includes(word)
			? keywordsByStar[star]
			: [...keywordsByStar[star], word],
	}),
	target: $sessionModifiedKeywords,
});

sample({
	clock: removeSessionKeyword,
	source: $sessionModifiedKeywords,
	fn: (keywordsByStar, { star, word }) => ({
		...keywordsByStar,
		[star]: keywordsByStar[star].filter(w => w !== word),
	}),
	target: $sessionModifiedKeywords,
});

sample({
	clock: removeSessionKeywordsByStar,
	source: $sessionModifiedKeywords,
	filter: (keywordsByStar, star) => keywordsByStar[star].length > 0,
	fn: (keywordsByStar, star) => ({
		...keywordsByStar,
		[star]: [],
	}),
	target: $sessionModifiedKeywords,
});

$sessionModifiedKeywords.reset(resetSessionKeywords);
