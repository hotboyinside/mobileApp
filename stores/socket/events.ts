import { WindowsNames } from '@/constants/socket/clientEvents';
import { IRedisSymbol } from '@/types/redisSymbol';
import { createEvent } from 'effector';

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

export const socketConnectedTrigger = createEvent<void>();
export const socketDisconnectedTrigger = createEvent<void>();
