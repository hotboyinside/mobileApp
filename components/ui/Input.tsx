import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

export interface IInput extends TextInputProps {
	label?: string;
	containerStyle?: ViewStyle;
}

export const Input = ({ label, style, containerStyle, ...rest }: IInput) => {
	const [value, setValue] = useState('');
	const refInput = useRef<TextInput>(null);
	const backgroundColor = useThemeColor({}, appTokens.background.secondary);
	const placeholderColor = useThemeColor({}, appTokens.text.placeholder);
	const inputTextColor = useThemeColor({}, appTokens.text.primary);

	return (
		<ThemedView style={[styles.container, containerStyle]}>
			{label && (
				<ThemedText
					style={styles.label}
					lightColor={appTokens.text.secondary.light}
					darkColor={appTokens.text.secondary.dark}
					type='textSm'
				>
					{label}
				</ThemedText>
			)}
			<TextInput
				style={[{ backgroundColor }, { color: inputTextColor }, styles.input]}
				placeholderTextColor={placeholderColor}
				value={value}
				onChangeText={text => setValue(text)}
				ref={refInput}
				{...rest}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {},

	label: {
		marginBottom: 6,
		fontWeight: 500,
	},

	input: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		height: 48,
		borderRadius: 12,
		fontSize: 16,
		fontWeight: 500,
		// lineHeight: 24
	},
});
