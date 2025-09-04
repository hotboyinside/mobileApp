import { combine, createStore } from "effector";
import { fetchNewsFx } from "./handlers";
import { $keywords } from "../filtersPanel/keywords/model";
import { UserKeyword } from "@/types/keywords";

export interface ISymbol {
  _id: string;
  isDelisted?: boolean;
  symbol: string;
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
  dividendDate?: Date;
  exDividendDate?: Date;
  lastSplitFactor?: string;
  lastSplitDate?: Date;
  totalCashMRQ?: number;
  totalCashPerShareMRQ?: number;
  totalDebtMRQ?: number;
  totalDebtToEquityMRQ?: number;
  currentRatioMRQ?: number;
  bookValuePerShareMRQ?: number;
  leveredFreeCashFlowTTM?: number;
  operatingCashFlowTTM?: number;
  fiscalYearEnds?: Date;
  mostRecentQuarter?: Date;
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
  trends?: {
    rating?: number;
    strongBuy?: number;
    buy?: number;
    hold?: number;
    sell?: number;
    strongSell?: number;
  };
  priceTarget?: {
    high?: number;
    median?: number;
    low?: number;
    average?: number;
    current?: number;
    currency?: string;
  };
  SMA?: number;
  EMA?: number;
  MACD?: number;
  RSI?: number;
}

export interface INews {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  symbols: ISymbol[];
  url: string;
  createdAt: string;
  sourceId: string;
  industries: string[];
  content: string;
  categories: string[];
  sectors: string[];
}

export interface IFilteredNews extends INews {
  keywords: UserKeyword[];
}

export enum NewsSortValuesExtended {
  Time = "time",
  Float = "float",
  Rating = "rating",
  Change = "change",
}

export const $allNews = createStore<INews[]>([]);
export const $lastAllNewsDocDateStore = $allNews.map(docs => {
  const lastDoc = docs.at(-1);

  if (!lastDoc) {
    return new Date().getTime();
  }

  return new Date((lastDoc as INews).createdAt).getTime();
});

$allNews.on(fetchNewsFx.doneData, (_, docs) => docs);

export const $filteredNews = combine(
  $allNews,
  $keywords,
  (news: INews[], keywords: UserKeyword[]): IFilteredNews[] => {
    return news.map(item => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();

      const matchedKeywords = keywords.filter(keyword => {
        const word = keyword.word.toLowerCase();
        return title.includes(word) || description.includes(word);
      });

      return {
        ...item,
        keywords: matchedKeywords,
      };
    });
  }
);
