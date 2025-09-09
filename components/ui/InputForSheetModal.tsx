import EyeClosedIcon from '@/assets/icons/eye-closed-icon.svg';
import EyeOpenedIcon from '@/assets/icons/eye-opened-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { InputProps, Input as RNInput } from '@rneui/themed';
import React, { useCallback, useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInputFocusEventData,
	TouchableOpacity,
} from 'react-native';

type InputType = 'text' | 'password' | 'number';

type CustomInputProps = InputProps & {
	type?: InputType;
	isUsedInSheetModal?: boolean;
	isError?: boolean;
};

export const InputForSheetModal = ({
	type = 'text',
	onBlur,
	onFocus,
	isError,
	...props
}: CustomInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const isPasswordType = type === 'password';
	const isNumberType = type === 'number';

	const labelColor = useThemeColor({}, appTokens.text.secondary);
	const inputContainerBackgroundColor = useThemeColor(
		{},
		appTokens.background.secondary
	);
	const inputBorderColor = useThemeColor({}, appTokens.border.tertiary);
	const inputBorderFocusColor = useThemeColor({}, appTokens.border.brand);
	const inputBorderErrorColor = useThemeColor({}, appTokens.border.errorSubtle);
	const placeholderColor = useThemeColor({}, appTokens.text.placeholder);
	const inputTextColor = useThemeColor({}, appTokens.text.primary);
	const iconColor = useThemeColor({}, appTokens.foreground.quinary);
	const iconErrorColor = useThemeColor({}, appTokens.foreground.errorSecondary);
	const errorTextColor = useThemeColor({}, appTokens.text.errorPrimary);

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

	const renderRightIcon = () => {
		if (!isPasswordType) return props.rightIcon || undefined;

		return (
			<TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
				{isPasswordVisible && (
					<EyeOpenedIcon
						width={20}
						height={20}
						fill={isError ? iconErrorColor : iconColor}
						color={isError ? iconErrorColor : iconColor}
					/>
				)}
				{!isPasswordVisible && (
					<EyeClosedIcon
						width={20}
						height={20}
						fill={isError ? iconErrorColor : iconColor}
						color={isError ? iconErrorColor : iconColor}
					/>
				)}
			</TouchableOpacity>
		);
	};

	return (
		<RNInput
			{...props}
			keyboardType={isNumberType ? 'numeric' : 'default'}
			secureTextEntry={isPasswordType && !isPasswordVisible}
			rightIcon={renderRightIcon()}
			containerStyle={[styles.containerExtra, props.containerStyle]}
			inputContainerStyle={[
				{ borderColor: inputBorderColor },
				{ backgroundColor: inputContainerBackgroundColor },
				styles.inputContainerExtra,
				isError && { borderColor: inputBorderErrorColor },
				isFocused && { borderColor: inputBorderFocusColor },
				props.containerStyle,
			]}
			placeholderTextColor={placeholderColor}
			selectionColor={appTokens.border.brand.light}
			labelStyle={[{ color: labelColor }, styles.labelExtra]}
			inputStyle={[
				{ color: inputTextColor },
				styles.inputExtra,
				props.inputStyle,
			]}
			onFocus={e => {
				setIsFocused(true);
				handleOnFocus(e);
			}}
			onBlur={e => {
				setIsFocused(false);
				handleOnBlur(e);
			}}
			errorStyle={[
				!isError && { height: 0 },
				{ color: errorTextColor },
				styles.errorExtra,
			]}
		/>
	);
};

const styles = StyleSheet.create({
	labelExtra: {
		marginBottom: 6,
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 500,
		fontFamily: 'MontserratRegular',
	},

	containerExtra: {
		marginTop: 0,
		paddingHorizontal: 0,
	},

	inputContainerExtra: {
		borderWidth: 1,
		borderRadius: 12,
	},

	inputExtra: {
		borderWidth: 0,
		borderRadius: 12,
		minHeight: 48,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		lineHeight: 20,
		fontWeight: 500,
		fontFamily: 'MontserratRegular',
	},

	errorExtra: {
		margin: 0,
		marginTop: 6,
	},
});
