import { UserKeyword } from "./keywords";
import { StarNumberStateKey } from "./starRating";
import { ISymbol } from "./symbols";

export enum NewsTypesOrigins {
  News = "news",
  Article = "article",
}

export interface INews {
  _id: string;
  types: {
    origin: NewsTypesOrigins;
    type: string;
  };
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
  rating: {
    score: StarNumberStateKey;
    foundWords: string[];
  };
}
