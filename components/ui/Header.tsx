import { HeaderProps as RNHeaderProps, Header as RNHeader } from '@rneui/base';
import LogoIcon from '@/assets/icons/logo-icon.svg';
import { StyleSheet } from 'react-native';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '../ThemedText';
import { NavNotification } from './NavNotification';

export interface HeaderProps extends RNHeaderProps {
	isShowBottomBorder?: boolean;
}

export default function Header(props: HeaderProps) {
	const isShowBottomBorder = props.isShowBottomBorder;

	const bgColor = useThemeColor({}, appTokens.background.primary);
	const borderColor = useThemeColor({}, appTokens.border.tertiary);

	return (
		<RNHeader
			{...props}
			backgroundColor={bgColor}
			leftComponent={<LogoIcon width={32} height={32} />}
			centerComponent={
				<ThemedText type='textMd' style={styles.title}>
					All News
				</ThemedText>
			}
			rightComponent={<NavNotification />}
			containerStyle={[
				styles.container,
				isShowBottomBorder && {
					borderBottomWidth: 1,
					borderBottomColor: borderColor,
				},
			]}
			centerContainerStyle={styles.contentContainer}
			leftContainerStyle={styles.contentContainer}
			rightContainerStyle={styles.contentContainer}
		/>
	);
}

const styles = StyleSheet.create({
	title: {
		marginVertical: 0,
		paddingVertical: 0,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	container: {
		borderBottomWidth: 1,
		paddingVertical: 4,
		paddingHorizontal: 16,
		borderBottomColor: 'transparent',
	},

	contentContainer: {
		justifyContent: 'center',
	},
});
