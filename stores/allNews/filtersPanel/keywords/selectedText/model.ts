import { combine, createEvent, createStore } from 'effector';

export const $selectedText = createStore<string>('');
export const $selectedTextDraft = createStore<string>('');
export const $hasChangesInSelectedIcon = combine(
	$selectedText,
	$selectedTextDraft,
	(selectedIcon, selectedIconDraft) => selectedIcon !== selectedIconDraft
);

export const changeSelectedTextDraft = createEvent<string>();

$selectedTextDraft.on(changeSelectedTextDraft, (_, payload) => payload);
