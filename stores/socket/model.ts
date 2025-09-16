import { config } from "@/config/vars";
import { SocketClientEvents, WindowsNames } from "@/constants/socket/clientEvents";
import { createStore, createEvent } from "effector";
import { io, Socket } from "socket.io-client";
import { resetDataTopBannersSymbolsGainersLosersEvent, updateDataTopBannersSymbolsGainersEvent, updateDataTopBannersSymbolsGapGainersEvent, updateDataTopBannersSymbolsLosersEvent, updateDataTopBannersSymbolsGapLosersEvent } from '../allNews/topBannersData/model';

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

  "trends.rating"?: number;
  "trends.strongBuy"?: number;
  "trends.buy"?: number;
  "trends.hold"?: number;
  "trends.sell"?: number;
  "trends.strongSell"?: number;

  "priceTarget.high"?: number;
  "priceTarget.median"?: number;
  "priceTarget.low"?: number;
  "priceTarget.average"?: number;
  "priceTarget.current"?: number;
  "priceTarget.currency"?: number;
};

export enum SocketServerEvents {
  Symbols = "symbols",
  StockTrade = "stockTrade",
}

export enum SocketBannersEvents {
    ClearGainersLosersSymbols = 'clearGainersLosersSymbols',
    BannersGainersSymbols = 'bannersGainersSymbols',
    BannersLosersSymbols = 'bannersLosersSymbols',
    BannersGainersGappersSymbols = 'bannersGainerGappersSymbols',
    BannersLosersGappersSymbols = 'bannersLoserGappersSymbols',
}


export const $socketSource = createStore<Socket | null>(null);

export const connectSocketEvent = createEvent();
export const receiveSocketSymbolsEvent = createEvent<{
  symbols: IRedisSymbol[];
}>();
export const subscribeToSymbolsEvent = createEvent<{
  symbols: string[];
}>();
export const subscribeAndUnsubscribeSymbolsEvent = createEvent<{
    symbolsToSubscribe: string[],
    symbolsToUnsubscribe: string[],
    windowName: WindowsNames,
}>();
export const subscribeTopBanners = createEvent();
export const unsubscribeTopBanners = createEvent();

$socketSource.on(connectSocketEvent, state => {
  state?.disconnect();

  const socket = io(config.apiUrl, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log(`✅ SOCKET connected ${socket.id}`);
  });

  socket.on("disconnect", reason => {
    console.error("❌ SOCKET Disconnected", reason);
  });

  socket.on(SocketServerEvents.Symbols, receiveSocketSymbolsEvent);

  socket.on(SocketBannersEvents.ClearGainersLosersSymbols, resetDataTopBannersSymbolsGainersLosersEvent);
  socket.on(SocketBannersEvents.BannersGainersSymbols, updateDataTopBannersSymbolsGainersEvent);
  socket.on(SocketBannersEvents.BannersGainersGappersSymbols, updateDataTopBannersSymbolsGapGainersEvent);
  socket.on(SocketBannersEvents.BannersLosersSymbols, updateDataTopBannersSymbolsLosersEvent);
  socket.on(SocketBannersEvents.BannersLosersGappersSymbols, updateDataTopBannersSymbolsGapLosersEvent);

  return socket;
});

$socketSource.on(subscribeToSymbolsEvent, (state, data) => {
  state?.emit(SocketClientEvents.SubscribeToSymbol, data);
});

$socketSource.on(subscribeAndUnsubscribeSymbolsEvent, (state, data) => {
  state?.emit(SocketClientEvents.SubscribeAndUnsubscribeSymbols, data);
});

$socketSource.on(subscribeTopBanners, (state) => {
    state?.emit(SocketClientEvents.SubscribeTopBanners);
});

$socketSource.on(unsubscribeTopBanners, (state) => {
    state?.emit(SocketClientEvents.UnsubscribeTopBanners);
});
