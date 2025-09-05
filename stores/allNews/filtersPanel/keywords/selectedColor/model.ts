import { combine, createEvent, createStore, sample } from 'effector';
import { KeywordsColorVariants } from '@/types/keywords';
import { editKeyword } from '../model';

export const $selectedColor = createStore<KeywordsColorVariants>(
	KeywordsColorVariants.Red
);
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
$selectedColorDraft.on(editKeyword, (_, payload) => payload.color);

sample({
	clock: applySelectedColorClick,
	source: $selectedColorDraft,
	target: $selectedColor,
});
