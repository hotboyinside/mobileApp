import EyeClosedIcon from "@/assets/icons/eye-closed-icon.svg";
import EyeOpenedIcon from "@/assets/icons/eye-opened-icon.svg";
import LogoIcon from "@/assets/icons/logo-icon.svg";
import { useLocaleText } from "@/components/appProvider/localization/LocalizationProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { appTokens } from "@/constants/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const loginTexts = useLocaleText().localeText.login;
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const inputRef = createRef<any>();

  const handleLogin = async () => {
    router.replace("/"); // Перенаправление на главную
  };

  const onSubmit = async () => {
    if (inputRef.current) {
      inputRef.current.shake();
    }
  };

  return (
    <ThemedViewWithSafeArea
      safeEdges={["top", "right", "bottom", "bottom"]}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={"padding"} style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <LogoIcon />
              <ThemedText style={styles.title} type='displayXs'>
                {loginTexts?.title}
              </ThemedText>
            </View>
            <View style={styles.formContainer}>
              <View>
                <Input placeholder='Enter your email' label='Email' />
                <Input
                  ref={inputRef}
                  placeholder='Enter your password'
                  label='Password'
                  secureTextEntry={isPasswordVisible}
                  rightIcon={
                    isPasswordVisible ? (
                      <EyeClosedIcon
                        onPress={() => setIsPasswordVisible(prev => !prev)}
                        width={20}
                        height={20}
                        fill={appTokens.foreground.quinary.light}
                        color={appTokens.foreground.quinary.light}
                      />
                    ) : (
                      <EyeOpenedIcon
                        onPress={() => setIsPasswordVisible(prev => !prev)}
                        width={20}
                        height={20}
                        fill={appTokens.foreground.quinary.light}
                        color={appTokens.foreground.quinary.light}
                      />
                    )
                  }
                  rightIconContainerStyle={styles.iconContainerExtra}
                />
              </View>
              <Button
                ViewComponent={LinearGradient as any}
                linearGradientProps={{
                  colors: ["#FF692E", "#FF4405"],
                  start: [0, 0],
                  end: [1, 0],
                }}
                onPress={onSubmit}
                title='Log in'
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedViewWithSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },

  content: {
    flex: 1,
  },

  logoContainer: {
    alignItems: "center",
  },

  title: {
    width: 286,
    textAlign: "center",
    marginTop: 16,
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 32,
  },

  iconContainerExtra: {
    marginRight: 11,
  },
});
