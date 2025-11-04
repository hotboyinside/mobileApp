import CloseIcon from '@/assets/icons/close-icon.svg';
import LogOutIcon from '@/assets/icons/log-out-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet } from 'react-native';
import { Button } from '../Button';

type LogOutConfirmModalProps = {
	onConfirm: () => void;
	onClose: () => void;
};

export const LogOutConfirmModal = ({
	onConfirm,
	onClose,
}: LogOutConfirmModalProps) => {
	const tertiaryButtonColor = useThemeColor(
		appTokens.component.buttons.tertiaryGray.fg
	);
	const altBorderColor = useThemeColor(appTokens.border.alt);
	const errorIconColor = useThemeColor(appTokens.foreground.errorPrimary);
	const errorBackgroundColor = useThemeColor(appTokens.background.errorPrimary);

	return (
		<ThemedView style={[styles.container, { borderColor: altBorderColor }]}>
			<ThemedView style={styles.header}>
				<Button
					variant='tertiary'
					size='sm'
					onlyIcon
					icon={<CloseIcon width={20} height={20} fill={tertiaryButtonColor} />}
					onPress={onClose}
				/>
			</ThemedView>
			<ThemedView
				style={[
					styles.logOutContainer,
					{ backgroundColor: errorBackgroundColor },
				]}
			>
				<LogOutIcon width={28} height={28} fill={errorIconColor} />
			</ThemedView>
			<ThemedText type='textLg' style={styles.title}>
				Log Out?
			</ThemedText>
			<ThemedText
				tokenColor={appTokens.text.tertiary}
				type='textSm'
				style={styles.description}
			>
				Are you sure you want to log out of FoxRunner?
			</ThemedText>
			<ThemedView style={styles.buttons}>
				<Button variant='destructive' size='lg' onPress={onConfirm}>
					Log out
				</Button>
				<Button variant='secondary' size='lg' onPress={onClose}>
					Cancel
				</Button>
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderRadius: 24,
		padding: 16,
	},

	header: {
		flexDirection: 'row-reverse',
	},

	logOutContainer: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		width: 56,
		height: 56,
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
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	buttons: {
		marginTop: 24,
		gap: 12,
	},
});
