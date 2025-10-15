export type IRedisSymbol = {
	_id: string;
	symbol: string;
	updatedAt?: string;
	isDelisted?: string;
	name?: string;
	micCode?: string;
	exchange?: string;
	exchangeTimezone?: string;
	currency?: string;
	country?: string;
	type?: string;
	price?: number;
	change?: number;
	priceChange?: number;
	absoluteChange?: number;
	pricePrePost?: number;
	changePrePost?: number;
	priceChangePrePost?: number;
	absoluteChangePrePost?: number;
	float?: number;
	volume?: number;
	averageVolume?: number;
	dayVolume?: number;
	highestPrice?: number;
	lowestPrice?: number;
	openPrice?: number;
	closePrice?: number;
	lastDayOpenHighLowClearAt?: number;
	lastDayVolumeClearAt?: number;
	averageDailyVolume?: number;
	averageDailyRanges?: number;
	sharesShort?: number;
	shortRatio?: number;
	shortPercentOfSharesOutstanding?: number;
	daysRange?: number;
	moneyFlow?: number;
	vwap?: number;
	fiftyTwoWeekRange?: string;
	enterpriseValue?: number;
	marketCapitalization?: number;
	trailingPE?: number;

	forwardAnnualDividendRate?: number;
	forwardAnnualDividendYield?: number;
	trailingAnnualDividendRate?: number;
	trailingAnnualDividendYield?: number;
	fiveYearAverageDividendYield?: number;
	payoutRatio?: number;
	dividendDate?: string;
	exDividendDate?: string;
	lastSplitFactor?: string;
	lastSplitDate?: string;

	totalCashMRQ?: number;
	totalCashPerShareMRQ?: number;
	totalDebtMRQ?: number;
	totalDebtToEquityMRQT?: number;
	currentRatioMRQ?: number;
	bookValuePerShareMRQ?: number;

	leveredFreeCashFlowTTM?: number;
	operatingCashFlowTTM?: number;

	revenueTTM?: number;
	revenuePerShareTTM?: number;
	quarterlyRevenueGrowth?: number;
	grossProfitTTM?: number;
	ebitda?: number;
	netIncomeToCommonTTM?: number;
	dilutedEpsTTM?: number;
	quarterlyEarningsGrowthYOY?: number;

	fiscalYearEnds?: string;
	mostRecentQuarter?: string;
	profitMargin?: number;
	operatingMargin?: number;
	returnOnAssetsTTM?: number;
	returnOnEquityTTM?: number;

	fiftyTwoWeekLow?: number;
	fiftyTwoWeekHigh?: number;
	fiftyTwoWeekChange?: number;
	beta?: number;
	dayFiftyMA?: number;
	dayTwoHundredMA?: number;

	forwardPE?: number;
	pegRatio?: number;
	priceToSalesTTM?: number;
	priceToBookMRQ?: number;
	enterpriseToRevenue?: number;
	enterpriseToEbitda?: number;

	sharesOutstanding?: number;
	avgTenVolume?: number;
	avgNinetyVolume?: number;
	percentHeldByInsiders?: number;
	percentHeldByInstitutions?: number;

	SMA?: number;
	EMA?: number;
	MACD?: number;
	RSI?: number;

	'trends.rating'?: number;
	'trends.strongBuy'?: number;
	'trends.buy'?: number;
	'trends.hold'?: number;
	'trends.sell'?: number;
	'trends.strongSell'?: number;

	'priceTarget.high'?: number;
	'priceTarget.median'?: number;
	'priceTarget.low'?: number;
	'priceTarget.average'?: number;
	'priceTarget.current'?: number;
	'priceTarget.currency'?: number;
};