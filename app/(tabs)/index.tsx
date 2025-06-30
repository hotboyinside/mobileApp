import { FlatList, StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import Header from "@/components/ui/Header";
import React from "react";
import { Tab } from '@/components/ui/Tab/Tab';

type MockItem = {
  id: number;
  title: string;
  description: string;
  category: string;
};

export const MOCK_ITEMS: MockItem[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index + 1,
    title: `Элемент #${index + 1}`,
    description: `Описание для элемента #${index + 1}`,
    category: index % 2 === 0 ? "new" : "popular",
  })
);

type ListItemProps = {
  item: MockItem;
};

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <View style={listStyles.container}>
      <View style={listStyles.textContainer}>
        <Text style={listStyles.title}>{item.title}</Text>
        <Text style={listStyles.description}>{item.description}</Text>
        <Text>Категория: {item.category}</Text>
      </View>
    </View>
  );
};

const listStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "#666",
    fontSize: 14,
  },
});

const TopBlock = () => {
  return (
    <ThemedView style={topBlockStyles.container}>
      <ThemedText type='textLg' style={topBlockStyles.title}>
        Top Gainers
      </ThemedText>
      <Tab>
				<Tab.Item
					title='All Stocks'
					titleStyle={topBlockStyles.itemStyles}
				/>
				<Tab.Item
					title='With News or Filings'
					titleStyle={topBlockStyles.itemStyles}
				/>
      </Tab>
    </ThemedView>
  );
};

const topBlockStyles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },

  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

	itemStyles: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		fontFamily: 'MontserratSemiBold',
    fontWeight: 600,
    fontSize: 14,
	}
});

export default function HomeScreen() {
  return (
    <ThemedViewWithSafeArea
      style={styles.container}
      safeEdges={["right", "left"]}
    >
      <Header />
      <FlatList
        data={MOCK_ITEMS}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={() => {
          return <TopBlock />;
        }}
      ></FlatList>
    </ThemedViewWithSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
