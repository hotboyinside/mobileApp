import { createStore, createEvent } from 'effector';

export const tick = createEvent();
export const $now = createStore(new Date())

$now.on(tick, () => new Date());