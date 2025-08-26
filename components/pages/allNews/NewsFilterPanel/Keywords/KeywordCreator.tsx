import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StyleSheet } from "react-native";
import CheckLineIcon from "@/assets/icons/check-line-icon.svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import CircleIcon from "@/assets/icons/circle-icon.svg";
import SmileIcon from "@/assets/icons/smile-icon.svg";
import VoiceOverOff from "@/assets/icons/voiceover-off-icon.svg";
import { useGlobalSheet } from "@/components/appProvider/sheetModal/GlobalSheetProvider";
import { KeywordColorPicker } from "./KeywordColorPicker";
import { BottomSheetApplyFooter } from "../BottomSheetApplyFooter";
import { useUnit } from "effector-react";
import { $selectedColor } from "@/stores/allNews/filtersPanel/keywords/selectedColor/model";
import { keywordsColors } from "@/types/keywords";
import { KeywordIconPicker } from "./KeywordIconPicker";
import {
  openFilterSubTab,
  closeFilterSubTab,
  FilterSubTabVariant,
} from "@/stores/allNews/filtersPanel/model";
import { $selectedIcon } from "@/stores/allNews/filtersPanel/keywords/selectedIcon/model";
import {
  $selectedVoiceoverState,
  toggleSelectedVoiceoverState,
} from "@/stores/allNews/filtersPanel/keywords/selectedVoiceOverState/model";

export const KeywordCreator = () => {
  const { openSheetModal, closeSheetModal } = useGlobalSheet();
  const selectedColor = useUnit($selectedColor);
  const selectedIcon = useUnit($selectedIcon);
  const selectedVoiceoverState = useUnit($selectedVoiceoverState);

  const onToggleSelectedVoiceoverState = useUnit(toggleSelectedVoiceoverState);
  const onOpenFilterSubTab = useUnit(openFilterSubTab);
  const onCloseFilterSubTab = useUnit(closeFilterSubTab);

  const CurrentIcon = selectedIcon || SmileIcon;

  const disabledColor = useThemeColor({}, appTokens.foreground.disabled);
  const borderColor = useThemeColor({}, appTokens.border.tertiary);
  const utilityGray = useThemeColor({}, appTokens.utilityGray[400]);
  const tertiaryGray = useThemeColor(
    {},
    appTokens.component.buttons.tertiaryGray.fg
  );

  const openKeywordColorPickerSheet = () => {
    onOpenFilterSubTab(FilterSubTabVariant.keywordsColor);
    openSheetModal(
      "secondary",
      <KeywordColorPicker
        onClose={() => {
          closeSheetModal("secondary");
        }}
      />,
      props => (
        <BottomSheetApplyFooter
          {...props}
          applyButtonTitle='Save'
          onClose={() => {
            onCloseFilterSubTab();
            closeSheetModal("secondary");
          }}
        />
      )
    );
  };

  const openKeywordIconPickerSheet = () => {
    onOpenFilterSubTab(FilterSubTabVariant.keywordsIcon);
    openSheetModal(
      "secondary",
      <KeywordIconPicker
        onClose={() => {
          onCloseFilterSubTab();
          closeSheetModal("secondary");
        }}
      />,
      props => (
        <BottomSheetApplyFooter
          {...props}
          applyButtonTitle='Save'
          onClose={() => {
            closeSheetModal("secondary");
          }}
        />
      )
    );
  };

  return (
    <ThemedView style={[styles.container, { borderColor: borderColor }]}>
      <ThemedView style={styles.topButtons}>
        <Input
          placeholder='Add keyword'
          containerStyle={styles.inputContainer}
        />
        <Button
          variant='secondary'
          size='lg'
          onlyIcon
          icon={<CheckLineIcon width={20} height={20} fill={disabledColor} />}
        />
      </ThemedView>
      <ThemedView style={styles.bottomButtons}>
        <Button
          icon={
            <CircleIcon
              width={20}
              height={20}
              fill={keywordsColors[selectedColor]}
            />
          }
          title={selectedColor}
          variant='link-gray'
          iconPosition='left'
          titleStyle={{ color: tertiaryGray }}
          onPress={openKeywordColorPickerSheet}
        />
        <Button
          icon={
            <CurrentIcon
              width={20}
              height={20}
              fill={selectedIcon ? tertiaryGray : utilityGray}
            />
          }
          title='Icon'
          variant='link-gray'
          iconPosition='left'
          titleStyle={{ color: selectedIcon ? tertiaryGray : utilityGray }}
          onPress={openKeywordIconPickerSheet}
        />
        <Button
          icon={<VoiceOverOff width={20} height={20} fill={utilityGray} />}
          title={selectedVoiceoverState ? "Voiceover on" : "Voiceover off"}
          variant='link-gray'
          iconPosition='left'
          onPress={onToggleSelectedVoiceoverState}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },

  inputContainer: {
    flex: 1,
  },

  topButtons: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },

  bottomButtons: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
});
