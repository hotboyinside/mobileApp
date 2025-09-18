import {
	differenceInMinutes,
	differenceInHours,
	formatDistanceToNowStrict,
	isToday,
	format,
	isYesterday,
} from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatNewsTime = (isoString: string, now: Date) => {
	const date = new Date(isoString);

	const diffMinutes = differenceInMinutes(now, date);
	const diffHours = differenceInHours(now, date);

	if (diffMinutes < 60) {
		return formatDistanceToNowStrict(date, { addSuffix: true, locale: enUS });
	}

	if (diffHours >= 1 && diffHours <= 6) {
		return formatDistanceToNowStrict(date, { addSuffix: true, locale: enUS });
	}

	if (isToday(date)) {
		return `Today at ${format(date, 'HH:mm')}`;
	}

	if (isYesterday(date)) {
		return `Yesterday at ${format(date, 'HH:mm')}`;
	}

	return format(date, "MMM d 'at' HH:mm", { locale: enUS });
};
