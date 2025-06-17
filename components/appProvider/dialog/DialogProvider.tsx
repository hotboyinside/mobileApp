import React, { createContext, useCallback, useContext, useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

const DialogContext = createContext({
	openDialog: (content: React.ReactNode, onSubmit?: () => void) => {},
	closeDialog: () => {},
});

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
	const [isShow, setIsShow] = useState(false);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [submitAction, setSubmitAction] = useState<(() => void) | null>(null);

	const openDialog = useCallback(
		(content: React.ReactNode, onSubmit?: () => void) => {
			setContent(content);
			setSubmitAction(() => onSubmit || null);
			setIsShow(true);
		},
		[]
	);

	const closeDialog = useCallback(() => {
		setIsShow(false);
		setContent(null);
		setSubmitAction(null);
	}, []);

	const onSubmit = () => {
		if (submitAction) submitAction();
		closeDialog();
	};

	return (
		<DialogContext value={{ openDialog, closeDialog }}>
			{children}
			<Modal
				visible={isShow}
				transparent
				animationType='fade'
				onRequestClose={closeDialog}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						{content}
						<Button title='Submit' onPress={onSubmit} />
						<Button title='Close' onPress={closeDialog} />
					</View>
				</View>
			</Modal>
		</DialogContext>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
	},
});
