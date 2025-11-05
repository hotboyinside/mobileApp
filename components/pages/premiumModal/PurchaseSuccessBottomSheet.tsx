import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';

type PurchaseSuccessBottomSheetProps = {
	onClose: () => void;
};

export default function PurchaseSuccessBottomSheet({
	onClose,
}: PurchaseSuccessBottomSheetProps) {
	const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);
	const closeIconColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);

	return (
		<BottomSheetScrollView
			style={styles.wrapper}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 60 }}
		>
			<ThemedView style={styles.header}>
				<Button
					variant='secondary'
					onlyIcon
					icon={<CloseIcon width={20} height={20} fill={closeIconColor} />}
					buttonStyle={styles.closeIcon}
					onPress={onClose}
				/>
			</ThemedView>
			<BoltDuoIcon
				width={160}
				height={160}
				fill={iconBrandColor}
				style={styles.icon}
			/>
			<ThemedText type='displayXs' style={styles.title}>
				You’re Now Premium!
			</ThemedText>
			<ThemedText
				type='textSm'
				tokenColor={appTokens.text.quaternary}
				style={styles.description}
			>
				Enjoy unlimited news alerts, keyword customization, and more.
			</ThemedText>
			<Button
				variant='primary'
				size='lg'
				title='Got it'
				style={styles.button}
				onPress={onClose}
			/>
		</BottomSheetScrollView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},

	header: {
		flexDirection: 'row',
	},

	closeIcon: {
		alignSelf: 'flex-end',
	},

	icon: {
		alignSelf: 'center',
	},

	title: {
		marginTop: 16,
		textAlign: 'center',
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	description: {
		marginTop: 12,
		textAlign: 'center',
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	button: {
		marginTop: 32,
	},
});
