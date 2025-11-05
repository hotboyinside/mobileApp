import { config } from '@/config/vars';
import { SocketBannersEvents, SocketServerEvents } from '@/types/socket';
import { createEffect, sample } from 'effector';
import { io, Socket } from 'socket.io-client';
import {
	resetDataTopBannersSymbolsGainersLosersEvent,
	updateDataTopBannersSymbolsGainersEvent,
	updateDataTopBannersSymbolsGapGainersEvent,
	updateDataTopBannersSymbolsGapLosersEvent,
	updateDataTopBannersSymbolsLosersEvent,
} from '../allNews/topBannersData/model';
import {
	receiveSocketSymbolsEvent,
	socketConnectedTrigger,
	socketDisconnectedTrigger,
} from './events';

export const connectSocketFx = createEffect(() => {
	const socket = io(config.apiUrl, { transports: ['websocket'] });
	return socket;
});
export const startSocketFx = createEffect((socket: Socket) => {
	if (!socket) {
		return;
	}

	socket.on('connect', () => {
		console.log(`✅ SOCKET connected ${socket.id}`);
		queueMicrotask(() => socketConnectedTrigger());
	});

	socket.on('disconnect', reason => {
		console.warn('❌ SOCKET disconnected:', reason);
		queueMicrotask(() => socketDisconnectedTrigger());
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

sample({
	clock: connectSocketFx.doneData,
	target: startSocketFx,
});
