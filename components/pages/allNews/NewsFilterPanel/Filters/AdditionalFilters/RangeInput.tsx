import { ThemedView } from "@/components/ThemedView";
import { Input } from "@/components/ui/Input";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";

interface RangeInputProps
  extends Omit<TextInputProps, "onChange" | "onChangeText"> {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

export const RangeInput = ({
  from,
  to,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: RangeInputProps) => {
  /**
   * Handlers below are required specifically for @gorhom/bottom-sheet.
   * They sync keyboard state with the animated bottom sheet internals.
   *
   * Do not remove unless you are sure bottom sheet integration is not needed.
   */
  const { animatedKeyboardState } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const keyboardState = animatedKeyboardState.get();
      animatedKeyboardState.set({
        ...keyboardState,
        target: args.nativeEvent.target,
      });
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, animatedKeyboardState]
  );

  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const keyboardState = animatedKeyboardState.get();
      if (keyboardState.target === args.nativeEvent.target) {
        animatedKeyboardState.set({
          ...keyboardState,
          target: undefined,
        });
      }
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, animatedKeyboardState]
  );

  return (
    <ThemedView style={styles.container}>
      <Input
        value={from}
        onChangeText={value => onChange(value, to)}
        type='number'
        containerStyle={styles.inputContainer}
        placeholder='From'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />

      <Input
        value={to}
        onChangeText={value => onChange(from, value)}
        type='number'
        containerStyle={styles.inputContainer}
        placeholder='To'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },

  inputContainer: {
    flex: 1,
  },
});
