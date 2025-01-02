import type { Writable } from 'svelte/store';
import type { MarkerDataMap } from '$lib/types/mapTypes';

import { writable } from 'svelte/store';

export const sensorPosition: Writable<MarkerDataMap> = writable({});
