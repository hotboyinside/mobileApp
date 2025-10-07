import { createEffect } from "effector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppTheme } from "@/constants/appTheme";

const STORAGE_KEY = "appTheme";

export const loadAppThemeFx = createEffect(async (): Promise<AppTheme> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value && Object.values(AppTheme).includes(value as AppTheme)) {
      return value as AppTheme;
    }
  } catch (error) {
    console.error("Error loading app theme from AsyncStorage", error);
  }
  return AppTheme.System;
});

export const saveAppThemeFx = createEffect(async (theme: AppTheme) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.error("Error saving app theme to AsyncStorage", error);
  }
});
