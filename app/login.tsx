// app/login.tsx
import Background from '@/assets/icons/bg.svg';
import Logo from '@/assets/icons/Logo.svg';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, View } from 'react-native';

export default function LoginScreen() {
	const router = useRouter();

	const handleLogin = async () => {
		router.replace('/'); // Перенаправление на главную
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Background
				width='100%'
				height='100%'
				style={{ position: 'absolute', top: 0, left: 0 }}
			/>
			<Logo />
			<Button title='Sign In' onPress={handleLogin} />
			<StatusBar style='light' />
		</View>
	);
}
