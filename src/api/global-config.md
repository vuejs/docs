# Global Config

`config` is an object containing Vue application global configurations. You can modify its properties listed below before mounting your application:

```js
const app = Vue.createApp({})

app.config = {...}
```

## devtools

- **Type:** `boolean`

- **Default:** `true` (`false` in production builds)

- **Usage:**

  ```js
  app.config.devtools = true
  ```

  Configure whether to allow [vue-devtools](https://github.com/vuejs/vue-devtools) inspection. This option's default value is `true` in development builds and `false` in production builds. You can set it to `true` to enable inspection for production builds.

## errorHandler

- **Type:** `(err: unknown, instance: ComponentPublicInstance | null, info: string) => void`

- **Default:** `undefined`

- **Usage:**

  ```js
  app.config.errorHandler = (err, vm, info) => {
    // handle error
    // `info` is a Vue-specific error info, e.g. which lifecycle hook
    // the error was found in
  }
  ```

  Assign a handler for uncaught errors during component render function and watchers. The handler gets called with the error and the Vue instance.

  > Error tracking services [Sentry](https://sentry.io/for/vue/) and [Bugsnag](https://docs.bugsnag.com/platforms/browsers/vue/) provide official integrations using this option.

export interface AppConfig {
// (undocumented)
errorHandler?: (err: unknown, instance: ComponentPublicInstance | null, info: string) => void;
// (undocumented)
globalProperties: Record<string, any>;
// (undocumented)
isCustomElement: (tag: string) => boolean;
// (undocumented)
readonly isNativeTag?: (tag: string) => boolean;
// (undocumented)
optionMergeStrategies: Record<string, OptionMergeFunction>;
// (undocumented)
performance: boolean;
// (undocumented)
warnHandler?: (msg: string, instance: ComponentPublicInstance | null, trace: string) => void;
}
