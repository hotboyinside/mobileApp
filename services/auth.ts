import { LoginRequestData, LoginResponse, loginRequest } from '@/api/authApi';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useLogin = () => {
	return useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError,
		LoginRequestData
	>({
		mutationFn: loginRequest,
	});
};
