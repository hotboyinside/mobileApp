# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

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
