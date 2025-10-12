# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

### ⚠️ Using React Native Firebase with Expo

In Expo SDK 54+, **Expo Go does not support native Firebase modules** (e.g., `@react-native-firebase/messaging`).  
Running `expo start` or `expo run` in dev mode will fail with:

**Solution:** Use a release build or custom dev client:

In the output, you'll find options to open the app in a

## Plans

- Check TabItem styles
- Add full touch opacity in rangeInput
- Improve all icons (delete fill; delete "currentColor")
- Don't show correct number of enabled filters before press on the button
- Add animated in KeywordColorPicker for colors buttons
- Remake structure of stores (keywords relate to all pages, not only for all news)
- rename effector's events functions names (fnFx -> handleFn or onFn) - in progress
- check shadow - in progress
- close tab's stores when swipe modal sheet
- delete sse events logs
- reset errors/input stores after quit filter's page
- finish work with symbol change
- delete repeated news
- work with imports
- add status bar
- add "Not Found" page

## Bugs associated with version

- react-native: 0.79.2 - 0.79.5:  
  Sticky header not working on Android devices when scrolling.  
  **Solution:** Replace `onPress` with `onPressIn`.

# Android build (test)

> npx expo prebuild
> ./gradlew clean
> EXPO_PUBLIC_API_URL=https://test-news-scan-app.staging.forasoft.com ./gradlew assembleRelease

# Checks logs on emulator

npx expo run:android --no-build-cache --device

> adb logcat \*:S ReactNative:V ReactNativeJS:V
