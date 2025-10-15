import CloseIcon from '@/assets/icons/close-icon.svg';
import RestartIcon from '@/assets/icons/restart-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type HeaderBottomSheetProps = {
	headerLabel: string;
	leftIcon?: FC<SvgProps>;
	onCloseFilters: () => void;
	onResetDefaultValues?: () => void;
};

export const HeaderBottomSheet = ({
	headerLabel,
	leftIcon = RestartIcon,
	onCloseFilters,
	onResetDefaultValues,
}: HeaderBottomSheetProps) => {
	const Icon = leftIcon;

	const borderColor = useThemeColor(appTokens.border.tertiary);
	const iconColor = useThemeColor(appTokens.component.buttons.secondaryGray.fg);

	return (
		<ThemedView style={[styles.container, { borderColor: borderColor }]}>
			{onResetDefaultValues ? (
				<Button
					onlyIcon
					variant='secondary'
					icon={<Icon fill={iconColor} width={20} height={20} />}
					onPressIn={onResetDefaultValues}
				/>
			) : (
				<View style={{ width: 40, height: 40 }} />
			)}
			<ThemedText type='displayXs' style={styles.title}>
				{headerLabel}
			</ThemedText>
			<Button
				variant='secondary'
				onlyIcon
				icon={<CloseIcon width={20} height={20} fill={iconColor} />}
				onPressIn={onCloseFilters}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
	},

	title: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
		textAlign: 'center',
	},
});
