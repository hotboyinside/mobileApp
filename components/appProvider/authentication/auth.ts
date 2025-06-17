import * as SecureStore from 'expo-secure-store';

export interface IAuthService {
	getToken: () => Promise<string | null>;
	saveToken: (token: string) => void;
	removeToken: () => void;
}

const TOKEN_KEY = 'user_token';

export const authService = (): IAuthService => {
	return {
		getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
		saveToken: (token: string) => {
			SecureStore.setItemAsync(TOKEN_KEY, token);
		},
		removeToken: () => {
			SecureStore.deleteItemAsync(TOKEN_KEY);
		},
	};
};
