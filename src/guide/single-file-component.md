# Single File Components

## Introduction

In many Vue projects, global components will be defined using `app.component()`, followed by `app.mount('#app')` to target a container element in the body of every page.

This can work very well for small to medium-sized projects, where JavaScript is only used to enhance certain views. In more complex projects however, or when your frontend is entirely driven by JavaScript, these disadvantages become apparent:

- **Global definitions** force unique names for every component
- **String templates** lack syntax highlighting and require ugly slashes for multiline HTML
- **No CSS support** means that while HTML and JavaScript are modularized into components, CSS is conspicuously left out
- **No build step** restricts us to HTML and ES5 JavaScript, rather than preprocessors like Pug (formerly Jade) and Babel

All of these are solved by **single-file components** with a `.vue` extension, made possible with build tools such as Webpack or Browserify.

Here's an example of a file we'll call `Hello.vue`:

<a href="https://codepen.io/team/Vue/pen/3de13b5cd0133df4ecf307b6cf2c5f94" target="_blank" rel="noopener noreferrer"><img src="/images/sfc.png" width="403" alt="Single-file component example (click for code as text)" style="display: block; margin: 15px auto; max-width: 100%"></a>

Now we get:

- [Complete syntax highlighting](https://github.com/vuejs/awesome-vue#source-code-editing)
- [CommonJS modules](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)
- [Component-scoped CSS](https://vue-loader.vuejs.org/en/features/scoped-css.html)

As promised, we can also use preprocessors such as Pug, Babel (with ES2015 modules), and Stylus for cleaner and more feature-rich components.

<a href="https://codesandbox.io/s/vue-single-file-component-with-pre-processors-mr3ik?file=/src/App.vue" target="_blank" rel="noopener noreferrer"><img src="/images/sfc-with-preprocessors.png" width="563" alt="Single-file component with pre-processors example (click for code as text)" style="display: block; margin: 15px auto; max-width: 100%"></a>

These specific languages are only examples. You could as easily use TypeScript, SCSS, PostCSS, or whatever other preprocessors that help you be productive. If using Webpack with `vue-loader`, it also has first-class support for CSS Modules.

### What About Separation of Concerns?

One important thing to note is that **separation of concerns is not equal to separation of file types.** In modern UI development, we have found that instead of dividing the codebase into three huge layers that interweave with one another, it makes much more sense to divide them into loosely-coupled components and compose them. Inside a component, its template, logic and styles are inherently coupled, and collocating them actually makes the component more cohesive and maintainable.

Even if you don't like the idea of Single-File Components, you can still leverage its hot-reloading and pre-compilation features by separating your JavaScript and CSS into separate files:

```html
<!-- my-component.vue -->
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```

## Getting Started

### Example Sandbox

If you want to dive right in and start playing with single-file components, check out [this simple todo app](https://codesandbox.io/s/vue-todo-list-app-with-single-file-component-vzkl3?file=/src/App.vue) on CodeSandbox.

### For Users New to Module Build Systems in JavaScript

With `.vue` components, we're entering the realm of advanced JavaScript applications. That means learning to use a few additional tools if you haven't already:

- **Node Package Manager (npm)**: Read the [Getting Started guide](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry) section about how to get packages from the registry.

- **Modern JavaScript with ES2015/16**: Read through Babel's [Learn ES2015 guide](https://babeljs.io/docs/en/learn). You don't have to memorize every feature right now, but keep this page as a reference you can come back to.

After you've taken a day to dive into these resources, we recommend checking out [Vue CLI](https://cli.vuejs.org/). Follow the instructions and you should have a Vue project with `.vue` components, ES2015, webpack and hot-reloading in no time!

### For Advanced Users

The CLI takes care of most of the tooling configurations for you, but also allows fine-grained customization through its own [config options](https://cli.vuejs.org/config/).

In case you prefer setting up your own build setup from scratch, you will need to manually configure webpack with [vue-loader](https://vue-loader.vuejs.org). To learn more about webpack itself, check out [their official docs](https://webpack.js.org/configuration/) and [webpack learning academy](https://webpack.academy/p/the-core-concepts).

### Building with rollup

Most of the time when developing a third-party library we want to build it in a way that allows the consumers of the library to [tree shake](https://webpack.js.org/guides/tree-shaking/) it. To enable tree-shaking we need to build `esm` modules. Since webpack and, in turn, vue-cli do not support building `esm` modules we need to rely on [rollup](https://rollupjs.org/).

#### Installing Rollup

We will need to install Rollup and a few dependencies:

```bash
npm install --save-dev rollup @rollup/plugin-commonjs rollup-plugin-vue 
```

These are the minimal amount of rollup plugins that we need to use to compile the code in an `esm` module. We may want to also add [rollup-plugin-babel](https://github.com/rollup/plugins/tree/master/packages/babel) to transpile their code and [node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve) if we use dependencies that we want to bundle with our library.

#### Configuring Rollup

To configure our build with Rollup we will need to create a `rollup.config.js` file in the root of our project:

```bash
touch rollup.config.js
```

Once the file is created we will need to open it with our editor of choice and add the following code.

```javascript
// import our third party plugins
import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'
import pkg from './package.json' // import our package.json file to re-use the naming

export default {
  // this is the file containing all our exported components/functions
  input: 'src/index.js',
  // this is an array of outputed formats
  output: [ 
    {
      file: pkg.module, // the name of our esm library
      format: 'esm', // the format of choice
      sourcemap: true, // ask rollup to include sourcemaps
    }
  ],
  // this is an array of the plugins that we are including
  plugins: [
    commonjs(),
    VuePlugin()
  ],
  // ask rollup to not bundle Vue in the library
  external: ['vue']
}
```

#### Configuring package.json

To take advantage of our newly created `esm` module we need to add a few fields in our `package.json` file:

```json
 "scripts": {
   ...
   "build": "rollup -c rollup.config.js",
   ...
 },
 "module": "dist/my-library-name.esm.js",
 "files": [
   "dist/",
 ],
 ```
 
Here we are specifying:

- how to build our package
- what files we want to bundle in our package
- what file represents our `esm` module

#### Bundling `umd` and `cjs` modules

To also build `umd` and `cjs` modules we can simply add a few lines of configuration to our `rollup.config.js` and `package.json`

##### rollup.config.js 
```javascript
output: [
  ...
   {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'MyLibraryName',
      sourcemap: true,
      globals: {
        vue: 'Vue',
      },
    },
]
```
##### package.json
```json
"module": "dist/my-library-name.esm.js",
"main": "dist/my-library-name.cjs.js",
"unpkg": "dist/my-library-name.global.js",
```
