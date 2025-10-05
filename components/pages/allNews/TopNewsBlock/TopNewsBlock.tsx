import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import TopGainers from './TopGainers';
import TopLosers from './TopLosers';
import { ThemedText } from '@/components/ThemedText';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export const TopNewsBlock = () => {
	const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<ThemedView
			style={[styles.container, { backgroundColor: backgroundColor }]}
		>
			<TopGainers />
			<TopLosers />
			<ThemedText type='textLg' style={styles.title}>
				Feed
			</ThemedText>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 24,
		paddingTop: 24,
	},

	title: {
		marginHorizontal: 16,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},
});
