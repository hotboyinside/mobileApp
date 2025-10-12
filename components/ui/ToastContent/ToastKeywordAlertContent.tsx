import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlanetIcon from '@/assets/icons/planet-icon.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Badge } from '@/components/ui/Badge/Badge';

type ToastKeywordAlertContentProps = {
	title: string;
	keywords: string[];
};

export const ToastKeywordAlertContent = ({
	title,
	keywords,
}: ToastKeywordAlertContentProps) => {
	const iconBgColor = useThemeColor(appTokens.background.brandPrimary);
	const iconColor = useThemeColor(appTokens.foreground.brandPrimary);

	return (
		<ThemedView style={styles.container}>
			<ThemedView
				style={[styles.iconContainer, { backgroundColor: iconBgColor }]}
			>
				<PlanetIcon width={16} height={16} color={iconColor} />
			</ThemedView>
			<View style={styles.wrapper}>
				<ThemedText type='textSm' style={styles.title}>
					Keyword Alert
				</ThemedText>
				<ThemedText
					type='textSm'
					tokenColor={appTokens.text.secondary}
					numberOfLines={2}
					style={styles.description}
				>
					{title}
				</ThemedText>
				<View style={styles.keywords}>
					{keywords.map(keyword => (
						<Badge
							key={keyword}
							variant='keywords'
							color='gray'
							size='sm'
							value={keyword}
						/>
					))}
				</View>
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
		paddingRight: 20,
	},

	iconContainer: {
		alignSelf: 'flex-start',
		borderRadius: 16,
		padding: 8,
	},

	wrapper: {
		flex: 1,
	},

	title: {
		fontFamily: 'MontserratSemiBold',
		fontWeight: 600,
	},

	description: {
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	keywords: {
		marginTop: 12,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 4,
	},
});
