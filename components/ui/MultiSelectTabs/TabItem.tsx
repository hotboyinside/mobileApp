import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tab as RNTab } from "@rneui/base";
import React from "react";

type TabItemProps = Omit<React.ComponentProps<typeof RNTab.Item>, "children">;

export const TabItem = ({ title, ...props }: TabItemProps) => {
  const tabBgColorActive = useThemeColor({}, appTokens.background.tertiary);
  const tabTextColor = useThemeColor({}, appTokens.text.tertiary);
  const tabTextColorActive = useThemeColor({}, appTokens.text.secondary);
  const tabBorderColor = useThemeColor({}, appTokens.border.tertiary);
  const iconColor = useThemeColor({}, appTokens.foreground.quinary);
  const iconColorActive = useThemeColor({}, appTokens.foreground.secondary);

  const renderTitle = () => {
    if (typeof title === "string") {
      return title;
    }

    if (React.isValidElement<{ color?: string }>(title)) {
      return React.cloneElement(title, {
        color: props.active ? iconColorActive : iconColor,
      });
    }

    return title;
  };

  return (
    <RNTab.Item
      {...props}
      title={renderTitle()}
      buttonStyle={{
        paddingVertical: 6,
        paddingHorizontal: 12,
      }}
      containerStyle={active => ({
        borderRadius: 10,
        flex: 0,
        marginRight: 8,
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: active ? tabBgColorActive : "transparent",
        borderColor: active ? "none" : tabBorderColor,
        borderWidth: active ? 0 : 1,
      })}
      titleStyle={active => ({
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: active ? 600 : 500,
        fontFamily: active ? "MontserratBold" : "MontserratMedium",
        color: active ? tabTextColorActive : tabTextColor,
      })}
    ></RNTab.Item>
  );
};
