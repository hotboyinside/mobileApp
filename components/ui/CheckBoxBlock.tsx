import { CheckBoxProps as RNCheckBoxProps } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { ReactElement } from 'react';
import { ThemedView } from '../ThemedView';
import { Checkbox } from './CheckBox';

type CheckboxBlockProps = Omit<RNCheckBoxProps, 'children'> & {
	bottomComponent: ReactElement;
};

export const CheckboxBlock = ({
	bottomComponent,
	...props
}: CheckboxBlockProps) => {
	const bgColor = useThemeColor(appTokens.background.secondarySubtle);
	const containerInActiveBorderColor = useThemeColor(appTokens.border.tertiary);
	const containerActiveBorderColor = useThemeColor(appTokens.border.brand);

	return (
		<ThemedView
			style={[
				styles.container,
				{ backgroundColor: bgColor, borderColor: containerInActiveBorderColor },
				props.checked && {
					borderColor: containerActiveBorderColor,
				},
			]}
		>
			<Checkbox containerStyle={styles.checkboxContainer} {...props} />
			{props.checked && bottomComponent}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 12,
		gap: 12,
	},

	checkboxContainer: {
		borderWidth: 0,
		padding: 0,
	},
});
