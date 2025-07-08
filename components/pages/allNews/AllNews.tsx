import { FlatList, StyleSheet } from "react-native";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import Header from "@/components/ui/Header";
import React from "react";
import { TopNewsBlock } from "./TopNewsBlock/TopNewsBlock";
import { Filters } from "./Filters/Filters";
import { ListItem } from "./News/News";
import { MOCK_NEWS } from "@/mocks/allNews";

export default function AllNews() {
  return (
    <ThemedViewWithSafeArea
      style={styles.container}
      safeEdges={["right", "left"]}
    >
      <Header />
      <FlatList
        data={MOCK_NEWS}
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
        // stickyHeaderIndices={[1]}
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
