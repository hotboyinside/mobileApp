import { combine, createEvent, createStore, sample } from "effector";
import { SvgProps } from "react-native-svg";
import { FC } from "react";

export const $selectedIcon = createStore<FC<SvgProps> | null>(null);
export const $selectedIconDraft = createStore<FC<SvgProps> | null>(null);
export const $hasChangesInSelectedIcon = combine(
  $selectedIcon,
  $selectedIconDraft,
  (selectedIcon, selectedIconDraft) => selectedIcon !== selectedIconDraft
);

export const changeSelectedIconDraft = createEvent<FC<SvgProps>>();
export const applySelectedIconClick = createEvent();

$selectedIconDraft.on(changeSelectedIconDraft, (_, payload) => payload);

sample({
  clock: applySelectedIconClick,
  source: $selectedIconDraft,
  target: $selectedIcon,
});
