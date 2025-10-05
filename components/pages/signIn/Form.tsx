import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Linking } from 'react-native';
import { formSchema } from './schema';
import { LoginRequestData } from '@/config/api/authApi';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import FoxrunnerIcon from '@/assets/icons/foxrunner-icon.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';

const TERMS_OF_SERVICE_URL =
	'https://foxrunner.com/termsAndConditions?utm_source=chatgpt.com';
const PRIVACY_POLICY = 'https://foxrunner.com/privacyPolicy';
const FOXRUNNER_URL = 'https://foxrunner.com';

type FormProps = {
	serverError: string | null;
	onSubmit: (data: LoginRequestData) => void;
	inputEmailRef: any;
	inputPasswordRef: any;
};

export default function Form({
	serverError,
	onSubmit,
	inputEmailRef,
	inputPasswordRef,
}: FormProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(formSchema),
	});

	const linkColor = useThemeColor(appTokens.text.brandSecondary);
	const descriptionColor = useThemeColor(appTokens.text.quaternary);
	const iconColor = useThemeColor(appTokens.component.buttons.secondaryGray.fg);

	return (
		<View style={styles.formContainer}>
			<View style={styles.inputContainer}>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Input
							type='text'
							label='Email'
							placeholder='Enter your email'
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							ref={inputEmailRef}
							errorMessage={errors.email?.message}
							isError={Boolean(errors.email?.message) || Boolean(serverError)}
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<Input
							type='password'
							label='Password'
							placeholder='Enter your password'
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							ref={inputPasswordRef}
							rightIconContainerStyle={styles.iconContainerExtra}
							errorMessage={serverError || errors.password?.message}
							isError={
								Boolean(errors.password?.message) || Boolean(serverError)
							}
						/>
					)}
				/>
			</View>
			<ThemedView>
				<ThemedText
					type='textSm'
					style={[styles.text, { color: descriptionColor }]}
				>
					By tapping Continue, you agree to&nbsp;our&nbsp;
					<ThemedText
						type='textSm'
						style={[styles.link, { color: linkColor }]}
						onPress={() => Linking.openURL(TERMS_OF_SERVICE_URL)}
					>
						Terms&nbsp;of&nbsp;Service
					</ThemedText>{' '}
					and&nbsp;
					<ThemedText
						type='textSm'
						style={[styles.link, { color: linkColor }]}
						onPress={() => Linking.openURL(PRIVACY_POLICY)}
					>
						Privacy Policy
					</ThemedText>
				</ThemedText>
				<ThemedView style={styles.buttonContainer}>
					<Button
						variant='primary'
						title='Continue'
						size='lg'
						onPress={handleSubmit(onSubmit)}
					/>
					<Button
						variant='secondary'
						title='Create Account'
						size='lg'
						onPress={() => Linking.openURL(FOXRUNNER_URL)}
						icon={<FoxrunnerIcon width={20} height={20} fill={iconColor} />}
					/>
				</ThemedView>
			</ThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		gap: 24,
	},

	formContainer: {
		flex: 1,
		justifyContent: 'space-between',
		marginTop: 32,
		marginBottom: 16,
	},

	iconContainerExtra: {
		marginRight: 11,
	},

	text: {
		marginBottom: 32,
		textAlign: 'center',
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	link: {
		textDecorationLine: 'underline',
	},

	buttonContainer: {
		gap: 12,
	},
});
