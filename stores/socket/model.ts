import { SocketClientEvents } from '@/constants/socket/clientEvents';
import { createStore, sample } from 'effector';
import { Socket } from 'socket.io-client';
import {
	connectSocketEvent,
	disconnectSocketEvent,
	socketConnectedEvent,
	socketConnectedTrigger,
	socketDisconnectedEvent,
	socketDisconnectedTrigger,
	subscribeAndUnsubscribeSymbolsEvent,
	subscribeTopBanners,
	subscribeToSymbolsEvent,
	unsubscribeTopBanners,
} from './events';
import { connectSocketFx } from './handlers';

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
