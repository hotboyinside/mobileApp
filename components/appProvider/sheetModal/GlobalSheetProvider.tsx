import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	BottomSheetBackdrop,
	BottomSheetFooterProps,
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { StyleSheet, View } from 'react-native';

interface SheetContextType {
	openSheetModal: (
		key: SheetKey,
		content: ReactNode,
		footer?: (props: BottomSheetFooterProps) => React.ReactElement
	) => void;
	closeSheetModal: (key: SheetKey) => void;
}

interface GlobalSheetProviderProps {
	children: ReactNode;
}

type SheetKey = 'main' | 'secondary';

const SheetContext = createContext<SheetContextType | null>(null);

export const GlobalSheetProvider = ({ children }: GlobalSheetProviderProps) => {
	const mainModalRef = useRef<BottomSheetModal>(null);
	const secondaryModalRef = useRef<BottomSheetModal>(null);

	const [mainContent, setMainContent] = useState<ReactNode>(null);
	const [secondaryContent, setSecondaryContent] = useState<ReactNode>(null);

	const [mainFooter, setMainFooter] = useState<
		((props: BottomSheetFooterProps) => React.ReactElement) | null
	>(null);
	const [secondaryFooter, setSecondaryFooter] = useState<
		((props: BottomSheetFooterProps) => React.ReactElement) | null
	>(null);

	const openSheetModal = useCallback(
		(
			key: SheetKey,
			content: ReactNode,
			footer?: (props: BottomSheetFooterProps) => React.ReactElement
		) => {
			if (key === 'main') {
				setMainContent(content);
				setMainFooter(() => footer || null);
				mainModalRef.current?.present();
			} else if (key === 'secondary') {
				setSecondaryContent(content);
				setSecondaryFooter(() => footer || null);
				secondaryModalRef.current?.present();
			}
		},
		[]
	);

	const closeSheetModal = useCallback((key: SheetKey) => {
		if (key === 'main') mainModalRef.current?.dismiss();
		if (key === 'secondary') secondaryModalRef.current?.dismiss();
	}, []);

	const contextValue = useMemo(
		() => ({ openSheetModal, closeSheetModal }),
		[openSheetModal, closeSheetModal]
	);

	const backgroundColor = useThemeColor(appTokens.background.primary);

	return (
		<SheetContext value={contextValue}>
			{children}
			<BottomSheetModalProvider>
				<BottomSheetModal
					ref={mainModalRef}
					handleComponent={() => <View style={styles.handle} />}
					backdropComponent={props => (
						<BottomSheetBackdrop
							{...props}
							disappearsOnIndex={-1}
							appearsOnIndex={0}
						/>
					)}
					backgroundStyle={[
						styles.background,
						{ backgroundColor: backgroundColor },
					]}
					footerComponent={mainFooter || undefined}
				>
					{mainContent}
				</BottomSheetModal>
			</BottomSheetModalProvider>

			<BottomSheetModalProvider>
				<BottomSheetModal
					ref={secondaryModalRef}
					handleComponent={() => <View style={styles.handle} />}
					backdropComponent={props => (
						<BottomSheetBackdrop
							{...props}
							disappearsOnIndex={-1}
							appearsOnIndex={0}
						/>
					)}
					backgroundStyle={[
						styles.background,
						{ backgroundColor: backgroundColor },
					]}
					footerComponent={secondaryFooter || undefined}
				>
					{secondaryContent}
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</SheetContext>
	);
};

export const styles = StyleSheet.create({
	handle: {
		height: 24,
	},

	background: {
		borderRadius: 16,
	},
});

export const useGlobalSheet = (): SheetContextType => {
	const context = useContext(SheetContext);
	if (!context)
		throw new Error('useGlobalSheet must be used within GlobalSheetProvider');
	return context;
};
