import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { CheckboxBlock } from "@/components/ui/CheckBoxBlock";
import {
  $additionalFiltersDraft,
  resetAdditionalFiltersDraft,
  toggleFilterEnabled,
  updateFilterRange,
} from "@/stores/allNews/filtersPanel/filters/additionalFilters";
import { AdditionalFilterKey, additionalFiltersLabels } from "@/types/filters";
import { useUnit } from "effector-react";
import { StyleSheet } from "react-native";
import { RangeInput } from "./RangeInput";
import { useSession } from "@/components/appProvider/session/SessionContext";
import { isUserPremium } from "@/helpers/userStatus/isUserPremium";
import BoltDuoIcon from "@/assets/icons/bolt-duo-icon.svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";
import { PREMIUM } from "@/constants/routes";
import { router } from "expo-router";

type AdditionalFiltersProps = {
  onCloseFilters: () => void;
};

export const AdditionalFilters = ({
  onCloseFilters,
}: AdditionalFiltersProps) => {
  const { session } = useSession();
  const isPremiumUser = isUserPremium(session);
  const additionalFiltersDraft = useUnit($additionalFiltersDraft);
  const onToggleFilter = useUnit(toggleFilterEnabled);
  const onUpdateFilterRange = useUnit(updateFilterRange);
  const onResetAdditionalFiltersDraft = useUnit(resetAdditionalFiltersDraft);

  const iconBrandPrimary = useThemeColor(appTokens.foreground.brandPrimary);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.titleContainer}>
          {!isPremiumUser && (
            <BoltDuoIcon width={24} height={24} fill={iconBrandPrimary} />
          )}
          <ThemedText style={styles.title} type='textLg'>
            Additional Filters
          </ThemedText>
        </ThemedView>
        {isPremiumUser && (
          <Button
            title='Clear'
            variant='link-gray'
            buttonStyle={styles.buttonExtra}
            onPress={onResetAdditionalFiltersDraft}
          />
        )}
      </ThemedView>
      <ThemedView style={styles.list}>
        {additionalFiltersDraft &&
          Object.entries(additionalFiltersDraft).map(([key, filter]) => (
            <CheckboxBlock
              key={key}
              checked={filter.enabled}
              title={additionalFiltersLabels[key as AdditionalFilterKey]}
              bottomComponent={
                <RangeInput
                  from={filter.range.from}
                  to={filter.range.to}
                  onChange={(from, to) =>
                    onUpdateFilterRange({
                      key: key as AdditionalFilterKey,
                      range: { from, to },
                    })
                  }
                />
              }
              onPress={() => {
                if (isPremiumUser) {
                  onToggleFilter(key as AdditionalFilterKey);
                } else {
                  onCloseFilters();
                  router.push(PREMIUM);
                  return;
                }
              }}
            />
          ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },

  title: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  buttonExtra: {
    paddingRight: 0,
  },

  list: {
    marginTop: 8,
    gap: 8,
  },
});
