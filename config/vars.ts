export const config = {
	apiUrl: process.env.API_URL || 'http://192.168.0.2:8000',
	jwtRefreshSecretKey:
		process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret_key',
};

// apiUrl: process.env.API_URL || "http://192.168.1.99:8000",
