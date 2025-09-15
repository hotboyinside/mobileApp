import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tab as RNTab } from '@rneui/base';
import React from 'react';
import { StyleSheet } from 'react-native';

type TabItemProps = Omit<React.ComponentProps<typeof RNTab.Item>, 'children'>;

export const TabItem = ({ title, ...props }: TabItemProps) => {
	const tabBgColorActive = useThemeColor({}, appTokens.background.tertiary);
	const tabTextColor = useThemeColor({}, appTokens.text.tertiary);
	const tabTextColorActive = useThemeColor({}, appTokens.text.secondary);
	const tabBorderColor = useThemeColor({}, appTokens.border.tertiary);
	const iconColor = useThemeColor({}, appTokens.foreground.quinary);
	const iconColorActive = useThemeColor({}, appTokens.foreground.secondary);

	const renderTitle = () => {
		if (typeof title === 'string') {
			return title;
		}

		if (React.isValidElement<{ color?: string }>(title)) {
			return React.cloneElement(title, {
				color: props.active ? iconColorActive : iconColor,
			});
		}

		return title;
	};

	return (
		<RNTab.Item
			{...props}
			title={renderTitle()}
			buttonStyle={styles.button}
			containerStyle={active => [
				styles.container,
				{
					backgroundColor: active ? tabBgColorActive : 'transparent',
					borderColor: active ? 'transparent' : tabBorderColor,
				},
			]}
			titleStyle={active => [
				styles.title,
				{
					fontWeight: active ? 600 : 500,
					fontFamily: active ? 'MontserratBold' : 'MontserratMedium',
					color: active ? tabTextColorActive : tabTextColor,
				},
			]}
			titleProps={{
				numberOfLines: 1,
			}}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
		borderWidth: 1,
		borderRadius: 10,
		marginRight: 8,
		paddingVertical: 0,
		paddingHorizontal: 0,
	},

	button: {
		borderRadius: 10,
		paddingVertical: 6,
		paddingHorizontal: 12,
	},

	title: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		fontSize: 14,
		lineHeight: 20,
	},
});
