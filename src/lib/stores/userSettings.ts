import type { Writable } from 'svelte/store';
import type { UserSettings } from '$lib/types/userSettings';

import { get } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

const defaultSettings: UserSettings = {
	colorTheme: 'seafoam',
	refreshInterval: 10,
	theme: 'dark'
};

export function checkOrUpdateUserSettings(userSettingsParam: UserSettings) {
	const settings = get(userSettings);
	if (settings.theme !== userSettingsParam.theme) {
		userSettings.update((settings) => ({ ...settings, theme: userSettingsParam.theme }));
	}
	if (settings.colorTheme !== userSettingsParam.colorTheme) {
		userSettings.update((settings) => ({ ...settings, colorTheme: userSettingsParam.colorTheme }));
	}
	if (settings.refreshInterval !== userSettingsParam.refreshInterval) {
		userSettings.update((settings) => ({
			...settings,
			refreshInterval: userSettingsParam.refreshInterval
		}));
	}
}

export const userSettings: Writable<UserSettings> = persisted<UserSettings>(
	'userSettings',
	defaultSettings
);
