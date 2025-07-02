import { ThemedText } from "@/components/ThemedText";
import ArrowDownIcon from "@/assets/icons/alt-arrow-down-icon.svg";
import ArrowUpIcon from "@/assets/icons/alt-arrow-up-icon.svg";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/ui/Badge/Badge";
import React from "react";
import { StyleSheet, View } from "react-native";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";

export type News = {
  symbol: string;
  change: string;
  title?: string;
};

export const TopNewsCard = ({ symbol, title, change }: News) => {
  const isPositiveChange = parseFloat(change) > 0;

  const borderContainerColor = useThemeColor({}, appTokens.border.tertiary);
  const textColor = useThemeColor(
    {},
    isPositiveChange
      ? appTokens.text.successPrimary
      : appTokens.text.errorPrimary
  );
  const iconColor = useThemeColor(
    {},
    isPositiveChange
      ? appTokens.foreground.successPrimary
      : appTokens.foreground.errorPrimary
  );

  return (
    <ThemedView
      style={[styles.container, { borderColor: borderContainerColor }]}
    >
      <Badge
        variant='keywords'
        color={isPositiveChange ? "green" : "red"}
        size='sm'
        value={symbol}
      />
      <ThemedText
        style={styles.title}
        type='textXs'
        numberOfLines={2}
        ellipsizeMode='tail'
      >
        {title ?? "No title"}
      </ThemedText>
      <View style={styles.changeContainer}>
        <View style={styles.iconBox}>
          {isPositiveChange && (
            <ArrowUpIcon width={16} height={16} color={iconColor} />
          )}
          {!isPositiveChange && (
            <ArrowDownIcon width={16} height={16} color={iconColor} />
          )}
        </View>
        <ThemedText style={[styles.change, { color: textColor }]} type='textXs'>
          {change}%
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    flex: 1,
    alignItems: "flex-start",
    gap: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
  },

  title: {
    minHeight: 36,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "MontserratSemiBold",
  },

  changeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBox: {
    paddingTop: 5,
    marginRight: 2,
  },

  change: {
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
  },
});
