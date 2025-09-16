import { createStore, createEvent } from 'effector';

const $dataCurrentDay = createStore<number>(new Date().getDay());

export const dataCommonDayChangedEvent = createEvent<{ day: number }>();
const dataCommonCheckIfDayChangedEvent = createEvent();

$dataCurrentDay.on(dataCommonCheckIfDayChangedEvent, (state) => {
    const currentDay = new Date().getDay();

    if (state !== currentDay) {
        dataCommonDayChangedEvent({ day: currentDay });
    }

    return currentDay;
});