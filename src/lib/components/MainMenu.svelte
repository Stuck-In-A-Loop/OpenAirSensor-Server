<script lang="ts">
	import { modal } from '$lib/utils/userSettingsModal';
	import { LightSwitch, getModalStore } from '@skeletonlabs/skeleton';

	import NavMenu from './NavMenu.svelte';
	import Cog6Tooth from './icons/Cog6Tooth.svelte';
	import ColorThemeSwitcher from './ColorThemeSwitcher.svelte';

	interface Props {
		isMobile?: boolean;
	}

	let { isMobile = false }: Props = $props();

	const modalStore = getModalStore();

	const openSettingsMenu = () => {
		modalStore.trigger(modal);
	};
</script>

{#if isMobile}
	<div class="container p-10 flex flex-col place-items-center gap-4 h-full place-content-center">
		<NavMenu />
		<LightSwitch />
		<ColorThemeSwitcher />
		<button
			class="btn hover:rotate-45"
			onclick={openSettingsMenu}
			aria-label="Settings"
			title="Settings"
		>
			<Cog6Tooth />
		</button>
		<a
			class="btn variant-ghost-surface"
			href="https://github.com/CristiCriss17G/"
			target="_blank"
			rel="noreferrer"
		>
			GitHub
		</a>
	</div>
{:else}
	<LightSwitch />
	<ColorThemeSwitcher />
	<button
		class="btn hover:rotate-45"
		onclick={openSettingsMenu}
		aria-label="Settings"
		title="Settings"
	>
		<Cog6Tooth />
	</button>
	<a
		class="btn btn-sm variant-ghost-surface"
		href="https://github.com/CristiCriss17G/"
		target="_blank"
		rel="noreferrer"
	>
		GitHub
	</a>
{/if}
