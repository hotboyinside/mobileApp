const SYMBOLS = "symbols";

const SYMBOLS_GENERAL = `${SYMBOLS}:general`;

const SYMBOLS_GAPPERS = `${SYMBOLS}:gappers`;

const SYMBOLS_BANNERS = `${SYMBOLS}:banners`;

const SUBSCRIBE_TO_SYMBOL = `${SYMBOLS_GENERAL}:subscribe`;
const UNSUBSCRIBE_FROM_SYMBOL = `${SYMBOLS_GENERAL}:unsubscribe`;
const SUBSCRIBE_AND_UNSUBSCRIBE_SYMBOLS = `${SYMBOLS_GENERAL}:subscribeAndUnsubscribe`;
const UNSUBSCRIBE_FROM_ALL_SYMBOLS_ON_CORE_TABLE = `${SYMBOLS_GENERAL}:unsubscribeFromAllOnWindow`;

const RESUBSCRIBE_GAPPERS_SYMBOLS = `${SYMBOLS_GAPPERS}:resubscribe`;

const BANNERS_SUBSCRIBE = `${SYMBOLS_BANNERS}:subscribe`;
const BANNERS_UNSUBSCRIBE = `${SYMBOLS_BANNERS}:unsubscribe`;

const STOCK_TRADES = "stockTrades";

const STOCK_TRADES_SUBSCRIBE = `${STOCK_TRADES}:subscribe`;
const STOCK_TRADES_UNSUBSCRIBE = `${STOCK_TRADES}:unsubscribe`;

export const SocketClientEvents = {
  SubscribeToSymbol: SUBSCRIBE_TO_SYMBOL,
  UnsubscribeFromSymbol: UNSUBSCRIBE_FROM_SYMBOL,
  SubscribeAndUnsubscribeSymbols: SUBSCRIBE_AND_UNSUBSCRIBE_SYMBOLS,
  UnsubscribeFromAllSymbolsOnWindow: UNSUBSCRIBE_FROM_ALL_SYMBOLS_ON_CORE_TABLE,
  ResubscribeGappersSymbols: RESUBSCRIBE_GAPPERS_SYMBOLS,
  SubscribeTopBanners: BANNERS_SUBSCRIBE,
  UnsubscribeTopBanners: BANNERS_UNSUBSCRIBE,
  SubscribeStockTrades: STOCK_TRADES_SUBSCRIBE,
  UnsubscribeStockTrades: STOCK_TRADES_UNSUBSCRIBE,
};

export enum WindowsNames {
    MainWindow = 'mainWindow',
    GainersWindow = 'gainersWindow',
    LosersWindow = 'losersWindow',
    GapGainersWindow = 'gapGainersWindow',
    GapLosersWindow = 'gapLosersWindow',
}
