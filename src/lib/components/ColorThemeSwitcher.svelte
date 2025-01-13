<script lang="ts">
	import type { ColorTheme } from '$lib/types/userSettings';

	import { userSettings } from '$lib/stores/userSettings';
	import { capitalizeFirstLetter } from '$lib/utils/strings';

	const options: ColorTheme[] = ['seafoam', 'crimson', 'hamlindigo', 'modern', 'vintage', 'wintry'];
</script>

<div class="w-full">
	<select class="select text-center w-full md:w-auto" bind:value={$userSettings.colorTheme}>
		{#each options as option}
			<option value={option}>{capitalizeFirstLetter(option)}</option>
		{/each}
	</select>
</div>
