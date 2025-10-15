import { config } from '@/config/vars';
import {
	SocketClientEvents,
	WindowsNames,
} from '@/constants/socket/clientEvents';
import { IRedisSymbol } from '@/types/redisSymbol';
import { createEvent, createStore } from 'effector';
import { io, Socket } from 'socket.io-client';
import {
	resetDataTopBannersSymbolsGainersLosersEvent,
	updateDataTopBannersSymbolsGainersEvent,
	updateDataTopBannersSymbolsGapGainersEvent,
	updateDataTopBannersSymbolsGapLosersEvent,
	updateDataTopBannersSymbolsLosersEvent,
} from '../allNews/topBannersData/model';

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
export const $socketSource = createStore<Socket | null>(null);

export const connectSocketEvent = createEvent();
export const receiveSocketSymbolsEvent = createEvent<{
	symbols: IRedisSymbol[];
}>();
export const subscribeToSymbolsEvent = createEvent<{
	symbols: string[];
}>();
export const subscribeAndUnsubscribeSymbolsEvent = createEvent<{
	symbolsToSubscribe: string[];
	symbolsToUnsubscribe: string[];
	windowName: WindowsNames;
}>();
export const subscribeTopBanners = createEvent();
export const unsubscribeTopBanners = createEvent();

$socketSource.on(connectSocketEvent, state => {
	state?.disconnect();

	const socket = io(config.apiUrl, {
		transports: ['websocket'],
	});

	socket.on('connect', () => {
		console.log(`✅ SOCKET connected ${socket.id}`);
	});

	socket.on('disconnect', reason => {
		console.error('❌ SOCKET Disconnected', reason);
	});

	socket.on(SocketServerEvents.Symbols, receiveSocketSymbolsEvent);

	socket.on(
		SocketBannersEvents.ClearGainersLosersSymbols,
		resetDataTopBannersSymbolsGainersLosersEvent
	);
	socket.on(
		SocketBannersEvents.BannersGainersSymbols,
		updateDataTopBannersSymbolsGainersEvent
	);
	socket.on(
		SocketBannersEvents.BannersGainersGappersSymbols,
		updateDataTopBannersSymbolsGapGainersEvent
	);
	socket.on(
		SocketBannersEvents.BannersLosersSymbols,
		updateDataTopBannersSymbolsLosersEvent
	);
	socket.on(
		SocketBannersEvents.BannersLosersGappersSymbols,
		updateDataTopBannersSymbolsGapLosersEvent
	);

	return socket;
});

$socketSource.on(subscribeToSymbolsEvent, (state, data) => {
	state?.emit(SocketClientEvents.SubscribeToSymbol, data);
	return state;
});

$socketSource.on(subscribeAndUnsubscribeSymbolsEvent, (state, data) => {
	state?.emit(SocketClientEvents.SubscribeAndUnsubscribeSymbols, data);
	return state;
});

$socketSource.on(subscribeTopBanners, state => {
	state?.emit(SocketClientEvents.SubscribeTopBanners);
	return state;
});

$socketSource.on(unsubscribeTopBanners, state => {
	state?.emit(SocketClientEvents.UnsubscribeTopBanners);
	return state;
});
