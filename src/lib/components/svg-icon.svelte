<script lang="javascript">
	/**
	 * name: one of "admin", "member", or "rent"
	 * className: any extra classes you want to forward
	 */
	export let name; // 'admin' | 'member' | 'rent'
	export let className; // string
</script>

{#if name === 'admin'}
	<svg
		class="admin-icon {className}"
		viewBox="0 0 64 64"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		role="img"
	>
		<!-- Avatar circle -->
		<circle cx="20" cy="20" r="8" fill="#4CAF50" />
		<!-- Gear/board rectangle -->
		<rect x="36" y="12" width="20" height="12" fill="#FFC107" rx="2" />
		<path d="M36 18 h20" stroke="#fff" stroke-width="2" />
		<!-- Approval check/circle icon -->
		<circle cx="50" cy="40" r="6" fill="#757575" />
		<path d="M50 34 v12" stroke="#fff" stroke-width="2" />
	</svg>
{:else if name === 'member'}
	<svg
		class="member-icon {className}"
		viewBox="0 0 64 64"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		role="img"
	>
		<!-- House shape -->
		<path d="M12 32 L32 12 L52 32 V52 H12 Z" fill="#FFEB3B" />
		<!-- User circle -->
		<circle cx="32" cy="40" r="6" fill="#2196F3" />
		<!-- Message bubble -->
		<rect x="42" y="20" width="12" height="8" fill="#03A9F4" rx="1" />
		<path d="M42 20 L48 26 L54 20" fill="none" stroke="#fff" stroke-width="2" />
	</svg>
{:else if name === 'rent'}
	<svg
		class="rent-icon {className}"
		viewBox="0 0 64 64"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		role="img"
	>
		<!-- Map pin / location marker -->
		<path d="M32 8 A12 12 0 1 1 20 20 L32 56 L44 20 A12 12 0 1 1 32 8 Z" fill="#F44336" />
		<!-- House inside pin -->
		<rect x="24" y="28" width="16" height="10" fill="#FF9800" />
		<!-- Magnifying‐glass circle + handle -->
		<circle cx="48" cy="48" r="5" fill="#607D8B" />
		<line x1="52" y1="52" x2="58" y2="58" stroke="#607D8B" stroke-width="2" />
	</svg>
{/if}

<style>
	/* ─── THE SAME ANIMATION RULES AS BEFORE ─────────────────────────────────── */

	/* Admin icon: bounce avatar and spin “gear” on hover */
	.admin-icon:hover circle:first-of-type {
		animation: bounce 6s infinite;
    animation-play-state: pause;
	}
	.admin-icon:hover circle:last-of-type {
    transform: rotate(20deg);
    animation-play-state: pause;
	}

	/* Member icon: glow house + pulse message box on hover */
	.member-icon:hover path:first-of-type {
		filter: drop-shadow(0 0 calc(var(--s) / 2) var(--c-bg--secondary));
	}
	.member-icon:hover rect {
		animation: pulseBox 1s infinite;
    animation-play-state: pause;
	}

	/* Rent icon: pop pin + scale magnifier on hover */
	.rent-icon:hover path {
		animation: pop 4s infinite;
    animation-play-state: pause;
	}
	.rent-icon:hover circle,
	.rent-icon:hover line {
		transform: scale(1.2);
		transform-origin: center;
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@keyframes pulseBox {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
