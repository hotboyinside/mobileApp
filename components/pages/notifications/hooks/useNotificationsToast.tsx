import CheckIcon from '@/assets/icons/check-icon.svg';
import { useToast } from '@/components/appProvider/toast/ToastProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { putNotificationsSettingsFx } from '@/stores/userSettings';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export const useNotificationsToast = () => {
	const { showToast } = useToast();

	const bgSuccessColor = useThemeColor(appTokens.background.successPrimary);
	const iconSuccessColor = useThemeColor(appTokens.foreground.successPrimary);

	useEffect(() => {
		const doneWatcher = putNotificationsSettingsFx.done.watch(() => {
			showToast(
				<ThemedView style={toastStyles.container}>
					<ThemedView
						style={[
							toastStyles.iconContainer,
							{ backgroundColor: bgSuccessColor },
						]}
					>
						<CheckIcon width={16} height={16} fill={iconSuccessColor} />
					</ThemedView>
					<ThemedText tokenColor={appTokens.text.primary}>
						Settings updated
					</ThemedText>
				</ThemedView>,
				4000,
				() => {},
				'bottom'
			);
		});

		const failWatcher = putNotificationsSettingsFx.fail.watch(() => {
			showToast(
				<ThemedView>
					<ThemedText tokenColor={appTokens.text.primary}>
						Something went wrong..
					</ThemedText>
				</ThemedView>,
				4000,
				() => {},
				'bottom'
			);
		});

		return () => {
			doneWatcher.unsubscribe();
			failWatcher.unsubscribe();
		};
	}, [showToast, bgSuccessColor, iconSuccessColor]);
};

const toastStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	iconContainer: {
		borderRadius: 8,
		padding: 8,
	},
});
