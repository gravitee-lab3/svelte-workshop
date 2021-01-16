<script>
	let src = 'test/image.gif';
	/* let alt = 'Mon image svelte'; */
	export let alt;
	export let figcaption;
	export let developerName;
</script>

<section>
<p>I am {developerName}, learning <code>svelte.js</code> components</p>
<figure>
    <img alt="{alt}" src="{src}">
    <figcaption>{figcaption}</figcaption>
</figure>
</section>

<style>
	figure {
	    display: inline-block;
	    border: 1px dotted gray;
	    margin: 20px; /* adjust as needed */
	}
	figure img {
	    vertical-align: bottom;
	}
	figure figcaption {
	    border: 1px dotted blue;
	    text-align: center;
	}
	p {
		text-align: center;
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
