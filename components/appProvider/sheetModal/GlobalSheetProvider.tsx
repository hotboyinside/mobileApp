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

interface SheetContextType {
	openBottomSheet: (
		content: ReactNode,
		footer?: (props: BottomSheetFooterProps) => React.ReactElement
	) => void;
	closeBottomSheet: () => void;
}

interface GlobalSheetProviderProps {
	children: ReactNode;
}

const SheetContext = createContext<SheetContextType | null>(null);

export const GlobalSheetProvider = ({ children }: GlobalSheetProviderProps) => {
	const modalRef = useRef<BottomSheetModal>(null);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [footer, setFooter] = useState<
		((props: BottomSheetFooterProps) => React.ReactElement) | null
	>(null);

	const openBottomSheet = useCallback(
		(
			c: ReactNode,
			f?: (props: BottomSheetFooterProps) => React.ReactElement
		) => {
			setContent(c);
			setFooter(() => f || null);
			modalRef.current?.present();
		},
		[]
	);

	const closeBottomSheet = useCallback(() => {
		modalRef.current?.dismiss();
	}, []);

	const contextValue = useMemo(
		() => ({ openBottomSheet, closeBottomSheet }),
		[openBottomSheet, closeBottomSheet]
	);

	return (
		<BottomSheetModalProvider>
			<SheetContext value={contextValue}>
				{children}
				<BottomSheetModal
					ref={modalRef}
					backdropComponent={props => (
						<BottomSheetBackdrop
							{...props}
							disappearsOnIndex={-1}
							appearsOnIndex={0}
						/>
					)}
					backgroundStyle={{ borderRadius: 20 }}
					footerComponent={footer || undefined}
				>
					{content}
				</BottomSheetModal>
			</SheetContext>
		</BottomSheetModalProvider>
	);
};

export const useGlobalSheet = (): SheetContextType => {
	const context = useContext(SheetContext);
	if (!context)
		throw new Error('useGlobalSheet must be used within GlobalSheetProvider');
	return context;
};
