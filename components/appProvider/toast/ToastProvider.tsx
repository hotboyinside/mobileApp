import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useRef,
	useEffect,
} from 'react';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { $newsToast } from '@/stores/notificationsToasts/model';
import { useUnit } from 'effector-react';
import { ToastKeywordAlertContent } from '@/components/ui/ToastContent/ToastKeywordAlertContent';

interface ToastContextType {
	showToast: (
		content: React.ReactNode,
		duration?: number,
		onPress?: () => void
	) => void;
	closeToast: () => void;
}

const ToastContext = createContext<ToastContextType>({
	showToast: () => {},
	closeToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [content, setContent] = useState<React.ReactNode | null>(null);
	const [onPressCallback, setOnPressCallback] = useState<(() => void) | null>(
		null
	);

	const toastData = useUnit($newsToast);

	const translateY = useRef(new Animated.Value(-100)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const hideTimeout = useRef<number | null>(null);

	const borderColor = useThemeColor(appTokens.border.tertiary);
	const bgColor = useThemeColor(appTokens.background.primary);
	const iconColor = useThemeColor(appTokens.component.buttons.tertiaryGray.fg);

	const closeToast = useCallback(() => {
		if (hideTimeout.current) clearTimeout(hideTimeout.current);

		Animated.parallel([
			Animated.timing(translateY, {
				toValue: -100,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start(() => {
			setContent(null);
			setOnPressCallback(null);
		});
	}, []);

	const showToast = useCallback(
		(
			newContent: React.ReactNode,
			duration: number = 3000,
			onPress?: () => void
		) => {
			if (hideTimeout.current) clearTimeout(hideTimeout.current);
			setContent(newContent);
			setOnPressCallback(() => onPress || null);

			Animated.parallel([
				Animated.spring(translateY, {
					toValue: 0,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();

			hideTimeout.current = setTimeout(() => {
				closeToast();
			}, duration);
		},
		[closeToast]
	);

	useEffect(() => {
		if (toastData) {
			const { title, keywords, onPress } = toastData;

			showToast(
				<ToastKeywordAlertContent title={title} keywords={keywords} />,
				3000,
				onPress
			);
		}
	}, [toastData, showToast]);

	return (
		<ToastContext.Provider value={{ showToast, closeToast }}>
			{children}

			{content && (
				<Animated.View
					style={[
						styles.toastContainer,
						{
							transform: [{ translateY }],
							opacity: fadeAnim,
						},
					]}
				>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							if (onPressCallback) onPressCallback();
							closeToast();
						}}
					>
						<View
							style={[
								styles.toastInner,
								{ backgroundColor: bgColor, borderColor: borderColor },
							]}
						>
							{content}

							<Button
								variant='tertiary'
								size='sm'
								onPress={closeToast}
								onlyIcon
								icon={<CloseIcon width={20} height={20} fill={iconColor} />}
								containerStyle={styles.closeButton}
							/>
						</View>
					</TouchableOpacity>
				</Animated.View>
			)}
		</ToastContext.Provider>
	);
};

const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 16,
		zIndex: 1,
	},

	toastInner: {
		position: 'relative',
		borderWidth: 1,
		borderRadius: 16,
		marginTop: 40,
		padding: 12,
		flexDirection: 'row',
	},

	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
});
