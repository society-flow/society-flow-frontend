<script lang="javascript">
	const{
    name = '',
    className = ''
  } = $props();
</script>

{#if name === 'admin'}
	<svg
		class="admin-icon {className}"
		viewBox="0 0 64 64"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		role="img"
	>
		<circle cx="20" cy="20" r="8" fill="#4CAF50" />
		<rect x="36" y="12" width="20" height="12" fill="#FFC107" rx="2" />
		<path d="M36 18 h20" stroke="#fff" stroke-width="2" />
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
		<path d="M12 32 L32 12 L52 32 V52 H12 Z" fill="#FFEB3B" />
		<circle cx="32" cy="40" r="6" fill="#2196F3" />
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
		<path d="M32 8 A12 12 0 1 1 20 20 L32 56 L44 20 A12 12 0 1 1 32 8 Z" fill="#F44336" />
		<rect x="24" y="28" width="16" height="10" fill="#FF9800" />
		<circle cx="48" cy="48" r="5" fill="#607D8B" />
		<line x1="52" y1="52" x2="58" y2="58" stroke="#607D8B" stroke-width="2" />
	</svg>
{:else if name === 'hidden-expenses'}
	<svg class="hidden-expenses {className}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<circle class="country country-1" cx="16" cy="32" r="8" fill="#FF5722" />
		<circle class="country country-2" cx="32" cy="32" r="8" fill="#FFC107" />
		<circle class="country country-3" cx="48" cy="32" r="8" fill="#03A9F4" />
		<circle class="center-dot" cx="32" cy="32" r="5" />
	</svg>
{:else if name === 'pricing-breakdown'}
	<svg class="pricing-breakdown {className}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<circle cx="32" cy="32" r="24" class="background" />
		<path class="segment segment-1" d="M32,32 L56,32 A24,24 0 0,1 32,8 Z" fill="#4CAF50" />
		<path class="segment segment-2" d="M32,32 L32,8 A24,24 0 0,1 8,32 Z" fill="#FFEB3B" />
		<path class="segment segment-3" d="M32,32 L8,32 A24,24 0 0,1 32,56 Z" fill="#F44336" />
		<circle class="center-dot" cx="32" cy="32" r="3" />
	</svg>
{:else if name === 'variable-contributions'}
	<svg
		class="variable-contributions {className}"
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path class="bar bar-1" d="M16,6 A10,10 0 0,1 26,16 L16,16 Z" fill="#FF6B35" />
		<path class="bar bar-2" d="M26,16 A10,10 0 0,1 16,26 L16,16 Z" fill="#FFD23F" />
		<path class="bar bar-3" d="M16,26 A10,10 0 0,1 6,16 L16,16 Z" fill="#7B68EE" />
		<path class="bar bar-4" d="M6,16 A10,10 0 0,1 16,6 L16,16 Z" fill="#FF1493" />
		<circle class="center-dot" cx="16" cy="16" r="3" />
	</svg>
{:else if name === 'peer-to-peer'}
	<svg class="peer-to-peer {className}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<line
			class="connection-line"
			x1="12"
			y1="52"
			x2="52"
			y2="12"
			stroke="#BDBDBD"
			stroke-width="2"
		/>
		<circle class="peer peer-1" cx="20" cy="44" r="3" fill="#8BC34A" />
		<circle class="peer peer-2" cx="32" cy="32" r="5" fill="#FF9800" />
		<circle class="peer peer-3" cx="44" cy="20" r="4" fill="#2196F3" />
		<circle
			class="pulse pulse-1"
			cx="20"
			cy="44"
			r="3"
			fill="none"
			stroke="#8BC34A"
			stroke-width="1"
			opacity="0"
		/>
		<circle
			class="pulse pulse-2"
			cx="32"
			cy="32"
			r="5"
			fill="none"
			stroke="#FF9800"
			stroke-width="1"
			opacity="0"
		/>
		<circle
			class="pulse pulse-3"
			cx="44"
			cy="20"
			r="4"
			fill="none"
			stroke="#2196F3"
			stroke-width="1"
			opacity="0"
		/>
	</svg>
{/if}

<style>
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
		filter: drop-shadow(0 0 calc(var(--s) / 2) var(--c-bg2));
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

	/* SVG 1: Hidden Expenses - Countries pulsing with mystery center */
	.hidden-expenses {
		.country {
			transform-origin: center;
			animation: pulse-country 2s ease-in-out infinite;
		}

		.country-1 {
			animation-delay: 0s;
		}
		.country-2 {
			animation-delay: 0.3s;
		}
		.country-3 {
			animation-delay: 0.6s;
		}

		.mystery-center {
			transform-origin: center;
			animation: mystery-spin 3s linear infinite;
		}

		.question-mark {
			animation: question-fade 1.5s ease-in-out infinite alternate;
		}

		&:hover {
			.country {
				animation-duration: 0.8s;
			}
			.mystery-center {
				animation-duration: 1s;
			}
		}
	}

	/* SVG 2: Pricing Breakdown - Segments growing */
	.pricing-breakdown {
		.background {
			fill: #e0f2f1;
			transition: transform ease-in-out 200ms;
			transform-origin: center center;
			&:hover {
				transform: scale(1.1);
			}
		}
		.segment {
			transform-origin: 32px 32px;
			animation: segment-grow 4s ease-in-out infinite;
		}

		.segment-1 {
			animation-delay: 0s;
		}
		.segment-2 {
			animation-delay: 0.5s;
		}
		.segment-3 {
			animation-delay: 1s;
		}

		.center-dot {
			animation: center-pulse 2s ease-in-out infinite;
		}

		&:hover {
			.segment {
				animation-duration: 2s;
			}
		}
	}

	/* SVG 3: Variable Contributions - Bars fluctuating */
	.variable-contributions {
		.bar {
			transform-origin: 16px 16px;
			animation: bar-fluctuate 3s ease-in-out infinite;
		}

		.bar-1 {
			animation-delay: 0s;
		}
		.bar-2 {
			animation-delay: 0.4s;
		}
		.bar-3 {
			animation-delay: 0.8s;
		}
		.bar-4 {
			animation-delay: 1.2s;
		}

		.center-indicator {
			animation: indicator-spin 4s linear infinite;
		}

		&:hover {
			.bar {
				transform: scale(1.15);
				animation-duration: 1.5s;
			}
		}
	}

	/* SVG 4: Peer-to-Peer - Connection pulses */
	.peer-to-peer {
		.connection-line {
			stroke-dasharray: 5, 5;
			animation: dash-flow 8s linear infinite;
			transition: all 200ms ease-in-out;
			transform-origin: center center;
		}

		.peer {
			animation: peer-bounce 5s ease-in-out infinite;
		}

		.peer-1 {
			animation-delay: 0s;
		}
		.peer-2 {
			animation-delay: 0.3s;
		}
		.peer-3 {
			animation-delay: 0.6s;
		}

		.pulse {
			animation: pulse-ring 2s ease-out infinite;
		}

		.pulse-1 {
			animation-delay: 0s;
		}
		.pulse-2 {
			animation-delay: 0.7s;
		}
		.pulse-3 {
			animation-delay: 1.4s;
		}

		&:hover {
			.connection-line {
				transform: scale(1.1);
				stroke-width: 4;
				animation-duration: 4s;
			}
			.pulse {
				animation-duration: 6s;
			}
		}
	}
	.center-dot {
		fill: var(--c-link);
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

	@keyframes pulse-country {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.1);
			opacity: 1;
		}
	}

	@keyframes mystery-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes question-fade {
		0% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes segment-grow {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	@keyframes center-pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}

	@keyframes bar-fluctuate {
		0%,
		100% {
			transform: scale(1) rotate(0deg);
		}
		25% {
			transform: scale(1.1) rotate(2deg);
		}
		75% {
			transform: scale(0.95) rotate(-2deg);
		}
	}

	@keyframes indicator-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes peer-bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-2px);
		}
	}

	@keyframes dash-flow {
		0% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: 10;
		}
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(1);
			opacity: 0.8;
		}
		50% {
			transform: scale(2);
			opacity: 0.4;
		}
		100% {
			transform: scale(3);
			opacity: 0;
		}
	}
</style>
