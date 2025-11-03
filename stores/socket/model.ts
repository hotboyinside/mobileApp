import {
	SocketClientEvents,
	WindowsNames,
} from '@/constants/socket/clientEvents';
import { IRedisSymbol } from '@/types/redisSymbol';
import { createEvent, createStore, sample } from 'effector';
import { Socket } from 'socket.io-client';
import {
	resetDataTopBannersSymbolsGainersLosersEvent,
	updateDataTopBannersSymbolsGainersEvent,
	updateDataTopBannersSymbolsGapGainersEvent,
	updateDataTopBannersSymbolsGapLosersEvent,
	updateDataTopBannersSymbolsLosersEvent,
} from '../allNews/topBannersData/model';
import { connectSocketFx } from './handlers';

enum SocketServerEvents {
	Symbols = 'symbols',
	StockTrade = 'stockTrade',
}

enum SocketBannersEvents {
	ClearGainersLosersSymbols = 'clearGainersLosersSymbols',
	BannersGainersSymbols = 'bannersGainersSymbols',
	BannersLosersSymbols = 'bannersLosersSymbols',
	BannersGainersGappersSymbols = 'bannersGainerGappersSymbols',
	BannersLosersGappersSymbols = 'bannersLoserGappersSymbols',
}

export const connectSocketEvent = createEvent();
export const disconnectSocketEvent = createEvent();

export const socketConnectedEvent = createEvent();
export const socketDisconnectedEvent = createEvent();

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

export const $socketSource = createStore<Socket | null>(null)
	.on(connectSocketFx.doneData, (_, socket) => socket)
	.on(disconnectSocketEvent, state => {
		state?.disconnect();
		return null;
	});

export const $isSocketConnected = createStore(false)
	.on(socketConnectedEvent, () => true)
	.on(socketDisconnectedEvent, () => false);

sample({
	clock: connectSocketFx.doneData,
	fn: socket => socket,
}).watch(socket => {
	if (!socket) return;

	socket.on('connect', () => {
		console.log(`✅ SOCKET connected ${socket.id}`);
		socketConnectedTrigger();
	});

	socket.on('disconnect', reason => {
		console.error('❌ SOCKET disconnected:', reason);
		socketDisconnectedTrigger();
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
});

const socketConnectedTrigger = createEvent<void>();
const socketDisconnectedTrigger = createEvent<void>();

sample({
	clock: socketConnectedTrigger,
	target: socketConnectedEvent,
});

sample({
	clock: socketDisconnectedTrigger,
	target: socketDisconnectedEvent,
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

sample({
	clock: connectSocketEvent,
	target: connectSocketFx,
});
