import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/ui/Badge/Badge";
import { BadgeColor } from "@/components/ui/Badge/badgeTypes";
import { StyleSheet } from "react-native";
import CloseIcon from "@/assets/icons/close-icon.svg";

const MOCK_KEYWORDS = [
  { word: "электротранспорт", icon: "⚡", bgColor: "pink" },
  { word: "технологии", bgColor: "red" },
];

export const VisualOnlyKeywords = () => {
  return (
    <ThemedView>
      <ThemedText type='textLg' style={styles.title}>
        Visual only
      </ThemedText>

      <ThemedView style={styles.keywords}>
        {MOCK_KEYWORDS.map(keyword => (
          <Badge
            icon={<CloseIcon width={16} height={16} fill={keyword.bgColor} />}
            value={(keyword?.icon || "") + keyword.word}
            key={keyword.word}
            variant='keywords'
            size='xl'
            color={keyword.bgColor as BadgeColor}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  keywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
});
