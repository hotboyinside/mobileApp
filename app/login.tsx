// app/login.tsx
import LogoIcon from '@/assets/icons/logoIcon.svg';
import { useLocaleText } from '@/components/appProvider/localization/LocalizationProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import { appTokens } from '@/constants/tokens';
// import { Input } from '@/components/ui/Input';
import { Button, Icon, Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { createRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
	const router = useRouter();
	const loginTexts = useLocaleText().localeText.login;
	const [isSecureText, setIsSecureText] = useState(true);
	const inputRef = createRef();

	const handleLogin = async () => {
		router.replace('/'); // Перенаправление на главную
	};

	const onSubmit = async () => {
		inputRef.current.shake();
	};

	return (
		<ThemedViewWithSafeArea
			safeEdges={['top', 'right', 'bottom', 'bottom']}
			style={styles.container}
		>
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<LogoIcon style={styles.icon} />
					<ThemedText style={styles.title} type='displayXs'>
						{loginTexts?.title}
					</ThemedText>
				</View>
				<KeyboardAvoidingView behavior='padding' style={styles.form}>
					<View>
						<Input
							placeholder='Enter your email'
							label='Email'
							inputContainerStyle={styles.inputContainerExtra}
							labelStyle={styles.labelExtra}
							inputStyle={styles.inputExtra}
						/>
						<Input
							ref={inputRef}
							placeholder='Enter your password'
							label='Password'
							inputContainerStyle={styles.inputContainerExtra}
							labelStyle={styles.labelExtra}
							inputStyle={styles.inputExtra}
							secureTextEntry={isSecureText}
							rightIcon={<Icon name='user' size={24} color='black' />}
						/>
					</View>
					<Button
						title='Log in'
						ViewComponent={LinearGradient}
						linearGradientProps={{
							colors: ['#FF692E', '#FF4405'],
							start: [0, 0],
							end: [1, 0],
						}}
						onPress={onSubmit}
						buttonStyle={styles.submitBtn}
					/>
				</KeyboardAvoidingView>
			</View>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		flex: 1,
	},

	logoContainer: {
		alignItems: 'center',
	},

	icon: {
		marginTop: 32,
	},

	title: {
		width: 286,
		textAlign: 'center',
		marginTop: 16,
		fontWeight: 700,
	},

	form: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 16,
	},

	labelExtra: {
		marginBottom: 6,
	},

	inputContainerExtra: {
		borderWidth: 1,
		borderColor: appTokens.border.tertiary.light,
		backgroundColor: appTokens.background.secondary.light,
		borderRadius: 12,
	},

	inputExtra: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderWidth: 0,
		borderRadius: 12,
	},

	submitBtn: {
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 20,
		marginBottom: 12,
	},
});
