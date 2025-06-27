import { Badge as RNBadge, BadgeProps as RNBadgeProps } from "@rneui/base";
import { StyleSheet } from "react-native";

type BadgeProps = RNBadgeProps & {
  onlyIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
};

export const Badge = ({ onlyIcon, size = "md", ...props }: BadgeProps) => {
  let sizeBadgeStyles;

  if (onlyIcon) {
    sizeBadgeStyles = onlyIconSizeStyles[size];
  } else {
    sizeBadgeStyles = sizeStyles[size];
  }

  return (
    <RNBadge
      {...props}
      textStyle={[props.textStyle, generalTextStyles.extraTextStyle]}
      badgeStyle={[
        props.containerStyle,
        generalBadgeStyles.extraBadgeStyle,
        sizeBadgeStyles,
      ]}
    />
  );
};

const generalBadgeStyles = StyleSheet.create({
  extraBadgeStyle: {
    borderRadius: 100,
    height: "auto",
  },
});

const generalTextStyles = StyleSheet.create({
  extraTextStyle: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "MontserratMedium",
    fontWeight: 500,
    lineHeight: 20,
  },
});

const sizeStyles = StyleSheet.create({
  xs: {
    paddingHorizontal: 6,
    paddingVertical: 1,
  },

  sm: {
    paddingHorizontal: 8,
    paddingVertical: 1,
  },

  md: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  lg: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

const onlyIconSizeStyles = StyleSheet.create({
  xs: {
    paddingHorizontal: 1,
    paddingVertical: 1,
  },

  sm: {
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  md: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  lg: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
