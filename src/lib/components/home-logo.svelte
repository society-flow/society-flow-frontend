<svg
	class="house-scene"
	width="64"
	height="64"
	viewBox="0 0 64 64"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g clip-path="url(#clip0_37_3)">
		<!-- Background -->
		<path
			class="background"
			d="M52 0H12C5.37258 0 0 5.37258 0 12V52C0 58.6274 5.37258 64 12 64H52C58.6274 64 64 58.6274 64 52V12C64 5.37258 58.6274 0 52 0Z"
			fill="#E0F2FE"
		/>

		<!-- House structure -->
		<path
			class="house-body"
			d="M28.125 26H16.875C15.8395 26 15 26.7835 15 27.75V38.25C15 39.2165 15.8395 40 16.875 40H28.125C29.1605 40 30 39.2165 30 38.25V27.75C30 26.7835 29.1605 26 28.125 26Z"
			fill="#0EA5E9"
		/>

		<!-- Roof -->
		<path class="roof" d="M8 26L23 14L38 26H8Z" fill="#0284C7" />

		<!-- Door -->
		<path class="door" d="M47 27H45V40H47V27Z" fill="#92400E" />

		<!-- Ground/landscape -->
		<path
			class="ground"
			d="M12 46C24.6667 54 37.3333 54 50 46"
			stroke="#06B6D4"
			stroke-width="2"
			stroke-linecap="round"
		/>

		<!-- Tree -->
		<circle class="tree-crown" cx="46" cy="21" r="8" fill="#16A34A" />
		<rect class="tree-trunk" x="44" y="29" width="4" height="8" fill="#92400E" />

		<!-- Windows -->
		<rect class="window window-1" x="18" y="30" width="4" height="4" fill="#FEF3C7" rx="0.5" />
		<rect class="window window-2" x="24" y="30" width="4" height="4" fill="#FEF3C7" rx="0.5" />

		<!-- Chimney -->
		<rect class="chimney" x="26" y="18" width="3" height="6" fill="#7F1D1D" />

		<!-- Smoke particles -->
		<circle class="smoke smoke-1" cx="28" cy="16" r="1" fill="#D1D5DB" opacity="0" />
		<circle class="smoke smoke-2" cx="29" cy="14" r="0.8" fill="#D1D5DB" opacity="0" />
		<circle class="smoke smoke-3" cx="27" cy="12" r="0.6" fill="#D1D5DB" opacity="0" />

		<!-- Sun -->
		<circle class="sun" cx="54" cy="10" r="6" fill="#FCD34D" />
		<g class="sun-rays">
			<line x1="54" y1="2" x2="54" y2="4" stroke="#FCD34D" stroke-width="1" />
			<line x1="60" y1="10" x2="62" y2="10" stroke="#FCD34D" stroke-width="1" />
			<line x1="59" y1="5" x2="60" y2="4" stroke="#FCD34D" stroke-width="1" />
			<line x1="59" y1="15" x2="60" y2="16" stroke="#FCD34D" stroke-width="1" />
		</g>

		<!-- Clouds -->
		<ellipse class="cloud cloud-1" cx="40" cy="8" rx="3" ry="1.5" fill="#F3F4F6" />
		<ellipse class="cloud cloud-2" cx="15" cy="12" rx="4" ry="2" fill="#F3F4F6" />
	</g>
	<defs>
		<clipPath id="clip0_37_3">
			<rect width="64" height="64" fill="white" />
		</clipPath>
	</defs>
</svg>

<style>
	.house-scene {
    --svg-size: clamp(1rem, calc(var(--s * 30)), 60vw);
		cursor: pointer;
		transition: transform 0.3s ease;
		border-radius: var(--border-radius);
		box-shadow: 0 4px 20px var(--c-bg);
		background-color: var(--c-bg2);
    border: 1px solid var(--c-border);
		width: var(--svg-size);
		height: var(--svg-size);
    padding: var(--s);
    &:hover {
      border-color: var(--c-link);
    }
	}

	.house-scene:hover {
		transform: scale(1.05);
	}

	/* Background improvements */
	.background {
		transition: fill 0.5s ease;
	}

	.house-scene:hover .background {
		fill: #dbeafe;
	}

	/* House animations */
	.house-body {
		transition: fill 0.3s ease;
	}

	.house-scene:hover .house-body {
		fill: #0284c7;
	}

	.roof {
		transform-origin: 23px 20px;
		transition: transform 0.3s ease;
	}

	.house-scene:hover .roof {
		transform: scale(1.02);
	}

	/* Window glow effect */
	.window {
		transition: all 0.3s ease;
	}

	.house-scene:hover .window {
		fill: #fbbf24;
		filter: drop-shadow(0 0 4px #fbbf24);
	}

	/* Smoke animation */
	.smoke {
		animation: smoke-rise 3s ease-in-out infinite;
	}

	.smoke-1 {
		animation-delay: 0s;
	}
	.smoke-2 {
		animation-delay: 0.5s;
	}
	.smoke-3 {
		animation-delay: 1s;
	}

	.house-scene:hover .smoke {
		opacity: 0.7;
	}

	/* Tree sway */
	.tree-crown {
		transform-origin: 46px 29px;
		animation: tree-sway 4s ease-in-out infinite;
	}

	.house-scene:hover .tree-crown {
		animation-duration: 2s;
	}

	/* Sun rays rotation */
	.sun-rays {
		transform-origin: 54px 10px;
		animation: sun-rotate 8s linear infinite;
	}

	.house-scene:hover .sun-rays {
		animation-duration: 3s;
	}

	.sun {
		transition: fill 0.3s ease;
	}

	.house-scene:hover .sun {
		fill: #f59e0b;
	}

	/* Cloud drift */
	.cloud {
		animation: cloud-drift 6s ease-in-out infinite;
	}

	.cloud-1 {
		animation-delay: 0s;
		animation-direction: alternate;
	}

	.cloud-2 {
		animation-delay: 2s;
		animation-direction: alternate-reverse;
	}

	.house-scene:hover .cloud {
		animation-duration: 3s;
	}

	/* Ground wave */
	.ground {
		transition: stroke 0.3s ease;
		animation: ground-wave 4s ease-in-out infinite;
	}

	.house-scene:hover .ground {
		stroke: #0891b2;
	}

	/* Door subtle animation */
	.door {
		transition: fill 0.3s ease;
		transform-origin: 45px 33.5px;
	}

	.house-scene:hover .door {
		fill: #a16207;
		transform: scaleX(1.1);
	}

	/* Chimney */
	.chimney {
		transition: fill 0.3s ease;
	}

	.house-scene:hover .chimney {
		fill: #991b1b;
	}

	/* Keyframe animations */
	@keyframes smoke-rise {
		0% {
			transform: translateY(0) scale(0.5);
			opacity: 0;
		}
		50% {
			opacity: 0.8;
		}
		100% {
			transform: translateY(-8px) scale(1.2);
			opacity: 0;
		}
	}

	@keyframes tree-sway {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(2deg);
		}
	}

	@keyframes sun-rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes cloud-drift {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(3px);
		}
	}

	@keyframes ground-wave {
		0%,
		100% {
			stroke-dasharray: 0, 100;
		}
		50% {
			stroke-dasharray: 10, 5;
		}
	}

	p {
		color: #374151;
		font-size: 14px;
		text-align: center;
		margin: 0;
	}
</style>
