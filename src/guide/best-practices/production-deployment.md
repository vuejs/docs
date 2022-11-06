# Production Deployment {#production-deployment}

## Development vs. Production {#development-vs-production}

During development, Vue provides a number of features to improve the development experience:

- Warning for common errors and pitfalls
- Props / events validation
- [Reactivity debugging hooks](/guide/extras/reactivity-in-depth.html#reactivity-debugging)
- Devtools integration

However, these features become useless in production. Some of the warning checks can also incur a small amount of performance overhead. When deploying to production, we should drop all the unused, development-only code branches for smaller payload size and better performance.

## Without Build Tools {#without-build-tools}

If you are using Vue without a build tool by loading it from a CDN or self-hosted script, make sure to use the production build (dist files that end in `.prod.js`) when deploying to production. Production builds are pre-minified with all development-only code branches removed.

- If using global build (accessing via the `Vue` global): use `vue.global.prod.js`.
- If using ESM build (accessing via native ESM imports): use `vue.esm-browser.prod.js`.

Consult the [dist file guide](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) for more details.

## With Build Tools {#with-build-tools}

Projects scaffolded via `create-vue` (based on Vite) or Vue CLI (based on webpack) are pre-configured for production builds.

If using a custom setup, make sure that:

1. `vue` resolves to `vue.runtime.esm-bundler.js`.
2. The [compile time feature flags](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) are properly configured.
3. <code>process.env<wbr>.NODE_ENV</code> is replaced with `"production"` during build.

Additional references:

- [Vite production build guide](https://vitejs.dev/guide/build.html)
- [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue CLI deployment guide](https://cli.vuejs.org/guide/deployment.html)

## Tracking Runtime Errors {#tracking-runtime-errors}

The [app-level error handler](/api/application.html#app-config-errorhandler) can be used to report errors to tracking services:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // report error to tracking services
}
```

Services such as [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) and [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) also provide official integrations for Vue.
