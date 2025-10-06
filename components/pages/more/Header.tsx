import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { appTokens } from '@/constants/tokens';
import { View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import moreBackgroundPremiumImage from '@/assets/images/MoreBackgroundImage.png';
import moreBackgroundFreeImage from '@/assets/images/MoreBackgroundImageFree.png';
import { useThemeColor } from '@/hooks/useThemeColor';

const OFFSET = 28;
const HEADER_HEIGHT = 160 + OFFSET;

export interface HeaderProps {
	userName: string;
	isPremium: boolean;
}

export const Header = ({ userName, isPremium }: HeaderProps) => {
	const { top: topSafeArea } = useSafeAreaInsets();

	const iconFgColor = useThemeColor(appTokens.foreground.white);
	const iconFgQuinaryColor = useThemeColor(appTokens.foreground.quinary);

	return (
		<ThemedView
			style={[
				styles.header,
				{
					height: HEADER_HEIGHT + topSafeArea,
				},
			]}
		>
			<Image
				source={
					isPremium ? moreBackgroundPremiumImage : moreBackgroundFreeImage
				}
				style={styles.backgroundImage}
			/>
			<ThemedText
				tokenColor={appTokens.text.primaryOnBrand}
				type='displayXs'
				style={[styles.headerText, { paddingTop: topSafeArea }]}
			>
				{userName}
			</ThemedText>
			{isPremium && (
				<Badge
					value={
						<View style={styles.iconContainer}>
							<BoltDuoIcon width={16} height={16} fill={iconFgColor} />
							<ThemedText
								tokenColor={appTokens.text.primaryOnBrand}
								type='textSm'
							>
								Premium
							</ThemedText>
						</View>
					}
					variant='filled'
					color='primary'
					size='md'
				/>
			)}
			{!isPremium && (
				<Badge
					value={
						<View style={styles.iconContainer}>
							<BoltDuoIcon width={16} height={16} fill={iconFgQuinaryColor} />
							<ThemedText tokenColor={appTokens.text.secondary} type='textSm'>
								Free
							</ThemedText>
						</View>
					}
					variant='modern'
					color='gray'
					size='md'
				/>
			)}
			<View style={{ height: OFFSET }} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	header: {
		position: 'relative',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	backgroundImage: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	headerText: {
		marginBottom: 8,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
});
