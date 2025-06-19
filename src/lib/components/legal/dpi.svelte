<script lang="javascript">
	import { _ } from 'svelte-i18n';
	const { dpi: data } = $props();
	let dpi = $derived({});
	$effect(() => {
		try {
			dpi = JSON.parse(data);
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div>
	{#if dpi?.controller}
		<section>
			<h2>{$_('components.legal.dpi.controller.heading')}</h2>
			<div>
				<p>
					<strong>{$_('components.legal.dpi.controller.name_label')}</strong>
					{dpi.controller.name}
				</p>
				<p>
					<strong>{$_('components.legal.dpi.controller.address_label')}</strong>
					{dpi.controller.address}
				</p>
				<p>
					<strong>{$_('components.legal.dpi.controller.email_label')}</strong>
					<a href="mailto:{dpi.controller.email}">{dpi.controller.email}</a>
				</p>
				<p>
					<strong>{$_('components.legal.dpi.controller.phone_label')}</strong>
					<a href="tel:{dpi.controller.phone}">{dpi.controller.phone}</a>
				</p>
			</div>
		</section>
	{/if}

	<section>
		<h2>{$_('components.legal.dpi.protection_officer.heading')}</h2>
		<p>
			<strong>{$_('components.legal.dpi.protection_officer.email_label')}</strong>
			<a href="mailto:{dpi.email}">{dpi.email}</a>
		</p>
	</section>

	{#if dpi?.purposes}
		<section>
			<h2>{$_('components.legal.dpi.purposes.heading')}</h2>
			<ul>
				{#each dpi.purposes as purpose}
					<li>{purpose}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if dpi?.legalBases}
		<section>
			<h2>{$_('components.legal.dpi.legal_bases.heading')}</h2>
			<div>
				{#each Object.entries(dpi.legalBases) as [key, value]}
					<div>
						<h3>{key}</h3>
						<p>{value}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if dpi?.recipients}
		<section>
			<h2>{$_('components.legal.dpi.recipients.heading')}</h2>
			<ul>
				{#each dpi.recipients as recipient}
					<li>{recipient}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if dpi?.retention}
		<section>
			<h2>{$_('components.legal.dpi.retention.heading')}</h2>
			<div>
				{#each Object.entries(dpi.retention) as [key, value]}
					<div>
						<h3>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
						<p>{value}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if dpi?.rights}
		<section>
			<h2>{$_('components.legal.dpi.rights.heading')}</h2>
			<ul>
				{#each dpi.rights as right}
					<li>{right}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if dpi.supervisoryAuthority}
		<section>
			<h2>{$_('components.legal.dpi.supervisory_authority.heading')}</h2>
			<p>{dpi.supervisoryAuthority}</p>
		</section>
	{/if}
</div>
