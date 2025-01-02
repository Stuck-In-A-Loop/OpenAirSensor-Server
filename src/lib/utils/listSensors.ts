import type { State } from '@vincjo/datatables/server';
import type { SensorGet, SensorData } from '$lib/types/api';

import logger from '$lib/logger';

export const fetchSensors = async (state: State) => {
	const response = await fetch(`/api/sensor?${getParams(state)}`);
	const json = await response.json();
	state.setTotalRows(json.total);
	logger.debug(json, 'json');
	return json.sensors as SensorGet[];
};

export const fetchSensorsDataPerSensor = async (state: State, id: number) => {
	const response = await fetch(`/api/sensorData/${id}?${getParams(state)}`);
	const json = await response.json();
	state.setTotalRows(json.total);
	logger.debug(json, 'json');
	return json.sensorsData as SensorData[];
};

export const fetchSensorsData = async (state: State) => {
	const response = await fetch(`/api/sensorData?${getParams(state)}`);
	const json = await response.json();
	state.setTotalRows(json.total);
	logger.debug(json, 'json');
	return json.sensorsData as SensorData[];
};

const getParams = ({ filters, offset, rowsPerPage, search, sort }: State) => {
	let params = `offset=${offset}&limit=${rowsPerPage}`;
	if (search) params += `&q=${search}`;
	if (sort) params += `&sort=${String(sort.field)}&order=${String(sort.direction)}`;
	if (filters) params += filters.map(({ field, value }) => `&${String(field)}=${value}`).join();
	return params;
};
