import { TEXT_TO_SPEECH } from '@/constants/apiRoutes';
import { config } from '../vars';

const TEXT_TO_SPEECH_URL = `${config.apiUrl}/${TEXT_TO_SPEECH}`;

// NOTE: In Expo/React Native, axios with `responseType: 'arraybuffer'` does NOT work like in the browser.
export const postTextToSpeech = async (text: string) => {
	const response = await fetch(TEXT_TO_SPEECH_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ text: text }),
	});

	return response;
};
