<script lang="ts">
	import { page } from '$app/state';
</script>

<nav class="w-full">
	<ul class="flex flex-col md:flex-row gap-4 justify-center items-center">
		<li class="w-full md:w-auto">
			<a
				class={[
					'btn',
					'w-full',
					'md:w-auto',
					page.url.pathname === '/' ? 'variant-ghost-secondary' : 'variant-ghost'
				]}
				href="/">Home</a
			>
		</li>
		<li class="w-full md:w-auto">
			<a
				class={[
					'btn w-full',
					'w-full',
					'md:w-auto',
					page.url.pathname === '/sensor' ? 'variant-ghost-secondary' : 'variant-ghost'
				]}
				href="/sensor">Sensor Menu</a
			>
		</li>
	</ul>
</nav>
