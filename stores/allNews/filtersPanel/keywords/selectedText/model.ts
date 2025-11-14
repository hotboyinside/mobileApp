import { KeywordsMode } from '@/types/keywords';
import { combine, createEvent, createStore } from 'effector';
import {
	$keywordMode,
	cancelEditKeyword,
	discardKeywords,
	finishEditKeyword,
	startEditKeyword,
} from '../model';

export const defaultSelectedText = '';
export const $selectedText = createStore<string>(defaultSelectedText);
export const $isNotEmptyValueInInsertMode = combine(
	$selectedText,
	$keywordMode,
	(selectedText, keywordMode) => {
		if (keywordMode === KeywordsMode.InsertMode) {
			return selectedText.trim() !== defaultSelectedText;
		}

		return false;
	}
);

export const changeSelectedText = createEvent<string>();

$selectedText.on(changeSelectedText, (_, payload) => payload);
$selectedText.on(startEditKeyword, (_, payload) => payload.word);

const resetEvents = [cancelEditKeyword, finishEditKeyword, discardKeywords];

$selectedText.reset(resetEvents);
