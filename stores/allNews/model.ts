import { createEvent, sample } from 'effector';
import { initializeFiltersFx } from './handlers';

export const pageMounted = createEvent();

sample({
	clock: pageMounted,
	target: initializeFiltersFx,
});
