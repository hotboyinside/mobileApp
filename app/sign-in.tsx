import LogoIcon from '@/assets/icons/logo-icon.svg';
import { useSession } from '@/components/appProvider/session/SessionContext';
import Form from '@/components/pages/signIn/Form';
import { ThemedText } from '@/components/ThemedText';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import { LoginRequestData } from '@/config/api/authApi';
import {
	ERROR_SERVER_UNAVAILABLE,
	ERROR_INVALID_CREDENTIALS,
} from '@/constants/errorMessages';
import { useLogin } from '@/services/auth';
import { Input } from '@rneui/base';
import { useRef, useState } from 'react';
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

export default function LoginScreen() {
	const { signIn } = useSession();
	const { mutate: login } = useLogin();

	const inputEmailRef = useRef<Input>(null);
	const inputPasswordRef = useRef<Input>(null);

	const [serverError, setServerError] = useState<string | null>(null);

	const onSubmit = (data: LoginRequestData) => {
		setServerError(null);
		login(data, {
			onSuccess: res => {
				signIn(res.data.success.user);
			},
			onError: err => {
				if (!err.response) {
					setServerError(ERROR_SERVER_UNAVAILABLE);
				} else {
					setServerError(ERROR_INVALID_CREDENTIALS);
					if (inputEmailRef.current && inputPasswordRef.current) {
						inputEmailRef.current.shake();
						inputPasswordRef.current.shake();
					}
				}
			},
		});
	};

	return (
		<ThemedViewWithSafeArea
			safeEdges={['top', 'right', 'bottom', 'left']}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.content}>
					<View style={styles.logoContainer}>
						<LogoIcon />
						<ThemedText style={styles.title} type='displayXs'>
							Welcome back to&nbsp;FoxRunner
						</ThemedText>
					</View>
					<Form
						serverError={serverError}
						onSubmit={onSubmit}
						inputEmailRef={inputEmailRef}
						inputPasswordRef={inputPasswordRef}
					/>
				</View>
			</TouchableWithoutFeedback>
		</ThemedViewWithSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	content: {
		flex: 1,
		paddingTop: 32,
		paddingBottom: 16,
		paddingHorizontal: 16,
	},

	logoContainer: {
		alignItems: 'center',
		marginTop: 16,
	},

	title: {
		width: 286,
		textAlign: 'center',
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},
});
