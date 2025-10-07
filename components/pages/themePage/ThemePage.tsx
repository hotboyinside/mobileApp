import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import { Button } from "@/components/ui/Button";
import { goBack } from "expo-router/build/global-state/routing";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ArrowIcon from "@/assets/icons/arrow-left-soft-icon.svg";
import MoonIcon from "@/assets/icons/moon-icon.svg";
import ThemeIcon from "@/assets/icons/theme-icon.svg";
import SunIcon from "@/assets/icons/sun-icon.svg";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUnit } from "effector-react";
import { $appTheme, setAppTheme } from "@/stores/userSettings/theme/model";
import { AppTheme } from "@/constants/appTheme";

export const ThemePage = () => {
  const appTheme = useUnit($appTheme);

  const onSetAppTheme = useUnit(setAppTheme);

  const borderBrandColor = useThemeColor(appTokens.border.brand);
  const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
  const backButtonColor = useThemeColor(
    appTokens.component.buttons.secondaryGray.fg
  );
  const iconFgColor = useThemeColor(appTokens.foreground.disabled);

  return (
    <ThemedViewWithSafeArea
      safeEdges={["top", "bottom"]}
      style={styles.wrapper}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Button
            variant='secondary'
            onlyIcon
            icon={<ArrowIcon width={20} height={20} fill={backButtonColor} />}
            onPress={goBack}
          />
          <ThemedText type='textMd' style={styles.title}>
            Theme
          </ThemedText>
          <View style={styles.mock} />
        </ThemedView>

        <ThemedView style={styles.content}>
          <ThemedView style={styles.buttons}>
            <Pressable
              onPress={() => onSetAppTheme(AppTheme.Light)}
              style={[
                styles.button,
                {
                  borderColor:
                    appTheme === AppTheme.Light
                      ? borderBrandColor
                      : borderTertiaryColor,
                },
              ]}
            >
              <SunIcon
                width={32}
                height={32}
                fill={iconFgColor}
                style={styles.buttonIcon}
              />
              <ThemedText type='textMd' style={styles.buttonTitle}>
                Light
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => onSetAppTheme(AppTheme.Dark)}
              style={[
                styles.button,
                {
                  borderColor:
                    appTheme === AppTheme.Dark
                      ? borderBrandColor
                      : borderTertiaryColor,
                },
              ]}
            >
              <MoonIcon
                width={32}
                height={32}
                fill={iconFgColor}
                style={styles.buttonIcon}
              />
              <ThemedText type='textMd' style={styles.buttonTitle}>
                Dark
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => onSetAppTheme(AppTheme.System)}
              style={[
                styles.button,
                {
                  borderColor:
                    appTheme === AppTheme.System
                      ? borderBrandColor
                      : borderTertiaryColor,
                },
              ]}
            >
              <ThemeIcon
                width={32}
                height={32}
                fill={iconFgColor}
                style={styles.buttonIcon}
              />
              <ThemedText type='textMd' style={styles.buttonTitle}>
                System
              </ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedText
            style={styles.description}
            tokenColor={appTokens.text.quaternary}
            type='textXs'
          >
            System theme — matches your device’s light or dark mode
            automatically.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedViewWithSafeArea>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    marginHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },

  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  mock: {
    width: 40,
    height: 40,
  },

  content: {
    paddingTop: 24,
  },

  buttons: {
    flexDirection: "row",
    gap: 8,
  },

  button: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
  },

  buttonIcon: {
    marginBottom: 8,
  },

  buttonTitle: {
    minWidth: 70,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },

  description: {
    marginTop: 12,
    fontWeight: 400,
    fontFamily: "MontserratRegular",
  },
});
