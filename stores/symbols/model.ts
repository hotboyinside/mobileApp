import { createEvent, createStore, sample } from "effector";
import {
  receiveSocketSymbolsEvent,
  subscribeAndUnsubscribeSymbolsEvent,
  subscribeToSymbolsEvent,
} from "../socket/model";
import { parseRedisObject } from "@/helpers/redis/parseRedisObject";
import { ISymbol, SymbolData } from "@/types/symbols";
import { WindowsNames } from '@/constants/socket/clientEvents';

export const $dataSymbolsData = createStore<Record<string, ISymbol>>({});
export const $dataSymbolsSubscriptions = createStore<Set<string>>(new Set());

export const updateSymbolsDataEvent = createEvent<SymbolData>();
export const symbolsSubscribeEvent = createEvent<{
  symbolsToSubscribe: string[];
}>();
export const symbolsSubscribeAndUnsubscribeEvent = createEvent<{
    symbolsToSubscribe: string[],
    windowName: WindowsNames,
}>();

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

    return parsedSymbolsObjectFromSubscribedSymbols
  },
  target: updateSymbolsDataEvent
});

sample({
  clock: updateSymbolsDataEvent,
  source: $dataSymbolsData,
  fn: (state, symbol) => {
    if (!symbol || Object.keys(symbol).length === 0) {
      return state;
    }
    const newState = { ...state };
    Object.keys(symbol).forEach(key => {
      const prevSymbol = state[key] ?? {};
      const updatedSymbol = { ...prevSymbol, ...symbol[key] };
      newState[key] = updatedSymbol;
    });

    return newState;
  },
  target: $dataSymbolsData,
});

sample({
  clock: symbolsSubscribeEvent,
  source: $dataSymbolsSubscriptions,
  fn: (currentSubscriptions, { symbolsToSubscribe }) => {
    const symbolsToSubscribeSet = new Set(symbolsToSubscribe);

    for (const symbol of currentSubscriptions) {
      symbolsToSubscribeSet.delete(symbol);
    }

    if (symbolsToSubscribeSet.size > 0) {
      subscribeToSymbolsEvent({
        symbols: Array.from(symbolsToSubscribeSet),
      });
    }

    return new Set([...currentSubscriptions, ...symbolsToSubscribeSet]);
  },
  target: $dataSymbolsSubscriptions,
});

sample({
  source: $dataSymbolsSubscriptions,
  clock: symbolsSubscribeAndUnsubscribeEvent,
  fn: (state, { symbolsToSubscribe, windowName }) => {
    const symbolsToUnsubscribeSet = new Set(state);
    const symbolsToSubscribeSet = new Set(symbolsToSubscribe);

    for (const symbol of symbolsToSubscribe) {
      symbolsToUnsubscribeSet.delete(symbol);
    }
    for (const symbol of state) {
      symbolsToSubscribeSet.delete(symbol);
    }

    return {
      symbolsToSubscribe: Array.from(symbolsToSubscribeSet),
      symbolsToUnsubscribe: Array.from(symbolsToUnsubscribeSet),
      windowName,
    };
  },
  target: subscribeAndUnsubscribeSymbolsEvent,
});

sample({
  source: $dataSymbolsSubscriptions,
  clock: symbolsSubscribeAndUnsubscribeEvent,
  fn: (_, { symbolsToSubscribe }) => {
    return new Set(symbolsToSubscribe);
  },
  target: $dataSymbolsSubscriptions,
});

sample({
    clock: $dataSymbolsSubscriptions,
    source: $dataSymbolsData,
    fn: (dataSymbols, subscribedSymbols) => {
        const newState: Record<string, ISymbol> = {};
        subscribedSymbols?.forEach(symbol => {
            if (!dataSymbols[symbol]) {
                return;
            }
            newState[symbol] = dataSymbols[symbol];
        });

        return newState;
    },
    target: $dataSymbolsData,
});
