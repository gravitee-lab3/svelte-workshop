import App from './App.svelte';
import jblSvelteComponent1 from './jblSvelteComponent1.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		img_alt: 'Mon image svelte woua',
		img_figcaption: 'An elephant and a tiger at sunrise',
		developer_github_name: "Jean-Baptiste Lasselle"
	}
});

export default app;
