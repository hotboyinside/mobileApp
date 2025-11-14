import { createEvent, createStore } from 'effector';
import {
	cancelEditKeyword,
	discardKeywords,
	finishEditKeyword,
	startEditKeyword,
} from '../model';

export const defaultIsSelectedVoiceoverState = false;
export const $isSelectedVoiceoverEnabled = createStore<boolean>(
	defaultIsSelectedVoiceoverState
);

export const toggleIsSelectedVoiceoverEnabled = createEvent();

$isSelectedVoiceoverEnabled.on(
	toggleIsSelectedVoiceoverEnabled,
	(state, _) => !state
);
$isSelectedVoiceoverEnabled.on(
	startEditKeyword,
	(_, payload) => payload.isVoiceoverEnabled
);

$isSelectedVoiceoverEnabled.reset(cancelEditKeyword);
$isSelectedVoiceoverEnabled.reset(finishEditKeyword);
$isSelectedVoiceoverEnabled.reset(discardKeywords);
