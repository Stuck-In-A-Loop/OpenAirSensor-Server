<script lang="ts">
	//Import local datatable components
	import type { Row, State } from '@vincjo/datatables/server';

	import { onMount } from 'svelte';
	import { fetchSensorsData } from '$lib/utils/listSensors';
	import { humanReadableDateTime } from '$lib/utils/timeHelpers';
	import {
		Datatable,
		Pagination,
		RowCount,
		RowsPerPage,
		TableHandler,
		ThSort
	} from '@vincjo/datatables/server';

	export const table = new TableHandler<Row>([], { rowsPerPage: 5, totalRows: 200 });
	table.load((state: State<Row>) => fetchSensorsData(state));
	onMount(() => {
		table.invalidate();
	});
</script>

<div class="table-container my-4">
	<Datatable {table}>
		{#snippet header()}
			<div></div>
			<RowsPerPage {table} />
		{/snippet}
		<table class="table table-hover table-compact table-auto w-full">
			<thead>
				<tr>
					<ThSort {table} field="id">ID</ThSort>
					<ThSort {table} field="sensor">Sensor</ThSort>
					<ThSort {table} field="temperatureCelsius">Temperature °C</ThSort>
					<ThSort {table} field="humidityPercent">Humidity %</ThSort>
					<ThSort {table} field="pm10">PM 10</ThSort>
					<ThSort {table} field="pm25">PM 2.5</ThSort>
					<ThSort {table} field="gpsAltitude">GPS Altitude</ThSort>
					<ThSort {table} field="gpsLatitude">GPS Latitude</ThSort>
					<ThSort {table} field="gpsLongitude">GPS Longitude</ThSort>
					<ThSort {table} field="createdAt">Created At</ThSort>
					<ThSort {table} field="updatedAt">Updated At</ThSort>
				</tr>
			</thead>
			<tbody>
				{#each table.rows as row}
					<tr>
						<td>{row.id}</td>
						<td><a class="anchor" href={`/sensor/${row.sensorId}`}>{row.sensor?.name ?? ''}</a></td>
						<td>{row.temperatureCelsius}°C</td>
						<td>{row.humidityPercent}%</td>
						<td>{row.pm10 ?? -1}</td>
						<td>{row.pm25 ?? -1}</td>
						<td>{row.gpsAltitude ?? -1}</td>
						<td>{row.gpsLatitude ?? -1}</td>
						<td>{row.gpsLongitude ?? -1}</td>
						<td>{humanReadableDateTime(row.createdAt)}</td>
						<td>{humanReadableDateTime(row.updatedAt)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#snippet footer()}
			<RowCount {table} />
			<Pagination {table} />
		{/snippet}
	</Datatable>
</div>
