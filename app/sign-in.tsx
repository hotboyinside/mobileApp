import LogoIcon from "@/assets/icons/logo-icon.svg";
import { useSession } from "@/components/appProvider/session/SessionContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedViewWithSafeArea } from "@/components/ThemedViewWithSafeArea";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLogin } from "@/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinearGradient } from "expo-linear-gradient";
import { createRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter valid email.")
      .required("Please enter valid email."),
    password: yup
      .string()
      .min(8, "Please enter your password.")
      .required("Please enter your password."),
  })
  .required();

export default function LoginScreen() {
  const inputRef = createRef<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { signIn } = useSession();

  const { mutate: login } = useLogin();

  const onSubmit = (data: any) => {
    login(data, {
      onSuccess: res => {
        signIn(res.data.success.user);
      },
      onError: err => {
        console.error("Login error", err);
        console.log("err.message", err.message);
        console.log("err.response", err.response);
        console.log("err.response.status", err.response.status);
      },
    });
  };

  // if (inputRef.current) {
  // 	inputRef.current.shake();
  // }
  return (
    <ThemedViewWithSafeArea
      safeEdges={["top", "right", "bottom", "left"]}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <LogoIcon />
            <ThemedText style={styles.title} type='displayXs'>
              Welcome back to&nbsp;FoxRunner
            </ThemedText>
          </View>
          <View style={styles.formContainer}>
            <View>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    label='Email'
                    placeholder='Enter your email'
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <Input
                    type='password'
                    label='Password'
                    placeholder='Enter your password'
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    ref={inputRef}
                    rightIconContainerStyle={styles.iconContainerExtra}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </View>
            <Button
              ViewComponent={LinearGradient as any}
              linearGradientProps={{
                colors: ["#FF692E", "#FF4405"],
                start: [0, 0],
                end: [1, 0],
              }}
              onPress={handleSubmit(onSubmit)}
              title='Log in'
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ThemedViewWithSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 16,
  },

  title: {
    width: 286,
    textAlign: "center",
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
