export type UserSettings = {
	theme: 'light' | 'dark';
	colorTheme: 'seafoam' | 'crimson' | 'hamlindigo' | 'modern' | 'vintage' | 'wintry';
	refreshInterval: number;
};

export type ColorTheme = UserSettings['colorTheme'];
