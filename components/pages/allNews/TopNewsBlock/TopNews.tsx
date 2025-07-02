import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TopNewsCard, News } from "./TopNewsCard";

type TopNewsProps = {
  topNews: News[];
};

export const TopNews = ({ topNews }: TopNewsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {topNews.map(news => (
        <TopNewsCard
          key={news.symbol}
          symbol={news.symbol}
          change={news.change}
          title={news.title}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
