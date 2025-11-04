import { ModalWrapper } from '@/components/ui/ModalWrapper';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type ModalContextType = {
	showModal: (content: ReactNode) => void;
	hideModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
	showModal: () => {},
	hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);

type ModalProviderProps = {
	children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [content, setContent] = useState<ReactNode | null>(null);

	const showModal = (modalContent: ReactNode) => setContent(modalContent);
	const hideModal = () => setContent(null);

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}

			<ModalWrapper visible={!!content} onClose={hideModal}>
				{content}
			</ModalWrapper>
		</ModalContext.Provider>
	);
};
