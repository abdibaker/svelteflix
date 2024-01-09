<script>
	import { onMount } from 'svelte';

	let progress = 0;
	let visible = false;

	onMount(() => {
		function updateProgress() {
			visible = true;
			progress += 0.1;

			const remaining = 1 - progress;
			if (remaining > 0.15) {
				setTimeout(updateProgress, 500 / remaining);
			}
		}

		// Start the progress update cycle
		setTimeout(updateProgress, 400);
	});
</script>

{#if visible}
	<div class="progress-container">
		<div class="progress" style="width: {progress * 100}%" />
	</div>
{/if}

{#if progress >= 0.4}
	<div class="fade"></div>
{/if}

<style>
	.progress-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		z-index: 999;
	}

	.progress {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background-color: red;
		transition: width 0.4s;
	}

	.fade {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		pointer-events: none;
		z-index: 998;
		animation: fade 0.4s;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
