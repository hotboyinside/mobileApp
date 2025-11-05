export enum SocketServerEvents {
	Symbols = 'symbols',
	StockTrade = 'stockTrade',
}

export enum SocketBannersEvents {
	ClearGainersLosersSymbols = 'clearGainersLosersSymbols',
	BannersGainersSymbols = 'bannersGainersSymbols',
	BannersLosersSymbols = 'bannersLosersSymbols',
	BannersGainersGappersSymbols = 'bannersGainerGappersSymbols',
	BannersLosersGappersSymbols = 'bannersLoserGappersSymbols',
}
