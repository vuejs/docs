<script setup>
import TestingApiSwitcher from './TestingApiSwitcher.vue'
</script>

# Testing {#testing}

## Why Test? {#why-test}

Automated tests help you and your team build complex Vue applications quickly and confidently by preventing regressions and encouraging you to break apart your application into testable functions, modules, classes, and components. As with any application, your new Vue app can break in many ways, and it's important that you can catch these issues and fix them before releasing.

In this guide, we'll cover basic terminology and provide our recommendations on which tools to choose for your Vue 3 application.

There is one Vue-specific section covering composables. See [Testing Composables](#testing-composables) below for more details.

## When to Test {#when-to-test}

Start testing early! We recommend you begin writing tests as soon as you can. The longer you wait to add tests to your application, the more dependencies your application will have, and the harder it will be to start.

## Testing Types {#testing-types}

When designing your Vue application's testing strategy, you should leverage the following testing types:

- **Unit**: Checks that inputs to a given function, class, or composable are producing the expected output or side effects.
- **Component**: Checks that your component mounts, renders, can be interacted with, and behaves as expected. These tests import more code than unit tests, are more complex, and require more time to execute.
- **End-to-end**: Checks features that span multiple pages and make real network requests against your production-built Vue application. These tests often involve standing up a database or other backend.

Each testing type plays a role in your application's testing strategy and each will protect you against different types of issues.

## Overview {#overview}

We will briefly discuss what each of these are, how they can be implemented for Vue applications, and provide some general recommendations.

## Unit Testing {#unit-testing}

Unit tests are written to verify that small, isolated units of code are working as expected. A unit test usually covers a single function, class, composable, or module. Unit tests focus on logical correctness and only concern themselves with a small portion of the application's overall functionality. They may mock large parts of your application's environment (e.g. initial state, complex classes, 3rd party modules, and network requests).

In general, unit tests will catch issues with a function's business logic and logical correctness.

Take for example this `increment` function:

```js
// helpers.js
export function increment (current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

Because it's very self-contained, it'll be easy to invoke the increment function and assert that it returns what it's supposed to, so we'll write a Unit Test.

If any of these assertions fail, it's clear that the issue is contained within the `increment` function.

```js{4-16}
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

As mentioned previously, unit testing is typically applied to self-contained business logic, components, classes, modules, or functions that do not involve UI rendering, network requests, or other environmental concerns.

These are typically plain JavaScript / TypeScript modules unrelated to Vue. In general, writing unit tests for business logic in Vue applications does not differ significantly from applications using other frameworks.

There are two instances where you DO unit test Vue-specific features:

1. Composables
2. Components

### Composables {#composables}

One category of functions specific to Vue applications are [Composables](/guide/reusability/composables.html), which may require special handling during tests.
See [Testing Composables](#testing-composables) below for more details.

### Unit Testing Components {#unit-testing-components}

A component can be tested in two ways:

1. Whitebox: Unit Testing

   Tests that are "Whitebox tests" are aware of the implementation details and dependencies of a component. They are focused on **isolating** the component under test. These tests will usually involve mocking some, if not all of your component's children, as well as setting up plugin state and dependencies (e.g. Pinia).

2. Blackbox: Component Testing

   Tests that are "Blackbox tests" are unaware of the implementation details of a component. These tests mock as little as possible to test the integration of your component and the entire system. They usually render all child components and are considered more of an "integration test". See the [Component Testing recommendations](#component-testing) below.

### Recommendation {#recommendation}

- [Vitest](https://vitest.dev/)

  Since the official setup created by `create-vue` is based on [Vite](https://vitejs.dev/), we recommend using a unit testing framework that can leverage the same configuration and transform pipeline directly from Vite. [Vitest](https://vitest.dev/) is a unit testing framework designed specifically for this purpose, created and maintained by Vue / Vite team members. It integrates with Vite-based projects with minimal effort, and is blazing fast.

### Other Options {#other-options}

- [Peeky](https://peeky.dev/) is another fast unit test runner with first-class Vite integration. It is also created by a Vue core team member and offers a GUI-based testing interface.

- [Jest](https://jestjs.io/) is a popular unit testing framework, and can be made to work with Vite via the [vite-jest](https://github.com/sodatea/vite-jest) package. However, we only recommend Jest if you have an existing Jest test suite that needs to be migrated over to a Vite-based project, as Vitest offers a more seamless integration and better performance.

## Component Testing {#component-testing}

In Vue applications, components are the main building blocks of the UI. Components are therefore the natural unit of isolation when it comes to validating your application's behavior. From a granularity perspective, component testing sits somewhere above unit testing and can be considered a form of integration testing. Much of your Vue Application should be covered by a component test and we recommend that each Vue component has its own spec file.

Component tests should catch issues relating to your component's props, events, slots that it provides, styles, classes, lifecycle hooks, and more.

Component tests should not mock child components, but instead test the interactions between your component and its children by interacting with the components as a user would. For example, a component test should click on an element like a user would instead of programmatically interacting with the component.

Component tests should focus on the component's public interfaces rather than internal implementation details. For most components, the public interface is limited to: events emitted, props, and slots. When testing, remember to **test what a component does, not how it does it**.

**DO**

- For **Visual** logic: assert correct render output based on inputted props and slots.
- For **Behavioral** logic: assert correct render updates or emitted events in response to user input events.

  In the below example, we demonstrate a Stepper component that has a DOM element labeled "increment" and can be clicked. We pass a prop called `max` that prevents the Stepper from being incremented past `2`, so if we click the button 3 times, the UI should still say `2`.

  We know nothing about the implementation of Stepper, only that the "input" is the `max` prop and the "output" is the state of the DOM as the user will see it.

<TestingApiSwitcher>

<div class="testing-library-api">

```js
const { getByText } = render(Stepper, {
  props: {
    max: 1
  }
})

getByText('0') // Implicit assertion that "0" is within the component

const button = getByText('increment')

// Dispatch a click event to our increment button.
await fireEvent.click(button)

getByText('1')

await fireEvent.click(button)
```

</div>

<div class="vtu-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

const wrapper = mount(Stepper, {
  props: {
    max: 1
  }
})

expect(wrapper.find(valueSelector).text()).toContain('0')

await wrapper.find(buttonSelector).trigger('click')

expect(wrapper.find(valueSelector).text()).toContain('1')
```

</div>

<div class="cypress-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector).should('be.visible').and('contain.text', '0')
  .get(buttonSelector).click()
  .get(valueSelector).should('contain.text', '1')
```

</div>

</TestingApiSwitcher>

- **DON'T**

  Don't assert the private state of a component instance or test the private methods of a component. Testing implementation details makes the tests brittle, as they are more likely to break and require updates when the implementation changes.

  The component's ultimate job is rendering the correct DOM output, so tests focusing on the DOM output provide the same level of correctness assurance (if not more) while being more robust and resilient to change.

  Don't rely exclusively on snapshot tests. Asserting HTML strings does not describe correctness. Write tests with intentionality.

  If a method needs to be tested thoroughly, consider extracting it into a standalone utility function and write a dedicated unit test for it. If it cannot be extracted cleanly, it may be tested as a part of a component, integration, or end-to-end test that covers it.

### Recommendation {#recommendation-1}

- [Vitest](https://vitest.dev/) for components or composables that render headlessly (e.g. the [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) function in VueUse). Components and DOM can be tested using [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro).

- [Cypress Component Testing](https://on.cypress.io/component) for components whose expected behavior depends on properly rendering styles or triggering native DOM events. Can be used with Testing Library via [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro).

The main differences between Vitest and browser-based runners are speed and execution context. In short, browser-based runners, like Cypress, can catch issues that node-based runners, like Vitest, cannot (e.g. style issues, real native DOM events, cookies, local storage, and network failures), but browser-based runners are *orders of magnitude slower than Vitest* because they do open a browser, compile your stylesheets, and more. Cypress is a browser-based runner that supports component testing. Please read [Vitest's comparison page](https://vitest.dev/guide/comparisons.html#cypress) for the latest information comparing Vitest and Cypress.

### Mounting Libraries {#mounting-libraries}

Component testing often involves mounting the component being tested in isolation, triggering simulated user input events, and asserting on the rendered DOM output. There are dedicated utility libraries that make these tasks simpler.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) is a Vue testing library focused on testing components without relying on implementation details. Built with accessibility in mind, its approach also makes refactoring a breeze. Its guiding principle is that the more tests resemble the way software is used, the more confidence they can provide.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils) is the official low-level component testing library that was written to provide users access to Vue specific APIs. It's also the lower-level library `@testing-library/vue` is built on top of.

We recommend using `@testing-library/vue` for testing components in applications, as its focus aligns better with the testing priorities of applications. Use `@vue/test-utils` only if you are building advanced components that require testing Vue-specific internals.

### Other Options {#other-options-1}

- [Nightwatch](https://v2.nightwatchjs.org/) is an E2E test runner with Vue Component Testing support. ([Example Project](https://github.com/nightwatchjs-community/todo-vue) in Nightwatch v2)

## E2E Testing {#e2e-testing}

While unit tests provide developers with some degree of confidence, unit and component tests are limited in their abilities to provide holistic coverage of an application when deployed to production. As a result, end-to-end (E2E) tests provide coverage on what is arguably the most important aspect of an application: what happens when users actually use your applications.

End-to-end tests focus on multi-page application behavior that makes network requests against your production-built Vue application. They often involve standing up a database or other backend and may even be run against a live staging environment.

End-to-end tests will often catch issues with your router, state management library, top-level components (e.g. an App or Layout), public assets, or any request handling. As stated above, they catch critical issues that may be impossible to catch with unit tests or component tests.

End-to-end tests do not import any of your Vue application's code, but instead rely completely on testing your application by navigating through entire pages in a real browser.

End-to-end tests validate many of the layers in your application. They can either target your locally built application, or even a live Staging environment. Testing against your Staging environment not only includes your frontend code and static server, but all associated backend services and infrastructure.

> The more your tests resemble the way your software is used, the more confidence they can give you. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - Author of the Testing Library

By testing how user actions impact your application, E2E tests are often the key to higher confidence in whether an application is functioning properly or not.

### Choosing an E2E Testing Solution {#choosing-an-e2e-testing-solution}

While end-to-end (E2E) testing on the web has gained a negative reputation for unreliable (flaky) tests and slowing down development processes, modern E2E tools have made strides forward to create more reliable, interactive, and useful tests. When choosing an E2E testing framework, the following sections provide some guidance on things to keep in mind when choosing a testing framework for your application.

#### Cross-browser testing {#cross-browser-testing}

One of the primary benefits that end-to-end (E2E) testing is known for is its ability to test your application across multiple browsers. While it may seem desirable to have 100% cross-browser coverage, it is important to note that cross browser testing has diminishing returns on a team's resources due the additional time and machine power required to run them consistently. As a result, it is important to be mindful of this trade-off when choosing the amount of cross-browser testing your application needs.

#### Faster feedback loops {#faster-feedback-loops}

One of the primary problems with end-to-end (E2E) tests and development is that running the entire suite takes a long time. Typically, this is only done in continuous integration and deployment (CI/CD) pipelines. Modern E2E testing frameworks have helped to solve this by adding features like parallelization, which allows for CI/CD pipelines to often run magnitudes faster than before. In addition, when developing locally, the ability to selectively run a single test for the page you are working on while also providing hot reloading of tests can help to boost a developer's workflow and productivity.

#### First-class debugging experience {#first-class-debugging-experience}

While developers have traditionally relied on scanning logs in a terminal window to help determine what went wrong in a test, modern end-to-end (E2E) test frameworks allow developers to leverage tools that they are already familiar with, e.g. browser developer tools.

#### Visibility in headless mode {#visibility-in-headless-mode}

When end-to-end (E2E) tests are run in continuous integration / deployment pipelines, they are often run in headless browsers (i.e., no visible browser is opened for the user to watch). A critical feature of modern E2E testing frameworks is the ability to see snapshots and/or videos of the application during testing, providing some insight into why errors are happening. Historically, it was tedious to maintain these integrations.

### Recommendation {#recommendation-2}

- [Cypress](https://www.cypress.io/)

  Overall, we believe Cypress provides the most complete E2E solution with features like an informative graphical interface, excellent debuggability, built-in assertions and stubs, flake-resistance, parallelization, and snapshots. As mentioned above, it also provides support for [Component Testing](https://docs.cypress.io/guides/component-testing/introduction). However, it only supports Chromium-based browsers and Firefox.

### Other Options {#other-options-2}

- [Playwright](https://playwright.dev/) is also a great E2E testing solution with a wider range of browser support (mainly WebKit). See [Why Playwright](https://playwright.dev/docs/why-playwright) for more details.

- [Nightwatch v2](https://v2.nightwatchjs.org/) is an E2E testing solution based on [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). This gives it the widest browser support range.

## Recipes {#recipes}

### Adding Vitest to a Project {#adding-vitest-to-a-project}

In a Vite-based Vue project, run:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

Next, update the Vite configuration to add the `test` option block:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
})
```

:::tip
If you are using TypeScript, add `vitest/globals` to the `types` field in your `tsconfig.json`.

```json
// tsconfig.json

{
 "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```
:::

Then create a file ending in `*.test.js` in your project. You can place all test files in a test directory in project root, or in test directories next to your source files. Vitest will automatically search for them using the naming convention.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // assert output
  getByText('...')
})
```

Finally, update `package.json` to add the test script and run it:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### Testing Composables {#testing-composables}

> This section assumes you have read the [Composables](/guide/reusability/composables.html) section.

When it comes to testing composables, we can divide them into two categories: composables that do not rely on a host component instance, and composables that do.

A composable depends on a host component instance when it uses the following APIs:

- Lifecycle hooks
- Provide / Inject

If a composable only uses Reactivity APIs, then it can be tested by directly invoking it and asserting its returned state / methods:

```js
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js
// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

A composable that relies on lifecycle hooks or Provide / Inject needs to be wrapped in a host component to be tested. We can create a helper like the following:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // return the result and the app instance
  // for testing provide / unmount
  return [result, app]
}
```
```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // mock provide for testing injections
  app.provide(...)
  // run assertions
  expect(result.foo.value).toBe(1)
  // trigger onUnmounted hook if needed
  app.unmount()
})
```

For more complex composables, it could also be easier to test it by writing tests against the wrapper component using [Component Testing](#component-testing) techniques.

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
