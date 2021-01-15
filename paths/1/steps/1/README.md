# Step 1: project setup

In this first path, I follow : https://svelte.dev/tutorial, which leads me https://svelte.dev/tutorial/basics

* On the page where I arrive, I clicked the hyperlink [60 seconds quickstart](https://svelte.dev/blog/the-easiest-way-to-get-started)
* There, I follow the first instruction, which tells you to download a `svelte-app.zip`, from [this page](https://svelte.dev/repl/hello-world?version=3.31.2) : I had to login with github to be allowed to click on the "save" button,which finally downloads the  `svelte-app.zip`
* the  `svelte-app.zip` happens tobe a helloworld app. I unzipped it and the tree of uncompressed folders and files happens to be the following (which I then copy pasted to the root of this git repo) :

```bash
~/svelte-workshop$ tree
.
├── package.json
├── package-lock.json
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
├── README.md
├── README.svelte.md
├── rollup.config.js
├── scripts
│   └── setupTypeScript.js
└── src
    ├── App.svelte
    └── main.js

```
* I then ran `npm install`
* And finally ran `npm run dev`, and :
  * I have something on http://localhost:5000/
  * every time I edit a file it gets recompiled by rollup js


Instead of doing this from the downloaded zip, the same project geenration can be achieved like this :

```bash
npx degit sveltejs/template ./my-svelte-project
cp ./my-svelte-project/README.md ./my-svelte-project/README.svelte.md
rm ./my-svelte-project/README.md
cp -fR ./my-svelte-project/* ./
# cd my-svelte-project
npm install
npm run dev
```

* This creates a new svelte app, froma tempalte defined in the git repo https://github.com/sveltejs/template
* I forked https://github.com/sveltejs/template into https://github.com/gravitee-lab3/svelte-template , and therefore I can nwospin up a newsvelteproject frommy own template like this :


```bash
npx degit gravitee-lab3/svelte-template ./my-svelte-project
cp ./my-svelte-project/README.md ./my-svelte-project/README.svelte.md
rm ./my-svelte-project/README.md
cp -fR ./my-svelte-project/* ./
rm -fr ./my-svelte-project
# cd my-svelte-project
npm install
npm run dev
```

* Output of the above commands :

```bash
~/svelte-workshop$ npx degit gravitee-lab3/svelte-template ./my-svelte-project
npx: installed 1 in 1.113s
> cloned gravitee-lab3/svelte-template#master to ./my-svelte-project
~/svelte-workshop$ cp ./my-svelte-project/README.md ./my-svelte-project/README.svelte.md
~/svelte-workshop$ rm ./my-svelte-project/README.md
~/svelte-workshop$ cp -fR ./my-svelte-project/* ./
~/svelte-workshop$ rm -fr ./my-svelte-project
~/svelte-workshop$ npm i
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.1.2 (node_modules/rollup/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.3.1 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.1: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN svelte-app@1.0.0 No repository field.
npm WARN svelte-app@1.0.0 No license field.

added 97 packages from 132 contributors and audited 99 packages in 2.283s

6 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

~/svelte-workshop$ npm run dev

> svelte-app@1.0.0 dev /home/jibl/svelte-workshop
> rollup -c -w

rollup v2.36.1
bundles src/main.js → public/build/bundle.js...
LiveReload enabled
created public/build/bundle.js in 306ms

[2021-01-15 23:24:11] waiting for changes...

> svelte-app@1.0.0 start /home/jibl/svelte-workshop
> sirv public "--dev"



  Your application is ready~! 🚀

  - Local:      http://localhost:5000
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────

  [23:24:19] 200 ─ 3.37ms ─ /
  [23:24:19] 200 ─ 1.00ms ─ /global.css
  [23:24:19] 200 ─ 1.30ms ─ /build/bundle.css
  [23:24:19] 200 ─ 1.57ms ─ /build/bundle.js

```

* Finally , to package a production ready version of this new svelte app, I'll execute :

```bash
npm run build
# now the packaged filesare in the "public/build" folder, and our app is purely static,made of the files in the "public" folder.
#
```

* And to run in production, I'll execute:

```bash
npm run start
```

Note that at the date/time I wrote this first step article, the svelte template uses `sirv-cli` justlike there is the `ng` angular-cli.

Now that our svelte app is packaged for production, the `README.svelte.md` file contains two very interesting deployment methods options, [here specified](#deploying-to-the-web)

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
export SUBDOMAIN_NAME_CHOSEN=jeanbl
surge public ${SUBDOMAIN_NAME_CHOSEN}.sh
```
