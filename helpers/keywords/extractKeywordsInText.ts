import { UserKeyword } from '@/types/keywords';

export const extractKeywordsInText = (
	keywords: UserKeyword[],
	text: string
) => {
	const lowerText = text.toLowerCase();

	return keywords.filter(
		k => !k.isFrozen && lowerText.includes(k.word.toLowerCase())
	);
};
