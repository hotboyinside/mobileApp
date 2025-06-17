import { createContext, ReactNode, useContext } from 'react';

interface DialogContextType {
	openDialog: (content: ReactNode, onSubmit?: () => void) => void;
	closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialogContext = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error('useDialogContext must be used inside DialogProvider');
	}

	return context;
};
