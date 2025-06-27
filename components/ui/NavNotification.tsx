import React from "react";
import { Button } from "./Button";
import BellIcon from "@/assets/icons/bell-icon.svg";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Badge } from "./Badge";
import { StyleSheet, View } from "react-native";

export const NavNotification = () => {
  const buttonColor = useThemeColor(
    {},
    appTokens.component.buttons.secondaryGray.fg
  );

  return (
    <View style={{ position: "relative" }}>
      <Badge
        containerStyle={styles.badgeContainerExtra}
        status='primary'
        size='xs'
        value={1}
      ></Badge>
      <Button variant='secondary' size='md' onlyIcon>
        <BellIcon width={20} height={20} color={buttonColor} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainerExtra: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
