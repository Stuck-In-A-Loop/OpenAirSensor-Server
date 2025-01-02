<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import {
		AppBar,
		Modal,
		Toast,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import xml from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css'; // for HTML
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	import { browser } from '$app/environment';
	import NavMenu from '$lib/components/NavMenu.svelte';
	import MainMenu from '$lib/components/MainMenu.svelte';
	import Bars3 from '$lib/components/icons/Bars3.svelte';
	import { userSettings } from '$lib/stores/userSettings';
	// import MediaQuery from '$lib/components/MediaQuery.svelte';

	const mobile = new MediaQuery('min-width: 768px', true);

	initializeStores();

	const drawerStore = getDrawerStore();

	// Floating UI for Popups
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	storePopup.set({ arrow, autoUpdate, computePosition, flip, offset, shift });

	function drawerOpen() {
		drawerStore.open();
	}

	$effect(() => {
		if (browser) {
			document.body.setAttribute('data-theme', $userSettings.colorTheme);
		}
	});
</script>

<svelte:head>
	<title>OpenAirSensor Server</title>
</svelte:head>

<Toast position="bl" max={4} padding="p-3" />

<Modal />

<Drawer position="right" width="w-1/2">
	<MainMenu isMobile={true} />
</Drawer>

<!-- App Shell -->
<div class="grid h-screen grid-rows-[auto_1fr]">
	<!-- Header -->
	<header class="sticky top-0 z-10 backdrop-blur-sm">
		<!-- App Bar -->
		<AppBar>
			{#snippet lead()}
				<a href="/" class="flex items-center space-x-2">
					<h1 class="title">OpenAir sensor server</h1>
				</a>
			{/snippet}
			{#if mobile.current}
				<NavMenu />
			{/if}
			{#snippet trail()}
				{#if mobile.current}
					<MainMenu />
				{:else}
					<button class="md:hidden btn btn-sm mr-4" onclick={drawerOpen}>
						<Bars3 />
					</button>
				{/if}
			{/snippet}
		</AppBar>
	</header>
	<!-- Grid Columns -->
	<div class="grid grid-cols-[1fr] h-full overflow-hidden">
		<!-- Left Sidebar. -->
		<!-- <aside class="overflow-x-hidden overflow-y-auto w-auto">
			<Navigation />
		</aside> -->
		<!-- Page Route Content -->
		<div class="overflow-x-hidden overflow-y-auto">
			{@render children?.()}
		</div>
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-xl uppercase font-bold;
	}
</style>
