<script lang="ts">
	import { page } from '$app/state';
</script>

<nav>
	<ul class="flex flex-col md:flex-row gap-4 justify-center items-center">
		<li>
			<a
				class={['btn', page.url.pathname === '/' ? 'variant-ghost-secondary' : 'variant-ghost']}
				href="/">Home</a
			>
		</li>
		<li>
			<a
				class={[
					'btn',
					page.url.pathname === '/sensor' ? 'variant-ghost-secondary' : 'variant-ghost'
				]}
				href="/sensor">Sensor Menu</a
			>
		</li>
	</ul>
</nav>
