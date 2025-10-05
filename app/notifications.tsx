import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import { StyleSheet } from 'react-native';

export default function notifications() {
	return (
		<ThemedViewWithSafeArea
			safeEdges={['top', 'right', 'bottom', 'left']}
			style={styles.wrapper}
		></ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});
