<script lang="javascript">
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
	<h1>Privacy Policy</h1>

	{#if dpi?.controller}
		<section>
			<h2>Data Controller</h2>
			<div>
				<p><strong>Name:</strong> {dpi.controller.name}</p>
				<p><strong>Address:</strong> {dpi.controller.address}</p>
				<p>
					<strong>Email:</strong> <a href="mailto:{dpi.controller.email}">{dpi.controller.email}</a>
				</p>
				<p>
					<strong>Phone:</strong> <a href="tel:{dpi.controller.phone}">{dpi.controller.phone}</a>
				</p>
			</div>
		</section>
	{/if}

	<section>
		<h2>Data Protection Officer</h2>
		<p><strong>Email:</strong> <a href="mailto:{dpi.email}">{dpi.email}</a></p>
	</section>

	{#if dpi?.purposes}
		<section>
			<h2>Purposes of Processing</h2>
			<ul>
				{#each dpi.purposes as purpose}
					<li>{purpose}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if dpi?.legalBases}
		<section>
			<h2>Legal Bases</h2>
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
			<h2>Data Recipients</h2>
			<ul>
				{#each dpi.recipients as recipient}
					<li>{recipient}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if dpi?.retention}
		<section>
			<h2>Data Retention</h2>
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
			<h2>Your Rights</h2>
			<ul>
				{#each dpi.rights as right}
					<li>{right}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if dpi.supervisoryAuthority}
		<section>
			<h2>Supervisory Authority</h2>
			<p>{dpi.supervisoryAuthority}</p>
		</section>
	{/if}
</div>
