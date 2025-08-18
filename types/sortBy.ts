export enum OrderValues {
	Ascending = 'asc',
	Descending = 'desc',
}

export enum SortLabels {
	NewestFirst = 'Newest First',
	HighestRating = 'Highest Rating',
	BiggestGain = 'Biggest % Gain (Price Up)',
	BiggestDrop = 'Biggest % Drop (Price Down)',
	BiggestVolume = 'Biggest Volume',
	SmallestVolume = 'Smallest Volume',
	BiggestFloat = 'Biggest Float',
	SmallestFloat = 'Smallest Float',
}

export enum NewsSortValues {
	Time = 'time',
	Rating = 'rating',
	Change = 'change',
	Volume = 'volume',
	Float = 'float',
}

export type SortByStore = {
	currentLabel: SortLabels;
	order: OrderValues;
	sortValue: NewsSortValues;
};

export const sortByStoreDefault = {
	currentLabel: SortLabels.NewestFirst,
	order: OrderValues.Descending,
	sortValue: NewsSortValues.Time,
};

export const sortMapping: Record<SortLabels, SortByStore> = {
	[SortLabels.NewestFirst]: sortByStoreDefault,
	[SortLabels.HighestRating]: {
		currentLabel: SortLabels.HighestRating,
		order: OrderValues.Descending,
		sortValue: NewsSortValues.Rating,
	},
	[SortLabels.BiggestGain]: {
		currentLabel: SortLabels.BiggestGain,
		order: OrderValues.Descending,
		sortValue: NewsSortValues.Change,
	},
	[SortLabels.BiggestDrop]: {
		currentLabel: SortLabels.BiggestDrop,
		order: OrderValues.Ascending,
		sortValue: NewsSortValues.Change,
	},
	[SortLabels.BiggestVolume]: {
		currentLabel: SortLabels.BiggestVolume,
		order: OrderValues.Descending,
		sortValue: NewsSortValues.Volume,
	},
	[SortLabels.SmallestVolume]: {
		currentLabel: SortLabels.SmallestVolume,
		order: OrderValues.Ascending,
		sortValue: NewsSortValues.Volume,
	},
	[SortLabels.BiggestFloat]: {
		currentLabel: SortLabels.BiggestFloat,
		order: OrderValues.Descending,
		sortValue: NewsSortValues.Float,
	},
	[SortLabels.SmallestFloat]: {
		currentLabel: SortLabels.SmallestFloat,
		order: OrderValues.Ascending,
		sortValue: NewsSortValues.Float,
	},
};
