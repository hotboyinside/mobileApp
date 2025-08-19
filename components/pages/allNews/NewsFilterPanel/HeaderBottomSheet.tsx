import { ThemedText } from "@/components/ThemedText";
import RestartIcon from "@/assets/icons/restart-icon.svg";
import CloseIcon from "@/assets/icons/close-icon.svg";
import { StyleSheet } from "react-native";
import { Button } from "@/components/ui/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { ThemedView } from "@/components/ThemedView";

type HeaderBottomSheetProps = {
  headerLabel: string;
  onResetDefaultValues: () => void;
  onCloseFilters: () => void;
};

export const HeaderBottomSheet = ({
  headerLabel,
  onResetDefaultValues,
  onCloseFilters,
}: HeaderBottomSheetProps) => {
  const borderColor = useThemeColor({}, appTokens.border.tertiary);
  const iconColor = useThemeColor(
    {},
    appTokens.component.buttons.secondaryGray.fg
  );

  return (
    <ThemedView style={[styles.container, { borderColor: borderColor }]}>
      <Button
        onlyIcon
        variant='secondary'
        icon={<RestartIcon fill={iconColor} width={20} height={20} />}
        style={styles.button}
        onPress={onResetDefaultValues}
      />
      <ThemedText type='displayXs' style={styles.title}>
        {headerLabel}
      </ThemedText>
      <Button
        style={styles.button}
        variant='secondary'
        onlyIcon
        icon={<CloseIcon width={20} height={20} fill={iconColor} />}
        onPress={() => {
          onCloseFilters();
          onResetDefaultValues();
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    padding: 16,
    borderBottomWidth: 1,
  },

  button: {
    alignSelf: "flex-start",
  },

  title: {
    flex: 1,
    fontWeight: 700,
    fontFamily: "MontserratBold",
    textAlign: "center",
  },
});
