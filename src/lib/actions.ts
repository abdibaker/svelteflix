export function smoothLoad(node: HTMLImageElement) {
	// Set initial styles for the fade-in effect
	node.style.opacity = '0';
	node.style.transition = 'opacity 0.4s';

	function load() {
		// Check if image is already loaded
		if (node.naturalWidth) {
			node.style.opacity = '1';
			return;
		}

		// Add 'load' event listener to fade in the image
		if (!node.onload) {
			node.addEventListener(
				'load',
				() => {
					node.style.opacity = '1';
				},
				{ once: true }
			);
		}
	}

	// Observe changes to the 'src' attribute
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.attributeName === 'src') {
				load();
			}
		}
	});

	observer.observe(node, { attributes: true });

	// Initial load call
	load();

	// Return the destroy function to clean up
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
