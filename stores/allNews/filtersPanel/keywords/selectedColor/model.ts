import { KeywordsColorVariants } from '@/types/keywords';
import { combine, createEvent, createStore, sample } from 'effector';
import {
	cancelEditKeyword,
	discardKeywords,
	finishEditKeyword,
	startEditKeyword,
} from '../model';

export const defaultSelectedColor = KeywordsColorVariants.Red;
export const $selectedColor =
	createStore<KeywordsColorVariants>(defaultSelectedColor);
export const $selectedColorDraft = createStore<KeywordsColorVariants>(
	KeywordsColorVariants.Red
);
export const $hasChangesInSelectedColor = combine(
	$selectedColor,
	$selectedColorDraft,
	(selectedColor, selectedColorDraft) => selectedColor !== selectedColorDraft
);

export const changeDraftSelectedColor = createEvent<KeywordsColorVariants>();
export const applySelectedColorClick = createEvent();

$selectedColorDraft.on(changeDraftSelectedColor, (_, payload) => payload);
$selectedColor.on(startEditKeyword, (_, payload) => payload.color);

sample({
	clock: applySelectedColorClick,
	source: $selectedColorDraft,
	target: $selectedColor,
});

const resetEvents = [cancelEditKeyword, finishEditKeyword, discardKeywords];

$selectedColor.reset(resetEvents);
$selectedColorDraft.reset(resetEvents);
