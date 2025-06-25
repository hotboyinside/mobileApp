import {
	ERROR_INVALID_EMAIL,
	ERROR_INVALID_PASSWORD,
} from '@/constants/errorMessages';
import * as yup from 'yup';

export const formSchema = yup
	.object({
		email: yup
			.string()
			.email(ERROR_INVALID_EMAIL)
			.required(ERROR_INVALID_EMAIL),
		password: yup.string().required(ERROR_INVALID_PASSWORD),
	})
	.required();
