import { IRedisSymbol } from '@/stores/socket/model';
import { ISymbol } from '@/types/symbols';
import { combine, createEvent, createStore, sample } from 'effector';
import { INews } from '../news/model';
import { dataCommonDayChangedEvent } from '../common/model';
import { parseRedisObject } from '@/helpers/redis/parseRedisObject';


interface IDataTopBannersStore {
	docs: INews[];
}

const DATA_TOP_BANNERS_DEFAULT_STATE = {
	docs: [],
};

export const $dataTopBannersStore = createStore<IDataTopBannersStore>(
    DATA_TOP_BANNERS_DEFAULT_STATE
);

interface IDataTopBannersSymbolGainersStore {
    topThreeGainersSymbols: (ISymbol & {
        title: string
    })[]
};

const DATA_TOP_BANNERS_SYMBOL_GAINERS_DEFAULT_STATE = {
	topThreeGainersSymbols: [],
};

export const $dataTopBannersSymbolGainersStore = createStore<IDataTopBannersSymbolGainersStore>(
    DATA_TOP_BANNERS_SYMBOL_GAINERS_DEFAULT_STATE
);

interface IDataTopBannersSymbolLosersStore {
    topThreeLosersSymbols: (ISymbol & {
        title: string
    })[]
};

const DATA_TOP_BANNERS_SYMBOL_LOSERS_DEFAULT_STATE = {
	topThreeLosersSymbols: [],
};

export const $dataTopBannersSymbolLosersStore = createStore<IDataTopBannersSymbolLosersStore>(
    DATA_TOP_BANNERS_SYMBOL_LOSERS_DEFAULT_STATE
);

interface IDataTopBannersSymbolGapGainersStore {
    topThreeGainersSymbols: ISymbol[]
};

const DATA_TOP_BANNERS_SYMBOL_GAP_GAINERS_DEFAULT_STATE = {
	topThreeGainersSymbols: [],
};

export const $dataTopBannersSymbolGapGainersStore = createStore<IDataTopBannersSymbolGapGainersStore>(
    DATA_TOP_BANNERS_SYMBOL_GAP_GAINERS_DEFAULT_STATE
);

interface IDataTopBannersSymbolGapLosersStore {
    topThreeLosersSymbols: ISymbol[]
};

const DATA_TOP_BANNERS_SYMBOL_GAP_LOSERS_DEFAULT_STATE = {
	topThreeLosersSymbols: [],
};

export const $dataTopBannersSymbolGapLosersStore = createStore<IDataTopBannersSymbolGapLosersStore>(
    DATA_TOP_BANNERS_SYMBOL_GAP_LOSERS_DEFAULT_STATE
);

export const topBannersAddDocsEvent = createEvent<{ docs: INews[] }>();
export const topBannersAddDocEvent = createEvent<{ doc: INews }>();

export const topBannersSetDefaultStateEvent = createEvent();

export const resetDataTopBannersSymbolsGainersLosersEvent = createEvent();

export const updateDataTopBannersSymbolsGainersEvent = createEvent<IRedisSymbol[]>();
export const updateDataTopBannersSymbolsLosersEvent = createEvent<IRedisSymbol[]>();
export const updateDataTopBannersSymbolsGapGainersEvent = createEvent<IRedisSymbol[]>();
export const updateDataTopBannersSymbolsGapLosersEvent = createEvent<IRedisSymbol[]>();

export const setDefaultStateEvent = createEvent();

$dataTopBannersStore.on(dataCommonDayChangedEvent, (state, data) => {
    const todayDocs = state.docs.filter((doc) => new Date(doc.createdAt).getDay() === data.day);

    return {
        ...state,
        docs: todayDocs,
    };
});

$dataTopBannersStore.on(topBannersAddDocsEvent, (state, data) => {
    if (data.docs.length === 0) {
        return state;
    }

    const newDocs = [...data.docs, ...state.docs];

    return {
        ...state,
        docs: newDocs,
    };
});

$dataTopBannersStore.on(topBannersAddDocEvent, (state, data) => {
    const newDocs = [...state.docs];

    newDocs.push(data.doc);

    return {
        ...state,
        docs: newDocs,
    };
});

$dataTopBannersStore.reset(topBannersSetDefaultStateEvent);

sample({
    clock: $dataTopBannersStore,
    source: $dataTopBannersSymbolGainersStore,
    fn: (state, data) => {
        const topThreeGainersSymbols = state.topThreeGainersSymbols.map((symbol) => {
            const lastNewsAboutSymbol = data.docs.find((news) =>
                news.symbols.some((symbolFromNews) => symbolFromNews.symbol === symbol.symbol)
            );

            if (lastNewsAboutSymbol) {
                symbol.title = lastNewsAboutSymbol.title;
            }

            return symbol;
        });

        return {
            topThreeGainersSymbols,
        };
    },
    target: $dataTopBannersSymbolGainersStore,
});

sample({
    clock: updateDataTopBannersSymbolsGainersEvent,
    source: combine(
        $dataTopBannersSymbolGainersStore,
        $dataTopBannersStore,
        (dataTopBannersSymbolGainersStore, dataTopBannersStore) => ({
            dataTopBannersSymbolGainersStore,
            dataTopBannersStore,
        })
    ),
    fn: (state, data) => {
        let topThreeGainersSymbols = [...state.dataTopBannersSymbolGainersStore.topThreeGainersSymbols];

        data.forEach((symbol) => {
            const parsedObject = parseRedisObject(symbol);
            const indexOfSymbolToUpdate = topThreeGainersSymbols.findIndex((topSymbol) =>
                topSymbol.symbol === parsedObject.symbol
            );

            if (indexOfSymbolToUpdate !== -1) {
                topThreeGainersSymbols[indexOfSymbolToUpdate].change = parsedObject.change;
            } else {
                const lastNewsAboutSymbol = state.dataTopBannersStore.docs.find((news) =>
                    news.symbols.some((symbolFromNews) => symbolFromNews.symbol === parsedObject.symbol)
                );

                if (lastNewsAboutSymbol) {
                    parsedObject.title = lastNewsAboutSymbol.title;
                }

                topThreeGainersSymbols.push(parsedObject);
            }
        });

        topThreeGainersSymbols.sort((a, b) => {
            if (a.change === undefined) {
                return 1;
            }

            if (b.change === undefined) {
                return -1;
            }

            return a.change < b.change ? 1 : -1;
        });

        topThreeGainersSymbols = topThreeGainersSymbols.filter(symbol =>
            symbol.change !== undefined
            && symbol.change > 0
        );

        topThreeGainersSymbols.splice(3);

        return {
            topThreeGainersSymbols,
        };
    },
    target: $dataTopBannersSymbolGainersStore,
});

sample({
    clock: $dataTopBannersStore,
    source: $dataTopBannersSymbolLosersStore,
    fn: (state, data) => {
        const topThreeLosersSymbols = state.topThreeLosersSymbols.map((symbol) => {
            const lastNewsAboutSymbol = data.docs.find((news) =>
                news.symbols.some((symbolFromNews) => symbolFromNews.symbol === symbol.symbol)
            );

            if (lastNewsAboutSymbol) {
                symbol.title = lastNewsAboutSymbol.title;
            }

            return symbol;
        });

        return {
            topThreeLosersSymbols,
        };
    },
    target: $dataTopBannersSymbolLosersStore,
});

sample({
    clock: updateDataTopBannersSymbolsLosersEvent,
    source: combine(
        $dataTopBannersSymbolLosersStore,
        $dataTopBannersStore,
        (dataTopBannersSymbolLosersStore, dataTopBannersStore) => ({
            dataTopBannersSymbolLosersStore,
            dataTopBannersStore,
        })
    ),
    fn: (state, data) => {
        let topThreeLosersSymbols = [...state.dataTopBannersSymbolLosersStore.topThreeLosersSymbols];

        data.forEach((symbol) => {
            const parsedObject = parseRedisObject(symbol);

            const indexOfSymbolToUpdate = topThreeLosersSymbols.findIndex((topSymbol) =>
                topSymbol.symbol === parsedObject.symbol
            );

            if (indexOfSymbolToUpdate !== -1) {
                topThreeLosersSymbols[indexOfSymbolToUpdate].change = parsedObject.change;
            } else {
                const lastNewsAboutSymbol = state.dataTopBannersStore.docs.find((news) =>
                    news.symbols.some((symbolFromNews) => symbolFromNews.symbol === parsedObject.symbol)
                );

                if (lastNewsAboutSymbol) {
                    parsedObject.title = lastNewsAboutSymbol.title;
                }

                topThreeLosersSymbols.push(parsedObject);
            }
        });

        topThreeLosersSymbols.sort((a, b) => {
            if (a.change === undefined) {
                return -1;
            }

            if (b.change === undefined) {
                return 1;
            }

            return a.change < b.change ? -1 : 1;
        });

        topThreeLosersSymbols = topThreeLosersSymbols.filter(symbol =>
            symbol.change !== undefined
            && symbol.change < 0
        );

        topThreeLosersSymbols.splice(3);

        return {
            topThreeLosersSymbols,
        };
    },
    target: $dataTopBannersSymbolLosersStore,
});

sample({
    clock: updateDataTopBannersSymbolsGapGainersEvent,
    source: $dataTopBannersSymbolGapGainersStore,
    fn: (state, data) => {
        const topThreeGainersSymbols = [...state.topThreeGainersSymbols];

        data.forEach((symbol) => {
            const parsedObject = parseRedisObject(symbol);

            const indexOfSymbolToUpdate = topThreeGainersSymbols.findIndex((topSymbol) =>
                topSymbol.symbol === parsedObject.symbol
            );

            if (indexOfSymbolToUpdate !== -1) {
                topThreeGainersSymbols[indexOfSymbolToUpdate].change = parsedObject.change;
            } else {
                topThreeGainersSymbols.push(parsedObject);
            }
        });

        topThreeGainersSymbols.sort((a, b) => {
            if (a.change === undefined) {
                return 1;
            }

            if (b.change === undefined) {
                return -1;
            }

            return a.change < b.change ? 1 : -1;
        });

        topThreeGainersSymbols.splice(3);

        return {
            topThreeGainersSymbols,
        };
    },
    target: $dataTopBannersSymbolGapGainersStore,
});

sample({
    clock: updateDataTopBannersSymbolsGapLosersEvent,
    source: $dataTopBannersSymbolGapLosersStore,
    fn: (state, data) => {
        const topThreeLosersSymbols = [...state.topThreeLosersSymbols];

        data.forEach((symbol) => {
            const parsedObject = parseRedisObject(symbol);

            const indexOfSymbolToUpdate = topThreeLosersSymbols.findIndex((topSymbol) =>
                topSymbol.symbol === parsedObject.symbol
            );

            if (indexOfSymbolToUpdate !== -1) {
                topThreeLosersSymbols[indexOfSymbolToUpdate].change = parsedObject.change;
            } else {
                topThreeLosersSymbols.push(parsedObject);
            }
        });

        topThreeLosersSymbols.sort((a, b) => {
            if (a.change === undefined) {
                return -1;
            }

            if (b.change === undefined) {
                return 1;
            }

            return a.change < b.change ? -1 : 1;
        });

        topThreeLosersSymbols.splice(3);

        return {
            topThreeLosersSymbols,
        };
    },
    target: $dataTopBannersSymbolGapLosersStore,
});

$dataTopBannersSymbolGainersStore.reset(resetDataTopBannersSymbolsGainersLosersEvent);
$dataTopBannersSymbolLosersStore.reset(resetDataTopBannersSymbolsGainersLosersEvent);

$dataTopBannersStore.reset(setDefaultStateEvent);
$dataTopBannersSymbolGainersStore.reset(setDefaultStateEvent);
$dataTopBannersSymbolLosersStore.reset(setDefaultStateEvent);
$dataTopBannersSymbolGapGainersStore.reset(setDefaultStateEvent);
$dataTopBannersSymbolGapLosersStore.reset(setDefaultStateEvent);
