import loader from '@/assets/loader/loader.json';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

export default function Loader() {
	return (
		<View style={styles.container}>
			<LottieView source={loader} autoPlay loop style={styles.animation} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		alignContent: 'center',
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},

	animation: {
		width: 210,
		height: 210,
	},
});
