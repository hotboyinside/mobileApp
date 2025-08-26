import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet } from "react-native";
import { HeaderBottomSheet } from "../HeaderBottomSheet";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { FC } from "react";
import { keywordsIcons } from "@/assets/icons/keywordsIcons";
import { SvgProps } from "react-native-svg";
import { useUnit } from "effector-react";
import {
  $selectedIconDraft,
  changeSelectedIconDraft,
} from "@/stores/allNews/filtersPanel/keywords/selectedIcon/model";

type KeywordIconPickerProps = {
  onClose: () => void;
};

export const KeywordIconPicker = ({ onClose }: KeywordIconPickerProps) => {
  const selectedIconDraft = useUnit($selectedIconDraft);
  const onChangeSelectedIconDraft = useUnit(changeSelectedIconDraft);

  const bgColor = useThemeColor({}, appTokens.background.secondarySubtle);
  const iconInactiveColor = useThemeColor(
    {},
    appTokens.component.buttons.linkGray.fg
  );
  const iconActiveColor = useThemeColor(
    {},
    appTokens.component.buttons.secondaryGray.fg
  );
  const borderInactiveColor = useThemeColor({}, appTokens.border.tertiary);
  const borderActiveColor = useThemeColor({}, appTokens.border.brand);

  return (
    <BottomSheetScrollView
      style={styles.wrapper}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <HeaderBottomSheet
        headerLabel='Icon'
        onCloseFilters={() => {
          onClose();
        }}
      />
      <ThemedView style={styles.container}>
        {keywordsIcons.map((Icon: FC<SvgProps>, index) => (
          <Pressable
            key={index}
            onPress={() => {
              onChangeSelectedIconDraft(Icon);
            }}
            style={({ pressed }) => [
              styles.iconWrapper,
              { backgroundColor: bgColor },
              selectedIconDraft === Icon
                ? { borderColor: borderActiveColor }
                : { borderColor: borderInactiveColor },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.5 },
            ]}
          >
            <Icon
              width={24}
              height={24}
              fill={
                selectedIconDraft === Icon ? iconActiveColor : iconInactiveColor
              }
            />
          </Pressable>
        ))}
      </ThemedView>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8",
    padding: 16,
  },

  iconWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
});
