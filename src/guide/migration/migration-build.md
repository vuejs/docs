# Migration Build

This is a placeholder page for instructions on the Vue 3.1 migration build

## Migration Build Configuration Flags

### `GLOBAL_MOUNT`

The global app bootstrapping API has changed: `vm.$mount()` and the `el` option have been removed. Use `createApp(RootComponent).mount()` instead.

[Learn more](/guide/migration/global-api.html#mounting-app-instance)

### `GLOBAL_MOUNT_CONTAINER`

Vue detected directives on the mount container. In Vue 3, the container is no longer considered part of the template and will not be processed/replaced.

[Learn more](/guide/migration/mount-changes.html)

### `GLOBAL_EXTEND`

`Vue.extend()` has been removed in Vue 3. Use `defineComponent()` instead.

[Learn more](/guide/migration/global-api.html#vue-extend-replaced-by-definecomponent)

### `GLOBAL_PROTOTYPE`

`Vue.prototype` is no longer available in Vue 3. Use `config.globalProperties` instead.

[Learn more](/guide/migration/global-api.html#vue-prototype-replaced-by-config-globalproperties)

### `GLOBAL_SET`

`Vue.set()` has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.

### `GLOBAL_DELETE`

`Vue.delete()` has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.`

### `GLOBAL_OBSERVABLE`

`Vue.observable()` has been removed. Use `import { reactive } from 'vue'` from Composition API instead

[Learn more](/api/basic-reactivity.html)

### `GLOBAL_PRIVATE_UTIL`

`Vue.util` has been removed. Please refactor to avoid its usage since it was an internal API even in Vue 2.

### `CONFIG_SILENT`

`config.silent` has been removed because it is not good practice to intentionally suppress warnings. You can use your browser console's filter features to focus on relevant messages.

### `CONFIG_DEVTOOLS`

`config.devtools` has been removed. To enable devtools for production, configure the `__VUE_PROD_DEVTOOLS__` compile-time flag

[Learn more](https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags)

### `CONFIG_KEY_CODES`

`config.keyCodes` has been removed. In Vue 3, you can directly use the kebab-case key names as v-on modifiers.

[Learn more](/guide/migration/keycode-modifiers.html)

### `CONFIG_PRODUCTION_TIP`

`config.productionTip` has been removed.

[Learn more](/guide/migration/global-api.html#config-productiontip-removed)

### `CONFIG_IGNORED_ELEMENTS`

`config.ignoredElements` has been removed. If you are using a runtime build, pass the `isCustomElement` option to `@vue/compiler-dom`. Otherwise, use `config.isCustomElement`.

[Learn more](/guide/migration/global-api.html#config-ignoredelements-is-now-config-iscustomelement)

### `CONFIG_WHITESPACE`

Vue 3 compiler's whitespace option will default to "condense" instead of "preserve". To suppress this warning, provide an explicit value for `config.compilerOptions.whitespace`.

### `INSTANCE_SET`

`vm.$set()` has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.`

### `INSTANCE_DELETE`

`vm.$delete()` has been removed as it is no longer needed in Vue 3. Simply use native JavaScript mutations.

### `INSTANCE_DESTROY`

`vm.$destroy()` has been removed. Use `app.unmount()` instead.

[Learn more](/api/application-api.html#unmount)

### `INSTANCE_EVENT_EMITTER`

`vm.$on/$once/$off()` have been removed. Use an external event emitter library instead.

[Learn more](/guide/migration/events-api.html)

### `INSTANCE_EVENT_HOOKS`

`${event}` lifecycle events are no longer supported. From templates use the `vnode` prefix instead of `hook:`. For example, `@${event}` should be changed to `@vnode-${event.slice(5)`. From JavaScript, use Composition API to dynamically register lifecycle hooks.

[Learn more](/guide/migration/vnode-lifecycle-events.html)

### `INSTANCE_CHILDREN`

`vm.$children` has been removed. Consider refactoring your logic to avoid relying on direct access to child components.

[Learn more](/guide/migration/children.html)

### `INSTANCE_LISTENERS`

`vm.$listeners` has been removed. In Vue 3, parent v-on listeners are included in `vm.$attrs` and it is no longer necessary to separately use `v-on="$listeners"` if you are already using `v-bind="$attrs"` (Note: the Vue 3 behavior only applies if this compatibility config is disabled)`.

[Learn more](/guide/migration/listeners-removed.html)

### `INSTANCE_SCOPED_SLOTS`

`vm.$scopedSlots` has been removed. Use `vm.$slots` instead.

[Learn more](/guide/migration/slots-unification.html)

### `INSTANCE_ATTRS_CLASS_STYLE`

Component has `inheritAttrs: false` but is relying on class/style fallthrough from parent. In Vue 3, class/style are now included in `$attrs` and will no longer fallthrough when `inheritAttrs` is false. If you are already using `v-bind="$attrs"` on component root, it should render the same end result. If you are binding `$attrs` to a non-root element and expecting class/style to fallthrough on root, you will need to now manually bind them on root via `:class="$attrs.class"`.

[Learn more](/guide/migration/attrs-includes-class-style.html)

### `OPTIONS_DATA_FN`

The `data` option can no longer be a plain object. Always use a function.

[Learn more](/guide/migration/data-option.html)

### `OPTIONS_DATA_MERGE`

Detected conflicting key when merging data option values. In Vue 3, data keys are merged shallowly and will override one another.

[Learn more](/guide/migration/data-option.html#mixin-merge-behavior-change)

### `OPTIONS_BEFORE_DESTROY`

`beforeDestroy` has been renamed to `beforeUnmount`.

### `OPTIONS_DESTROYED`

`destroyed` has been renamed to `unmounted`.

### `WATCH_ARRAY`

`watch` option or `vm.$watch` on an array value will no longer trigger on array mutation unless the `deep` option is specified.

[Learn more](/guide/migration/watch.html)

### `PROPS_DEFAULT_THIS`

`props` default value function no longer has access to `this`. The compatibility build only offers access to `this.$options`.

[Learn more](/guide/migration/props-default-this.html)

### `CUSTOM_DIR`

Custom directive hook has been removed. Use the corresponding new hook instead.

[Learn more](/guide/migration/custom-directives.html)

### `V_FOR_REF`

Ref usage on `v-for` no longer creates array ref values in Vue 3. Consider using function refs or refactor to avoid ref usage altogether.

[Learn more](/guide/migration/array-refs.html)

### `V_ON_KEYCODE_MODIFIER`

Using `keyCode` as `v-on` modifier is no longer supported. Use kebab-case key name modifiers instead.

[Learn more](/guide/migration/keycode-modifiers.html)

### `ATTR_FALSE_VALUE`

Attribute with `v-bind` value `false` will render `<ATTRIBUTE_NAME>="false"` instead of removing it in Vue 3. To remove the attribute use `null` or `undefined` instead.

[Learn more](/guide/migration/attribute-coercion.html)

### `ATTR_ENUMERATED_COERSION`

Enumerated attribute will be removed or render the value as-is instead of coercing the value in Vue 3. Always use explicit `true` or `false` values for enumerated attributes.

[Learn more](/guide/migration/attribute-coercion.html)

### `TRANSITION_CLASSES`

This feature cannot be runtime-detected

### `TRANSITION_GROUP_ROOT`

`<TransitionGroup>` no longer renders a root `<span>` element by default if no `tag` prop is specified.

[Learn more](/guide/migration/transition-group.html)

### `COMPONENT_ASYNC`

Async component should be explicitly created via `defineAsyncComponent()` in Vue 3. Plain functions will be treated as functional components in non-compat build.

[Learn more](/guide/migration/async-components.html)

### `COMPONENT_FUNCTIONAL`

Functional component should be defined as a plain function in Vue 3. The `functional` component option has been removed. Before migrating to use plain functions for functional components, first make sure that all async components usage have been migrated and its compat behavior has been disabled.

[Learn more](/guide/migration/functional-components.html)

### `COMPONENT_V_MODEL`

`v-model` usage on component has changed in Vue 3. Component that expects to work with `v-model` should now use the `modelValue` prop and emit the `update:modelValue` event.

[Learn more](/guide/migration/v-model.html)

### `RENDER_FUNCTION`

Vue 3's render function API has changed

[Learn more](/guide/migration/render-function-api.html)

### `FILTERS`

`filters` have been removed in Vue 3. The `|` symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.

[Learn more](/guide/migration/filters.html)

### `PRIVATE_APIS`

There are some Vue 2 private API that no longer exists in Vue 3.

### `COMPILER_IS_ON_ELEMENT`

Platform-native elements with `is` prop will no longer be treated as components in Vue 3 unless the `is` value is explicitly prefixed with `vue:`.

[Learn more](/guide/migration/custom-elements-interop.html)

### `COMPILER_V_BIND_SYNC`

`.sync` modifier for `v-bind` has been removed. Use `v-model` with argument instead `v-bind:<NAME>.sync` should be changed to `v-model:<NAME>`.

[Learn more](/guide/migration/v-model.html)

### `COMPILER_V_BIND_PROP`

`.prop` modifier for v-bind has been removed and no longer necessary. Vue 3 will automatically set a binding as DOM property when appropriate.

### `COMPILER_V_BIND_OBJECT_ORDER`

`v-bind="obj"` usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before `v-bind` in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute.

[Learn more](/guide/migration/v-bind.html)

### `COMPILER_V_ON_NATIVE`

`.native` modifier for `v-on` has been removed as is no longer necessary.

[Learn more](/guide/migration/v-on-native-modifier-removed.html)

### `COMPILER_V_IF_V_FOR_PRECEDENCE`

`v-if` / `v-for` precedence when used on the same element has changed in Vue 3: `v-if` now takes higher precedence and will no longer have access to `v-for` scope variables. It is best to avoid the ambiguity with `<template>` tags or use a computed property that filters `v-for` data source.

[Learn more](/guide/migration/v-if-v-for.html)

### `COMPILER_V_FOR_REF`

Ref usage on `v-for` no longer creates array ref values in Vue 3. Consider using function refs or refactor to avoid ref usage altogether.

[Learn more](/guide/migration/array-refs.html)

### `COMPILER_NATIVE_TEMPLATE`

`<template>` with no special directives will render as a native template element instead of its inner content in Vue 3.

### `COMPILER_INLINE_TEMPLATE`

`inline-template` has been removed in Vue 3.

[Learn more](/guide/migration/inline-template-attribute.html)

### `COMPILER_FILTERS`

`filters` have been removed in Vue 3. The `|` symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.

[Learn more](/guide/migration/filters.html)
