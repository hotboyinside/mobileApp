import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Tab } from "@/components/ui/Tab/Tab";
import { TabView } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { News } from "./TopNewsCard";
import { Cards } from "./TopNews";

export const topGainersMocks: News[] = [
  {
    symbol: "AAPL",
    title: "Apple акции растут",
    change: "5.67",
  },
  {
    symbol: "TSLA",
    title: "Акции Tesla упала на фоне проблем с поставками титана из России",
    change: "3.12",
  },
  {
    symbol: "BTC",
    title: "Биткоин продолжает уверенный рост",
    change: "2.34",
  },
];

export default function TopGainers() {
  const [index, setIndex] = useState(0);

  return (
    <ThemedView>
      <ThemedText type='textLg' style={styles.title}>
        Top Gainers
      </ThemedText>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        tabsTitles={["All Stocks", "With News or Filings"]}
      />
      <TabView
        value={index}
        onChange={setIndex}
        animationType='spring'
        disableSwipe
        containerStyle={{
          height: 116,
          marginTop: 16,
        }}
      >
        <TabView.Item>
          <Cards topNews={topGainersMocks} />
        </TabView.Item>
        <TabView.Item>
          <Cards topNews={topGainersMocks} />
        </TabView.Item>
      </TabView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
    marginBottom: 8,
  },
});
