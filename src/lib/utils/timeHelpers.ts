import logger from '$lib/logger';

export function humanReadableDateTime(date: string): string {
	logger.debug(Intl.DateTimeFormat().resolvedOptions());
	const localeInfo = Intl.DateTimeFormat().resolvedOptions();
	const options: Intl.DateTimeFormatOptions = {
		hour12: localeInfo.hour12 === true,
		timeZone: localeInfo.timeZone
	};
	logger.debug(new Date(date).toLocaleString(localeInfo.locale, options));
	return new Date(date).toLocaleString(localeInfo.locale, options);
}
