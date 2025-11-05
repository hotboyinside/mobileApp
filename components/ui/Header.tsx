import LogoIcon from '@/assets/icons/logo-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Header as RNHeader, HeaderProps as RNHeaderProps } from '@rneui/base';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

export interface HeaderProps extends RNHeaderProps {
	title: string;
	isShowBottomBorder?: boolean;
}

export default function Header(props: HeaderProps) {
	const { title, isShowBottomBorder } = props;

	const bgColor = useThemeColor(appTokens.background.primary);
	const borderColor = useThemeColor(appTokens.border.tertiary);

	return (
		<RNHeader
			{...props}
			backgroundColor={bgColor}
			leftComponent={<LogoIcon width={32} height={32} />}
			centerComponent={
				<ThemedText type='textMd' style={styles.title}>
					{title}
				</ThemedText>
			}
			rightComponent={<View style={styles.mock} />}
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

	mock: {
		width: 40,
		height: 40
	}
});
