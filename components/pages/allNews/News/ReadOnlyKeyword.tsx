import { keywordsIcons } from "@/assets/icons/keywordsIcons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/ui/Badge/Badge";
import { keywordsColors, UserKeyword } from "@/types/keywords";
import { StyleSheet } from "react-native";

export const ReadOnlyKeyword = ({ keyword }: { keyword: UserKeyword }) => {
  const Icon = keywordsIcons[keyword.iconKey || "smile"];
  const bgColor = keywordsColors[keyword.color].background;
  const textColor = keywordsColors[keyword.color].text;
  const iconColor = keywordsColors[keyword.color].icon;

  return (
    <Badge
      value={
        <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
          <Icon fill={iconColor} width={16} height={16} />
          <ThemedText
            type='textXs'
            style={[styles.label, { color: textColor }]}
          >
            {keyword.word}
          </ThemedText>
        </ThemedView>
      }
      variant='keywords'
      size='sm'
      badgeStyle={{ backgroundColor: bgColor }}
      textStyle={{ color: textColor }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  label: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },
});
