export type StarNumber = 1 | 2 | 3 | 4;
export type StarNumberStateKey = StarNumber | 0;

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
	0: boolean;
	1: boolean;
	2: boolean;
	3: boolean;
	4: boolean;
}

export interface StarRatingChangeEvent {
	changeableStar: StarNumber;
	word: string;
}
