<script>
	import jblSvelteComponent2 from './jblSvelteComponent2.svelte';
	import JblSvelteComponent1 from './jblSvelteComponent1.svelte';
	import JblSvelteComponent3 from './JblSvelteComponent3.svelte';
	import JblSvelteComponent4 from './jblSvelteComponent4.svelte';
	import jblSvelteComponent5 from './jblSvelteComponent5.svelte';

	export let name;
	export let img_alt;
	export let img_figcaption;
	export let developer_github_name

	const jblSvelteComponent2instance = new jblSvelteComponent2({
		target: document.body
	});
  /*
	const jblSvelteComponent1instance = new jblSvelteComponent1({
		target: document.body,
		props: {
			alt: `${img_alt}`,
			figcaption: `${img_figcaption}`,
			developerName: `${developer_github_name}`
		}
	});*/

	// myComponentsParams is used a "spread prop" , according svelte terminology
	let myComponentsParams = {
		alt: `${img_alt} amélioré`,
		figcaption: `${img_figcaption} et ils sont roses`,
		developerName: `"Monsieur" ${developer_github_name} , s'il vous plaît`
	}
	/// event handling
	let clicksCount = 0;
	/// ---- REACTIVE VALUES
	/// note that 'doubled'is evaluated "reactively" (re evaluated every time clickCount value changes)
	$: doubled = clicksCount * 2;
	/// reactive variables can be chained
	$: sixtimed = doubled * 3;
	function handleClick() {
		// event handler code goes here
		clicksCount = clicksCount + 1;
		console.log(`clicked another time, and now clicksCount=[${clicksCount}]`);
	}

	/// ---- REACTIVE STATEMENTS
	$: console.log(`also sixtimed = ${sixtimed}`);
	$: {
		console.log(`the clicksCount is ${clicksCount}`);
		alert(`I SAID THE CLICKSCOUNT IS ${clicksCount}`);
	}
	$: if (sixtimed >= 10) {
		alert(`sixtimed is dangerously high!`);
		sixtimed = sixtimed - 6;
		console.log(`the sixtimed is now lowered to ${sixtimed}`);
	}

	/// --- REACTIVITY AND ASSIGNEMENTS
	let numbers = [1, 2, 3, 4];

	function enlargeNumbersArray() {
		numbers.push(numbers.length + 1);
	}
	function addNumbers() {
		numbers = numbers;
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
	$: numbersArray = JSON.stringify(numbers, null, " ");

  /// ---
	/// --- THIS REACTIVITY BEHAVIOR, SENSIBLE TO ASSIGNEMENT ONLY, IS
	/// --- EXACTLY THE SAME FOR  PROPERTIES OF ARRAYS AND OBJECTS
	/// ---
	let myAweSomeProject = {
			name: "gravitee-node",
			version: "1.5.8-SNAPSHOT",
			age: 15,
			likers: [
				{
					name: "guillaume",
					gh_user: "gcusnieux"
				},
				{
					name: "david",
					gh_user: "brasselyd"
				}
			]
	};
  $: componentAge = myAweSomeProject.age;
	function makeOneYearOlder() {
		myAweSomeProject.age++;
	}
	function addLiker() {
		enlargeNumbersArray();
		addNumbers(); // triggers reactivity
		myAweSomeProject.likers.push({
			name: `jbl-${sum}`,
			gh_user: `jbl-github-${sum}`
		})
		myAweSomeProject.likers = myAweSomeProject.likers // triggers reactivity
	}
	$: myAweSomeProjectStr = JSON.stringify(myAweSomeProject, undefined, 4);


	/// ----------------------
	/// ++++++++++++++++++++++
	/// ----------------------
	/// ++++++++++++++++++++++ HERE SERIOUS STUFF : USING AXIOS
	/// ----------------------
	/// ++++++++++++++++++++++
	/// ----------------------
	/// ++++++++++++++++++++++


		// PokeList.svelte
	const pageName="Poke-List";
	import { onMount } from 'svelte';
	/// import { getPokemonList, getPokemonByName } from "../api/pokemon"; // import our pokemon api calls
	import { getPokemonList, getPokemonByName } from "./clients/CircleCiClient"; // import our pokemon api calls
	import { whoami } from "./circleci/clients/CircleCiClient"; // import our circleci api calls

	let pokemonDetail = {};
	let pokemonList = [];

	// Get the data from the api, after the page is mounted.
	onMount(async () => {
		const res = await getPokemonList();
		pokemonList = res;
	});

	// method to handle the event to get the detail of the pokemon.
	/**/
	let enableLoader;
	/// enableLoader = !enableLoader;
	console.log(`au départ enableLoader = [${enableLoader}]`);
	const handleOnClick = event => {
		enableLoader = !enableLoader;
		console.log(`dans [handleOnClick] on a enableLoader = [${enableLoader}]`);
		const name = event.target.name;
		getPokemonByName(name).then(res => {
			enableLoader = !enableLoader;
			pokemonDetail= {
				name,
				types: res.types,
				image: res.sprites.front_default
			};
		}); // .bind(this)
	};

	/// INPUT FILED Circle CI Token
	let cci_token = '';
	let enableCciLoader;
	let cciResponse = {};
	const triggerPipeline = event => {
		enableCciLoader = !enableCciLoader;
		console.log(`dans [triggerPipeline] on a enableCciLoader = [${enableCciLoader}]`);
		console.log(`dans [triggerPipeline] on a cci_token = [${cci_token}]`);
		// const name = event.target.name;
		whoami(`${cci_token}`).then(res => {
			enableCciLoader = !enableCciLoader;
			cciResponse = {
				name: res.name,
				login: res.login,
				id: res.id
			};
			/* example response for whoami from Circle CI :
			{
			  "name": null,
			  "login": "Jean-Baptiste-Lasselle",
			  "id": "a159e94e-3763-474d-8c51-d1ea6ed602d4"
			} */
		}); // .bind(this)
	};

	let promise = event => {
		const name = event.target.name;
		return getPokemonByName(name).then(res => {
			pokemonDetail= {
				name,
				types: res.types,
				image: res.sprites.front_default
			};
		});
	};



	const getPokemonTypes = () => {
		return pokemonDetail.types.map(e => e.type.name).join(",");
	};

</script>


<style>
main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
  .pokemonDetails{
    float: right;
    width: 500px;
     text-transform: capitalize;
  }
  .pokemonList{
    width: 300px;
    float: left;
    max-height: 400px;
    overflow-y: auto;
  }
  .pokemonList li{
    list-style: none;
    text-align: left;
    margin-bottom: 5px;
  }
  .pokemonList .pokeName{
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 700;
  }
  button {
    background: none!important;
    border: none;
    padding: 0!important;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
  }

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}


	textarea {
	  width: 100%;
	  min-height: 30rem;
	  font-family: "Lucida Console", Monaco, monospace;
	  font-size: 0.8rem;
	  line-height: 1.2;
	}

	/* Create two equal columns that floats next to each other */
.column {
 float: left;
 width: 100%;
 padding: 10px;
}

/* Clear floats after the columns */
.row:after {
 content: "";
 display: table;
 clear: both;
}

/**********************************************************
 *      SPINNER
 **********************************************************/
 .pokemon-detail-disappear {
 	display:none;
 }
 .loader,.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/***********************************************************************
 *         BUTTON CIRCLE CI LAUNCH
 ***********************************************************************/
 .button.circleci {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
textarea#cciResponseText {
	width: 25%;
	min-height: 30rem;
	font-family: "Lucida Console", Monaco, monospace;
	font-size: 0.8rem;
	line-height: 1.2;
	color: navy;
}
</style>

<JblSvelteComponent3 howmuch={"a lot more"} />
<JblSvelteComponent4 something_to_say={"I will be displayed because my import name starts with an UpperCase letter"} />
<jblSvelteComponent5 howmuch={"I won't ever be displayed"} />

<div id="container">
	<main>

	<div class="row">
	  <div class="column" style="background-color:#aaa;">
		<h1> {pageName}!</h1>
		<p>Welcome to my <b>{pageName}</b></p>
			<ul  class="pokemonList">
				{#each pokemonList as pokemon}
						<li>
							<label class="pokeName">
								{pokemon.name}
							</label>
							<button
								type="button"
								name={pokemon.name}
								on:click={handleOnClick}>See Details</button>
						</li>
				{/each}
			</ul>

			<div id="formulaireCci">
				<input bind:value={cci_token} placeholder="Enter your Circle CI Token">
				<label class="pokeName">circleci</label>
				<button
					type="button"
					class="button circleci"
					name="circleci"
					on:click={triggerPipeline}>Trigger CircleCI API call</button>
					<p>Your Circle CI Token is : {cci_token || 'Enter your Circle CI Token'}!</p>

					<div class="circleResponse">
						<h3>Circle CI Response</h3>
						<div class="pokemon-detail {enableLoader ? 'loader': 'pokemon-detail-disappear'}">Loading...</div>
						{#if cciResponse.name}
						 <textarea name="" id="cciResponseText" cols="30" rows="10">{myAweSomeProjectStr}</textarea>
						{/if}
					</div>
			</div>


			<div class="pokemonDetails">
				<h3>Pokemon Detail</h3>
				<div class="pokemon-detail {enableLoader ? 'loader': 'pokemon-detail-disappear'}">Loading...</div>
				{#if pokemonDetail.image}
				 <img
							class="pokeimage"
							src={pokemonDetail.image}
							alt="pokeimage"/>
					<label><b>{pokemonDetail.name ? pokemonDetail.name : ""}</b></label>
					<label><b>Types: </b>{pokemonDetail.types ? getPokemonTypes() : ""}</label>
				{/if}
			</div>

	  </div>
	  <div class="column" style="background-color:#bbb;">
		<h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
		<JblSvelteComponent1 alt={`${img_alt}`} figcaption= {`${img_figcaption}`} developerName= {`${developer_github_name}`} />
		<JblSvelteComponent1 alt={myComponentsParams.alt} figcaption={myComponentsParams.figcaption} developerName= {`${myComponentsParams.developerName}`} />

		<button on:click={handleClick}>
			Clicked {clicksCount} {clicksCount === 1 ? 'time' : 'times'} and doubled = {doubled} also sixtimed = {sixtimed}
		</button>
		<button on:click={enlargeNumbersArray}>
			This button will enlarge the array of numbers, without triggering reactive re-evaluation of their sum
		</button>
		<button on:click={addNumbers}>
			This button will trigger reactive re-evaluation of the numbers sum
		</button>
		<button on:click={addLiker}>
			This button will add random liker to the myAweSomeProject likers'
		</button>

		<p>magic sum is {sum}</p>
		<p>numbers array is {numbersArray}</p>
		<p> <code>myAweSomeProject</code> is :</p>
		<textarea name="" id="myTextarea" cols="30" rows="10">{myAweSomeProjectStr}</textarea>

	  </div>
	</div>


	</main>
</div>
