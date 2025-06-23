import axios from 'axios';
import { config } from '../vars';

export const api = axios.create({
	baseURL: config.apiUrl,
	timeout: 15000,
});
