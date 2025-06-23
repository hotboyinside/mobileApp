import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en-US/translation.json';

const resources = {
	'en-US': { translation: translationEn },
};

const initI18n = async () => {
	let savedLanguage = await AsyncStorage.getItem('language');

	if (!savedLanguage) {
		savedLanguage = 'en';
	}

	i18n.use(initReactI18next).init({
		compatibilityJSON: 'v4',
		resources,
		lng: savedLanguage,
		fallbackLng: 'pt-BR',
		interpolation: {
			escapeValue: false,
		},
	});
};

initI18n();

export default i18n;
