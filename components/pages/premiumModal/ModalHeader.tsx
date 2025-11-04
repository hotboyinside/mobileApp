import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import ModalPremiumImage from '@/assets/images/ModalPremiumImage.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OFFSET = 16;
const HEADER_HEIGHT = 192 + OFFSET;

type ModalHeaderProps = {
	isPremiumUser: boolean;
	isFreeTrialUsed?: boolean;
};

export default function ModalHeader({
	isPremiumUser,
	isFreeTrialUsed,
}: ModalHeaderProps) {
	const { top: topSafeArea } = useSafeAreaInsets();
	const { width: screenWidth } = Dimensions.get('window');

	const isFreeUserWithTrialUsed = !isPremiumUser && isFreeTrialUsed;
	const isFreeUserWithTrial = !isPremiumUser && !isFreeTrialUsed;

	const backgroundColor = useThemeColor(appTokens.background.overlay);
	const bgButtonColor = appTokens.alpha.white[10];
	const iconFgColor = useThemeColor(appTokens.foreground.white);
	const iconColor = useThemeColor(appTokens.component.buttons.primary.fg);

	return (
		<ThemedView
			style={[
				styles.header,
				{ paddingTop: topSafeArea, height: HEADER_HEIGHT + topSafeArea },
			]}
		>
			<ModalPremiumImage
				width={screenWidth}
				style={styles.image}
				stroke={backgroundColor}
			/>
			<ThemedText
				tokenColor={appTokens.text.primaryOnBrand}
				type='displayXs'
				style={styles.headerText}
			>
				{isFreeUserWithTrial && 'Dominate the Market.\nTry Premium Free'}
				{isFreeUserWithTrialUsed && 'Reclaim Your Edge.\nUpgrade Now'}
				{isPremiumUser && 'Lead the Market\nwith Premium'}
			</ThemedText>
			<Badge
				value={
					<View style={styles.iconContainer}>
						<BoltDuoIcon width={16} height={16} fill={iconFgColor} />
						<ThemedText
							tokenColor={appTokens.text.primaryOnBrand}
							type='textSm'
						>
							FoxRunner Premium
						</ThemedText>
					</View>
				}
				variant='filled'
				color='primary'
				size='md'
			/>
			<Button
				size='sm'
				icon={<CloseIcon width={20} height={20} fill={iconColor} />}
				onlyIcon
				buttonStyle={[styles.closeButton, { backgroundColor: bgButtonColor }]}
				containerStyle={[styles.closeButtonExtra, { top: topSafeArea + 10 }]}
				onPress={() => router.back()}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
	},

	header: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},

	image: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
	},

	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	headerText: {
		maxWidth: 340,
		marginBottom: 8,
		textAlign: 'center',
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	closeButtonExtra: {
		position: 'absolute',
		top: 0,
		right: 16,
	},

	closeButton: {
		borderRadius: 16,
	},
});
