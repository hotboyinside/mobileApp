import { FlatList, StyleSheet, View, Text } from "react-native";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import Header from "@/components/ui/Header";
import React from "react";
import { TopNewsBlock } from "./TopNewsBlock/TopNewsBlock";
import { Filters } from "./Filters";

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

export default function AllNews() {
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
          return (
            <>
              <TopNewsBlock />
              <Filters />
            </>
          );
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
