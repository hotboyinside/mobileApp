import { combine, createEvent, createStore, sample } from 'effector';
import { KeywordsColorVariants } from '@/types/keywords';
import {
	cancelEditKeyword,
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

const resetEvents = [cancelEditKeyword, finishEditKeyword];

$selectedColor.reset(resetEvents);
$selectedColorDraft.reset(resetEvents);
