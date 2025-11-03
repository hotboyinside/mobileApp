import { config } from '@/config/vars';
import { createEffect } from 'effector';
import { io } from 'socket.io-client';

export const connectSocketFx = createEffect(() => {
	const socket = io(config.apiUrl, { transports: ['websocket'] });
	return socket;
});
