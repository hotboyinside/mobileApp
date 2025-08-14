import { Badge } from "@/components/ui/Badge/Badge";
import { Change } from "@/components/ui/Change/Change";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BadgeColor } from "@/components/ui/Badge/badgeTypes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { NEWS_DETAILS } from "@/constants/routes";
import React from "react";
import { StarRating } from "@/components/ui/StarRating";

export type Symbol = {
  symbol: string;
  currentPrice: string;
  absoluteChange: string;
  changePrice: string;
  volume: string;
  float: string;
  dayRange: string;
};

export type Keyword = {
  text: string;
  icon?: string;
  bgColor: string;
};

export type MockItem = {
  id: number;
  title: string;
  description: string;
  createdTime: string;
  rating: 0 | 1 | 2 | 3 | 4;
  keywords: Keyword[];
  symbols: Symbol[];
};

type ListItemProps = {
  item: MockItem;
};

export const ListItem = ({ item }: ListItemProps) => {
  const { title, createdTime, rating, keywords, symbols } = item;
  const router = useRouter();

  const timeColor = useThemeColor({}, appTokens.text.quaternary);

  const handlePress = () => {
    router.push(NEWS_DETAILS(item.id.toString()));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={handlePress}
    >
      <View style={styles.top}>
        <View style={styles.symbols}>
          {symbols.map(symbol => (
            <View style={styles.symbolWithChange} key={symbol.symbol}>
              <Badge
                variant='pillColor'
                size='sm'
                color='gray'
                value={symbol.symbol}
              />
              <Change size='xs' value={symbol.absoluteChange} />
            </View>
          ))}
        </View>
        <StarRating rating={rating} />
      </View>
      <ThemedText type='textSm' style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.keywords}>
        {keywords.map(keyword => (
          <Badge
            value={(keyword?.icon || "") + keyword.text}
            key={keyword.text}
            variant='keywords'
            size='sm'
            color={keyword.bgColor as BadgeColor}
          />
        ))}
      </View>
      <ThemedText type='textXs' style={[styles.time, { color: timeColor }]}>
        {createdTime}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  top: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },

  symbols: {
    maxWidth: "75%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },

  symbolWithChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  title: {
    marginTop: 12,
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },

  keywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
  },

  keyword: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  time: {
    marginTop: 12,
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },
});
