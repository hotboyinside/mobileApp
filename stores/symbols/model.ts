import { createEvent, createStore, sample } from "effector";
import { receiveSocketSymbolsEvent } from "../socket/model";
import { parseRedisObject } from "@/helpers/redis/parseRedisObject";
import { ISymbol } from "@/types/symbols";

export const $dataSymbolsData = createStore<Record<string, ISymbol>>({});
export const $dataSymbolsSubscriptions = createStore<Set<string>>(new Set());

export const updateSymbolsDataEvent = createEvent<SymbolData>();

sample({
  clock: receiveSocketSymbolsEvent,
  source: $dataSymbolsSubscriptions,
  fn: (subscribedSymbols, { symbols }) => {
    const parsedSymbolsObject: Record<string, ISymbol> = {};
    const parsedSymbolsObjectFromSubscribedSymbols: Record<string, ISymbol> =
      {};
    const parsedSymbolsArray: ISymbol[] = [];

    symbols.forEach(symbol => {
      const parsedSymbol = parseRedisObject(symbol);
      parsedSymbolsObject[symbol.symbol] = parsedSymbol;
      parsedSymbolsArray.push(parsedSymbol);
      if (subscribedSymbols.has(symbol.symbol)) {
        parsedSymbolsObjectFromSubscribedSymbols[symbol.symbol] = parsedSymbol;
      }
    });

    if (Object.keys(parsedSymbolsObjectFromSubscribedSymbols).length > 0) {
      updateSymbolsDataEvent(parsedSymbolsObjectFromSubscribedSymbols);
    }
  },
});
