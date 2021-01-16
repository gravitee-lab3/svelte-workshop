<script>
	export let something_to_say;
</script>
<style>
textarea {
	width: 100%;
	min-height: 5rem;
	font-family: "Lucida Console", Monaco, monospace;
	font-size: 0.8rem;
	font-weight: 900;
	line-height: 1.2;
	color: orange;
}
code {
	color: navy;
}
</style>
<p>I am the <code>jblSvelteComponent4.svelte</code>, and someone has to say :</p>
<p>{something_to_say}</p>

<hr/>
<p>This component will be displayed in svelte page, if and only if the identifier of the imported instance starts with an UpperCase character : </p>
<hr/>
<h4>In <code>App.svelte</code> :</h4>
<p>If you declare <code>import myComponent from  './jblSvelteComponent4.svelte';</code> then : </p>
	<code> &lt;myComponent something_to_say=&lbrace;"some value"&rbrace; /&gt; </code>
<p>won't be displayed</p>
<hr/>
<h4>In <code>App.svelte</code> :</h4>
<p>If you declare <code>import MyComponent from  './jblSvelteComponent4.svelte';</code> then : </p>
	<code> &lt;MyComponent something_to_say=&lbrace;"some value"&rbrace; /&gt; </code>
<p>will be displayed</p>

<hr/>

<h3>The Svelte output confirms</h3>

Indeed, in the svelte terminal output (where <code>npm run dev</code> runs), we can read :

<textarea>
(!) Plugin svelte: &lt;jblSvelteComponent5&gt; will be treated as an HTML element unless it begins with a capital letter
</textarea>
