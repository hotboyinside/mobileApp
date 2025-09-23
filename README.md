# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start/npm run start
   ```

In the output, you'll find options to open the app in a

## Plans

- Check TabItem styles
- Add full touch opacity in rangeInput
- Improve all icons (delete fill; delete "currentColor")
- Don't show correct number of enabled filters before press on the button
- Add animated in KeywordColorPicker for colors buttons
- Remake structure of stores (keywords relate to all pages, not only for all news)
- rename effector's events functions names (fnFx -> handleFn or onFn)
- check dark mode styles
- check shadow
- close tab's stores when swipe modal sheet
- delete sse events logs
- connect star rating with backend; reset errors/input stores after quit filter's page
- finish work with symbol change
- delete repeated news

## Bugs associated with version

- react-native: 0.79.2 - 0.79.5:  
  Sticky header not working on Android devices when scrolling.  
  **Solution:** Replace `onPress` with `onPressIn`.

# Android build (test)

> npx expo prebuild
> ./gradlew clean
> EXPO_PUBLIC_API_URL=https://test-news-scan-app.staging.forasoft.com ./gradlew assembleRelease

# Checks logs on emulator

> adb logcat \*:S ReactNative:V ReactNativeJS:V
