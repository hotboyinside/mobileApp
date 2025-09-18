import { createStore, createEvent } from "effector";
import { AppStateStatus } from "react-native";

export const $appState = createStore<AppStateStatus>("active")

export const appStateChanged = createEvent<AppStateStatus>();

$appState.on(appStateChanged, (_, newState) => newState)