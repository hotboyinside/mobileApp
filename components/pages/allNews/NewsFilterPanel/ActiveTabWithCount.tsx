import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet } from 'react-native';

type ActiveTabWithCountProps = {
	label: string;
	count: number;
};

export const ActiveTabWithCount = ({
	label,
	count,
}: ActiveTabWithCountProps) => {
	const tabBgColorActive = useThemeColor(appTokens.background.tertiary);
	const tabTextColorActive = useThemeColor(appTokens.text.secondary);

	return (
		<ThemedView
			style={[{ backgroundColor: tabBgColorActive }, styles.container]}
		>
			<ThemedText style={[styles.text, { color: tabTextColorActive }]}>
				{label}
			</ThemedText>
			<Badge variant='modern' color='gray' size='sm' value={count} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	text: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 600,
		fontFamily: 'MontserratBold',
	},
});
