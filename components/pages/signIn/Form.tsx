import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { formSchema } from './schema';
import { LoginRequestData } from '@/config/api/authApi';

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
			<Button
				variant='primary'
				title='Log in'
				size='lg'
				onPress={handleSubmit(onSubmit)}
			/>
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
	},

	iconContainerExtra: {
		marginRight: 11,
	},
});
