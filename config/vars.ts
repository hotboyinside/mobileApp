export const config = {
	apiUrl: process.env.API_URL || 'http://192.168.0.19:8000',
	jwtRefreshSecretKey:
		process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret_key',
};
