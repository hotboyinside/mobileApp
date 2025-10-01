import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatNewsTimeFull = (isoString: string) => {
	const date = new Date(isoString);
	return format(date, 'MMM d, yyyy, HH:mm', { locale: enUS });
};
