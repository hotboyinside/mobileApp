// app/login.tsx
import LogoIcon from "@/assets/icons/logoIcon.svg";
import { useLocaleText } from "@/components/appProvider/localization/LocalizationProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const loginTexts = useLocaleText().localeText.login;

  const handleLogin = async () => {
    router.replace("/"); // Перенаправление на главную
  };

  return (
    <ThemedViewWithSafeArea
      safeEdges={["top", "right", "bottom", "bottom"]}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoIcon style={styles.icon} />
          <ThemedText style={styles.title} type='displayXs'>
            {loginTexts?.title}
          </ThemedText>
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.form}>
          <View>
            <Input
              label='Email'
              containerStyle={styles.emailInput}
              placeholder='Enter your email'
            />
            <Input label='Password' placeholder='Enter your password' />
          </View>
          <Button />
        </KeyboardAvoidingView>
      </View>
    </ThemedViewWithSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },

  logoContainer: {
    alignItems: "center",
  },

  icon: {
    marginTop: 32,
  },

  title: {
    width: 286,
    textAlign: "center",
    marginTop: 16,
    fontWeight: 700,
  },

  form: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  emailInput: {
    marginBottom: 24,
  },
});
