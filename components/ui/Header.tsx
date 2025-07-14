import { HeaderProps, Header as RNHeader } from "@rneui/base";
import LogoIcon from "@/assets/icons/logo-icon.svg";
import { StyleSheet } from "react-native";
import { appTokens } from "@/constants/tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { NavNotification } from "./NavNotification";

export default function Header(props: HeaderProps) {
  const bgColor = useThemeColor({}, appTokens.background.primary);
  const borderColor = useThemeColor({}, appTokens.border.tertiary);

  return (
    <RNHeader
      {...props}
      backgroundColor={bgColor}
      leftComponent={<LogoIcon width={32} height={32} />}
      centerComponent={
        <ThemedText type='textMd' style={styles.title}>
          All News
        </ThemedText>
      }
      rightComponent={<NavNotification />}
      containerStyle={{
        paddingVertical: 4,
        paddingHorizontal: 16,
      }}
      centerContainerStyle={{
        justifyContent: "center",
        borderColor: borderColor,
      }}
      leftContainerStyle={{
        justifyContent: "center",
      }}
      rightContainerStyle={{
        justifyContent: "center",
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 0,
    paddingVertical: 0,
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },
});
