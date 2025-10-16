import MagnifierIcon from "@/assets/icons/magnifier-icon.svg";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

export default function EmptyNewsPlaceholder() {
  const iconColor = useThemeColor(appTokens.foreground.brandPrimary);
  const backgroundIconColor = useThemeColor(appTokens.background.brandPrimary);
  const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <ThemedView
        style={[styles.iconContainer, { backgroundColor: backgroundIconColor }]}
      >
        <MagnifierIcon width={36} height={36} color={iconColor} />
      </ThemedView>
      <ThemedText type='textXl' style={styles.title}>
        Nothing found
      </ThemedText>
      <ThemedText
        type='textMd'
        tokenColor={appTokens.text.secondary}
        style={styles.description}
      >
        Please try another search request
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  iconContainer: {
    borderRadius: 16,
    padding: 12,
  },

  title: {
    marginTop: 16,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },

  description: {
    marginTop: 4,
    fontWeight: 400,
    fontFamily: "MontserratRegular",
  },
});
