import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { ThemedText } from "@/components/ThemedText";
import { Change } from "@/components/ui/Change/Change";

type SymbolStatsProps = {
  symbol: {
    symbol: string;
    price: number;
    absoluteChange: number;
    priceChange: number;
    volume: number;
    float: number;
    daysRange: number;
  };
};

export const SymbolStats = ({ symbol }: SymbolStatsProps) => {
  const { price, absoluteChange, priceChange, volume, float, daysRange } =
    symbol;

  const symbolMap = [
    {
      title: "$ Change",
      value: <Change value={priceChange} showPercent={false} />,
    },
    { title: "Volume", value: volume },
    { title: "Float", value: float },
    { title: "Day Range", value: daysRange },
  ];

  const borderColor = useThemeColor({}, appTokens.border.tertiary);
  const bgColor = useThemeColor({}, appTokens.background.secondarySubtle);

  return (
    <View
      style={[
        styles.container,
        { borderColor: borderColor, backgroundColor: bgColor },
      ]}
    >
      <View style={[{ borderBottomColor: borderColor }, styles.header]}>
        <ThemedText color={appTokens.text.secondary} style={styles.symbolName}>
          {symbol.symbol}
        </ThemedText>
        <View style={styles.change}>
          <ThemedText type='textMd' style={styles.currentPrice}>
            {price ?? "-"}
          </ThemedText>
          {absoluteChange && (
            <Change value={absoluteChange} priceChange={priceChange} />
          )}
        </View>
      </View>
      <View style={styles.values}>
        {symbolMap.map(row => (
          <View style={styles.row} key={row.title}>
            <ThemedText
              color={appTokens.text.quaternary}
              type='textSm'
              style={styles.title}
            >
              {row.title}
            </ThemedText>
            <ThemedText
              color={appTokens.text.secondary}
              type='textSm'
              style={styles.value}
            >
              {row.value ?? "-"}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    padding: 12,
  },

  symbolName: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1,
  },

  change: {
    flexDirection: "row",
    gap: 4,
  },

  currentPrice: {
    fontWeight: 700,
    fontFamily: "MontserratSemiBold",
  },

  values: {
    marginTop: 16,
    gap: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  value: {
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },
});
