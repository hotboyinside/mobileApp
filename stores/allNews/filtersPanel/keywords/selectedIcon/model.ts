import { combine, createEvent, createStore, sample } from 'effector';
import { editKeyword } from '../model';

export const $selectedKeyIcon = createStore<string | null>(null);
export const $selectedKeyIconDraft = createStore<string | null>(null);
export const $hasChangesInSelectedIcon = combine(
	$selectedKeyIcon,
	$selectedKeyIconDraft,
	(selectedIcon, selectedIconDraft) => selectedIcon !== selectedIconDraft
);

export const changeSelectedKeyIconDraft = createEvent<string>();
export const applySelectedKeyIconClick = createEvent();

$selectedKeyIconDraft.on(changeSelectedKeyIconDraft, (_, payload) => payload);
$selectedKeyIconDraft.on(editKeyword, (_, payload) => payload.iconKey);

sample({
	clock: applySelectedKeyIconClick,
	source: $selectedKeyIconDraft,
	target: $selectedKeyIcon,
});
