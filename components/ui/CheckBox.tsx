import {
	CheckBox as RNCheckBox,
	CheckBoxProps as RNCheckBoxProps,
} from '@rneui/base';
import { StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { LinearGradient } from 'expo-linear-gradient';

type CheckboxProps = Omit<RNCheckBoxProps, 'children'> & {};

export const Checkbox = ({ ...props }: CheckboxProps) => {
	const textColor = useThemeColor(appTokens.text.tertiary);
	const bgColor = useThemeColor(appTokens.background.secondarySubtle);
	const containerInActiveBorderColor = useThemeColor(appTokens.border.tertiary);
	const containerActiveBorderColor = useThemeColor(appTokens.border.brand);
	const inactiveIconBorderColor = useThemeColor(appTokens.border.primary);
	const inactiveIconBgColor = useThemeColor(appTokens.background.secondary);
	const activeInnerCircleColor = useThemeColor(appTokens.foreground.white);

	return (
		<RNCheckBox
			{...props}
			containerStyle={[
				styles.container,
				{ backgroundColor: bgColor, borderColor: containerInActiveBorderColor },
				props.checked && {
					borderColor: containerActiveBorderColor,
				},
				props.containerStyle,
			]}
			wrapperStyle={[styles.wrapper, props.wrapperStyle]}
			textStyle={[styles.text, { color: textColor }, props.textStyle]}
			checkedIcon={
				<LinearGradient
					colors={['#FF692E', '#FF4405']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.activeIcon}
				>
					<View
						style={[
							styles.innerCircle,
							{ backgroundColor: activeInnerCircleColor },
						]}
					/>
				</LinearGradient>
			}
			uncheckedIcon={
				<View
					style={[
						styles.inactiveIcon,
						{
							borderColor: inactiveIconBorderColor,
							backgroundColor: inactiveIconBgColor,
						},
					]}
				></View>
			}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 12,
		marginVertical: 0,
		marginLeft: 0,
		marginRight: 0,
		padding: 12,
	},

	wrapper: {
		gap: 2,
	},

	text: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	activeIcon: {
		borderRadius: 100,
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},

	innerCircle: {
		borderRadius: 100,
		width: 10,
		height: 10,
	},

	inactiveIcon: {
		borderRadius: 100,
		borderWidth: 1,
		width: 24,
		height: 24,
	},
});
