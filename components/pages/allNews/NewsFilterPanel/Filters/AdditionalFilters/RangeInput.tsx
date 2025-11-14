import { ThemedText } from '@/components/ThemedText';
import { Input } from '@/components/ui/Input';
import { appTokens } from '@/constants/tokens';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import {
	BlurEvent,
	FocusEvent,
	StyleSheet,
	TextInputProps,
	View,
} from 'react-native';

interface RangeInputProps
	extends Omit<TextInputProps, 'onChange' | 'onChangeText'> {
	from: string;
	to: string;
	error?: string | null;
	onChange: (from: string, to: string) => void;
}

export const RangeInput = ({
	from,
	to,
	error,
	onChange,
	onFocus,
	onBlur,
}: RangeInputProps) => {
	/**
	 * Handlers below are required specifically for @gorhom/bottom-sheet.
	 * They sync keyboard state with the animated bottom sheet internals.
	 *
	 * Do not remove unless you are sure bottom sheet integration is not needed.
	 */
	const { animatedKeyboardState } = useBottomSheetInternal();

	const handleOnFocus = useCallback(
		(args: FocusEvent) => {
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
		(args: BlurEvent) => {
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
		<View>
			<View style={styles.inputs}>
				<Input
					value={from}
					onChangeText={value => onChange(value, to)}
					keyboardType='numbers-and-punctuation'
					containerStyle={styles.inputContainer}
					placeholder='From'
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
				/>

				<Input
					value={to}
					onChangeText={value => onChange(from, value)}
					keyboardType='numbers-and-punctuation'
					containerStyle={styles.inputContainer}
					placeholder='To'
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
				/>
			</View>

			{error && (
				<ThemedText type={'textXs'} tokenColor={appTokens.text.errorPrimary}>
					{error}
				</ThemedText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputs: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
	},

	inputContainer: {
		flex: 1,
	},
});
