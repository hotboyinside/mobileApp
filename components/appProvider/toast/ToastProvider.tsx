import CloseIcon from '@/assets/icons/close-icon.svg';
import { Button } from '@/components/ui/Button';
import { ToastKeywordAlertContent } from '@/components/ui/ToastContent/ToastKeywordAlertContent';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { $newsToast } from '@/stores/notificationsToasts/model';
import { useUnit } from 'effector-react';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ToastContextType {
	showToast: (
		content: React.ReactNode,
		duration?: number,
		onPress?: () => void,
		position?: 'top' | 'bottom'
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
	const [position, setPosition] = useState<'top' | 'bottom'>('top');

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
				toValue: position === 'top' ? -100 : 100,
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
	}, [position]);

	const showToast = useCallback(
		(
			newContent: React.ReactNode,
			duration: number = 3000,
			onPress?: () => void,
			pos: 'top' | 'bottom' = 'top'
		) => {
			if (hideTimeout.current) clearTimeout(hideTimeout.current);
			setContent(newContent);
			setOnPressCallback(() => onPress || null);
			setPosition(pos);

			translateY.setValue(pos === 'top' ? -100 : 100);

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
		[closeToast, fadeAnim, translateY]
	);

	useEffect(() => {
		if (toastData) {
			const { title, keywords, onPress } = toastData;
			showToast(
				<ToastKeywordAlertContent title={title} keywords={keywords} />,
				5000,
				onPress,
				'top'
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
						position === 'top' ? styles.topPosition : styles.bottomPosition,
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
		left: 0,
		right: 0,
		paddingHorizontal: 16,
		zIndex: 100,
	},

	topPosition: {
		top: 0,
		paddingTop: 40,
	},

	bottomPosition: {
		bottom: 60,
	},

	toastInner: {
		position: 'relative',
		borderWidth: 1,
		borderRadius: 16,
		padding: 12,
		flexDirection: 'row',
	},

	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
});
