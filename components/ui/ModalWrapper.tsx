import React from 'react';
import {
	Modal,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

type ModalWrapperProps = {
	visible: boolean;
	onClose?: () => void;
	children: React.ReactNode;
};

export const ModalWrapper = ({
	visible,
	onClose,
	children,
}: ModalWrapperProps) => {
	return (
		<Modal transparent animationType='fade' visible={visible}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.overlay} />
			</TouchableWithoutFeedback>

			<View style={styles.centered}>{children}</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
});
