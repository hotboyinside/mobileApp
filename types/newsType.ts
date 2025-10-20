export enum NewsTypesNames {
	News = 'news',
	Filings = 'filings',
}

export const NewsTypesLabels: Record<NewsTypesNames, string> = {
	[NewsTypesNames.News]: 'News',
	[NewsTypesNames.Filings]: 'Filings',
};
