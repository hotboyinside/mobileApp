import { ThemedView } from '@/components/ThemedView';
import { Input } from '@/components/ui/Input';
import { StyleSheet } from 'react-native';

type RangeInputProps = {
	from: string;
	to: string;
	onChange: (from: string, to: string) => void;
};

export const RangeInput = ({ from, to, onChange }: RangeInputProps) => {
	return (
		<ThemedView style={styles.container}>
			<Input
				value={from}
				onChangeText={value => onChange(value, to)}
				type='number'
				containerStyle={styles.inputContainer}
				placeholder='From'
			/>

			<Input
				value={to}
				onChangeText={value => onChange(from, value)}
				type='number'
				containerStyle={styles.inputContainer}
				placeholder='To'
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
	},

	inputContainer: {
		flex: 1,
	},
});
