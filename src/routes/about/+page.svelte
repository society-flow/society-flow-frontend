<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('menu.about')}</title>
</svelte:head>

<header>
	<h1>{$_('menu.about')}</h1>
</header>

<section size="large">
	<article>
		<p>
			Different countries with same problem: Hidden expense management without clear visibility of
			costs and funds.
		</p>
		<svg class="hidden-expenses" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
			<circle class="country country-1" cx="16" cy="32" r="8" fill="#FF5722" />
			<circle class="country country-2" cx="32" cy="32" r="8" fill="#FFC107" />
			<circle class="country country-3" cx="48" cy="32" r="8" fill="#03A9F4" />
			<circle class="mystery-center" cx="32" cy="32" r="5" fill="#212121" />
			<text class="question-mark" x="32" y="36" text-anchor="middle" fill="white" font-size="8"
				>?</text
			>
		</svg>
	</article>

	<article>
		<p>
			Our goal is to provide detailed breakup of dynamically calculated monthly pricing to your
			knowledge.
		</p>

		<svg class="pricing-breakdown" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
			<circle cx="32" cy="32" r="24" fill="#E0F2F1" />
			<path class="segment segment-1" d="M32,32 L56,32 A24,24 0 0,1 32,8 Z" fill="#4CAF50" />
			<path class="segment segment-2" d="M32,32 L32,8 A24,24 0 0,1 8,32 Z" fill="#FFEB3B" />
			<path class="segment segment-3" d="M32,32 L8,32 A24,24 0 0,1 32,56 Z" fill="#F44336" />
			<circle class="center-dot" cx="32" cy="32" r="3" fill="#212121" />
		</svg>
	</article>

	<article>
		<p>
			We do feel strongly that expense reduced or increased should make the contributions vary, not
			fixed. Also, different expenses need different way of distribution across residences.
		</p>

		<svg class="variable-contributions" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
			<path class="bar bar-1" d="M16,6 A10,10 0 0,1 26,16 L16,16 Z" fill="#FF6B35" />
			<path class="bar bar-2" d="M26,16 A10,10 0 0,1 16,26 L16,16 Z" fill="#FFD23F" />
			<path class="bar bar-3" d="M16,26 A10,10 0 0,1 6,16 L16,16 Z" fill="#7B68EE" />
			<path class="bar bar-4" d="M6,16 A10,10 0 0,1 16,6 L16,16 Z" fill="#FF1493" />
			<circle class="center-indicator" cx="16" cy="16" r="3" fill="#1A1A1A" />
		</svg>
	</article>

	<article>
		<p>
			Along the way, our system allows you to create or find geo located ads from valid member of
			users, bypassing middle men. Next time reach out peer to peer for any services within your
			area of interest without overpaying!
		</p>

		<svg class="peer-to-peer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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

			<!-- Connection indicators -->
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
	</article>
</section>

<style>
	section {
		font-style: italic;
		font-size: 1.3rem;
		line-height: 1.5;
		display: grid;
		gap: calc(var(--s) * 10);
		@media (min-width: 40rem) {
			grid-template-columns: 1fr 1fr;
		}
    :global(.Site-main) > & {
      max-width: calc(var(--s-container) * 1.5)
    }
	}

	article {
		display: flex;
		flex-direction: column;
    justify-content: center;
    @media (min-width: 40rem) {
      &:nth-child(2n) {
        flex-direction: column-reverse;
		  }
      &:nth-child(3n) {
        flex-direction: row;
        align-items: center;
		  }
    }
	}

	svg {
		margin: 10vw;
		cursor: pointer;
		transition: transform 0.3s ease;
		@media (min-width: 40rem) {
			margin: 3vw;
		}
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
			transform: scale(1.05);
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
			transform: scale(1.1);
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
			transform: scale(1.15);
			.bar {
				animation-duration: 1.5s;
			}
		}
	}

	/* SVG 4: Peer-to-Peer - Connection pulses */
	.peer-to-peer {
		.connection-line {
			stroke-dasharray: 5, 5;
			animation: dash-flow 2s linear infinite;
		}

		.peer {
			animation: peer-bounce 2s ease-in-out infinite;
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
			transform: scale(1.1);
			.connection-line {
				stroke-width: 4;
				animation-duration: 1s;
			}
			.pulse {
				animation-duration: 1s;
			}
		}
	}

	/* Keyframe Animations */
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
