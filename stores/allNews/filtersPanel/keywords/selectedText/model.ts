import { combine, createEvent, createStore } from 'effector';
import {
	$keywordMode,
	cancelEditKeyword,
	finishEditKeyword,
	startEditKeyword,
} from '../model';
import { KeywordsMode } from '@/types/keywords';

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

const resetEvents = [cancelEditKeyword, finishEditKeyword];

$selectedText.reset(resetEvents);
