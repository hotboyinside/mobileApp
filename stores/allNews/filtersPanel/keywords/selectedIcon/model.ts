import { combine, createEvent, createStore, sample } from 'effector';
import {
	cancelEditKeyword,
	discardKeywords,
	finishEditKeyword,
	startEditKeyword,
} from '../model';

export const defaultSelectedKeyIcon = null;
export const $selectedKeyIcon = createStore<string | null>(
	defaultSelectedKeyIcon
);
export const $selectedKeyIconDraft = createStore<string | null>(null);
export const $hasChangesInSelectedIcon = combine(
	$selectedKeyIcon,
	$selectedKeyIconDraft,
	(selectedIcon, selectedIconDraft) => selectedIcon !== selectedIconDraft
);

export const changeSelectedKeyIconDraft = createEvent<string>();
export const applySelectedKeyIconClick = createEvent();

$selectedKeyIconDraft.on(changeSelectedKeyIconDraft, (_, payload) => payload);
$selectedKeyIcon.on(startEditKeyword, (_, payload) => payload.iconKey);

sample({
	clock: applySelectedKeyIconClick,
	source: $selectedKeyIconDraft,
	target: $selectedKeyIcon,
});

const resetEvents = [cancelEditKeyword, finishEditKeyword, discardKeywords];

$selectedKeyIcon.reset(resetEvents);
$selectedKeyIconDraft.reset(resetEvents);
