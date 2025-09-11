export type StarNumber = 1 | 2 | 3 | 4;

export interface StarRatingKeywords {
	1: string[];
	2: string[];
	3: string[];
	4: string[];
}

export interface UserModificationCountInStarRating {
	modificationCount?: number | null;
}

export interface StarRatingEnabledState {
	isEnabledZeroStar: boolean;
	isEnabledOneStar: boolean;
	isEnabledTwoStar: boolean;
	isEnabledThreeStar: boolean;
	isEnabledFourStar: boolean;
}

export interface StarRatingChangeEvent {
	changeableStar: StarNumber;
	word: string;
}
