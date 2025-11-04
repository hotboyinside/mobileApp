import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface FeatureCardProps {
	title: string;
	icon: FC<SvgProps>;
	description?: string;
	isSoon?: boolean;
}

const FeatureCard = ({
	title,
	icon: Icon,
	description,
	isSoon,
}: FeatureCardProps) => {
	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const backgroundPrimaryColor = useThemeColor(appTokens.background.primary);
	const textPrimaryColor = useThemeColor(appTokens.text.primary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
	const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);

	return (
		<ThemedView
			style={[
				styles.card,
				{
					backgroundColor: backgroundPrimaryColor,
					borderColor: borderTertiaryColor,
				},
			]}
		>
			<Icon width={28} height={28} fill={iconBrandColor} style={styles.icon} />

			<ThemedText
				type='textMd'
				style={[styles.title, { color: textPrimaryColor }]}
			>
				{title}
			</ThemedText>

			{description && (
				<ThemedText
					type='textSm'
					style={[styles.description, { color: textQuaternaryColor }]}
				>
					{description}
				</ThemedText>
			)}
		</ThemedView>
	);
};

export default FeatureCard;

const styles = StyleSheet.create({
	card: {
		width: 208,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 8,
	},

	icon: {
		marginBottom: 8,
	},

	title: {
		maxWidth: 176,
		marginBottom: 4,
		textAlign: 'center',
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	description: {
		textAlign: 'center',
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},
});
