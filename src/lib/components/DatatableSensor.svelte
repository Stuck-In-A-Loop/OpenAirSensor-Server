<script lang="ts">
	//Import local datatable components
	import type { Row, State } from '@vincjo/datatables/server';

	import { onMount } from 'svelte';
	import { fetchSensors } from '$lib/utils/listSensors';
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
	table.load((state: State<Row>) => fetchSensors(state));
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
					<ThSort {table} field="name">Name</ThSort>
					<ThSort {table} field="description">Description</ThSort>
					<ThSort {table} field="createdAt">Created At</ThSort>
					<ThSort {table} field="updatedAt">Updated At</ThSort>
				</tr>
			</thead>
			<tbody>
				{#each table.rows as row}
					<tr>
						<td>{row.id}</td>
						<td><strong><a class="anchor" href={`/sensor/${row.id}`}>{row.name}</a></strong></td>
						<td>
							{#if row.description && row.description.length > 0 && row.description.length < 50}
								{row.description}
							{:else if row.description && row.description.length > 50}
								{row.description.substr(0, 50)}...
							{:else}
								<span class="text-gray-400">No description</span>
							{/if}
						</td>
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
