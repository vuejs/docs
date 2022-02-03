# Testing

## Overview

When it comes to building reliable applications, automated tests can play a critical role in an individual or team's ability to build new features, refactor code, and fix bugs with confidence.

In a Vue application, there are different types of concerns that can be covered by automated tests:

- **Logic**: verify non-UI rendering logic is implemented correctly. This typically involves application-wide business logic (e.g. state management stores) and utility functions.

- **Visual**: given certain input props / state, verify that an isolated component or component tree is rendering the correct visual output.

- **Interaction**: simulate user behavior, such as a click or input, and verify that an isolated component or component tree renders correct, updated output.

- **User Flow**: given a sequence of user interactions that are necessary to complete an actual user task, check whether the application as a whole is working as expected.

For different testing concerns, we need to use different testing techniques:

- **Unit Testing** covers **Logic** tests.
- **Component Testing** covers **Visual** and **Interaction** tests.
- **End-To-End (E2E) Testing** covers **User Flow** tests.

We will briefly discuss what each of these are, how they can be implemented for Vue applications, and provide some general recommendations.

## Unit Testing

Unit tests are written to verify that small, isolated units of code are working as expected. They focus on logical correctness that can be easily validated. The most common example of a unit test is testing whether a function returns expected values based on different input arguments.

As mentioned previously, unit testing is typically applied to application-wide business logic or utility functions that do not involve actual UI rendering. These are typically plain JavaScript / TypeScript modules living outside of Vue components. Therefore, writing unit tests in Vue applications does not differ significantly from applications using other frameworks.

One category of functions specific to Vue applications are [Composables](/guide/reusability/composables.html), which may require special handling during tests.
See [Testing Composables](#testing-composables) below for more details.

### Recommendation

- [Vitest](https://vitest.dev/)

  Since the official setup created by `create-vue` is based on [Vite](https://vitejs.dev/), we recommend using a unit testing framework that can leverage the same configuration and transform pipeline directly from Vite. [Vitest](https://vitest.dev/) is a unit testing framework designed specifically for this purpose, created and maintained by Vue / Vite team members. It integrates with Vite-based projects with minimal effort, and is blazing fast.

:::warning In Active Development
Vitest is relatively new and is still undergoing rapid development. While it is not considered stable yet, the team is working hard to get it to production ready state.
:::

### Other Options

- [Peeky](https://peeky.dev/) is another fast unit test runner with first-class Vite integration. It is also created by a Vue core team member and offers a GUI-based testing interface.

- [Jest](https://jestjs.io/) is a popular unit testing framework, and can be made to work with Vite via the [vite-jest](https://github.com/sodatea/vite-jest) package. However, we only recommend Jest if you have an existing Jest test suite that needs to be migrated over to a Vite-based project, as Vitest offers a more seamless integration and better performance.

## Component Testing

In Vue applications, components are the main building blocks of the UI. Components are therefore the natural unit of isolation when it comes to visual and interaction tests. From a granularity perspective, component testing sits somewhere above unit testing and can be considered a form of integration testing. In some cases we will be testing a single component, but in other cases we could be testing a tree of components to make sure they are integrated correctly.

Component tests should focus on the component's public interfaces rather than internal implementation details. Or, in other words, **test what a component does, not how it does it**.

- **DO**

  - For **Visual** tests: assert correct render output based on input props and slots.
  - For **Interaction** tests: assert correct render updates or emitted events in response to user input events.

- **DON'T**

  Assert the private state of a component instance or test the private methods of a component. Testing implementation details makes the tests brittle, as they are more likely to break and require updates when the implementation changes.

  The component's ultimate job is rendering the correct DOM output, so tests focusing on the DOM output provide the same level of correctness assurance (if not more) while being more robust and resilient to change.

  If a method needs to be tested, extract it into a standalone utility function and write a dedicated unit test for it. If it cannot be extracted cleanly, it should be tested as a part of an interaction test that invokes it.

### Recommendation

- [Vitest](https://vitest.dev/) or the other unit testing frameworks mentioned above can be used for component testing by simulating the DOM in Node.js. See [Adding Vitest to a Project](#adding-vitest-to-a-project) for more details.

### Libraries

Component testing often involves mounting the component being tested in isolation, triggering simulated user input events, and asserting the rendered DOM output. There are dedicated utility libraries that make these tasks simpler.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) is a Vue testing library focused on testing components without relying on implementation details. Built with accessibility in mind, its approach also makes refactoring a breeze. Its guiding principle is that the more tests resemble the way software is used, the more confidence they can provide.

- [`@vue/test-utils`](https://github.com/vuejs/vue-test-utils) is the official low-level component testing library that was written to provide users access to Vue specific APIs. It's also the lower-level library `@testing-library/vue` is built on top of.

We recommend using `@testing-library/vue` for testing components in applications, as its focus aligns better with the testing priorities of applications. Use `@vue/test-utils` only if you are building advanced components that require testing Vue-specific internals.

### Other Options

- [Cypress](https://www.cypress.io/) is an E2E test solution, but it also supports [Component Testing](https://docs.cypress.io/guides/component-testing/introduction) which can test components in real browsers with a GUI that shows the actual DOM state during tests.

- [Nightwatch](https://v2.nightwatchjs.org/) is another E2E test runner with Vue Component Testing support. ([Example Project](https://github.com/nightwatchjs-community/todo-vue) in Nightwatch v2)

## E2E Testing

While unit tests provide developers with some degree of confidence, unit and component tests are limited in their abilities to provide holistic coverage of an application when deployed to production. As a result, end-to-end (E2E) tests provide coverage on what is arguably the most important aspect of an application: what happens when users actually use your applications.

In other words, E2E tests validate all of the layers in your application. This not only includes your frontend code, but all associated backend services and infrastructure that are more representative of the environment that your users will be in. By testing how user actions impact your application, E2E tests are often the key to higher confidence in whether an application is functioning properly or not.

### Choosing an E2E Testing Solution

While end-to-end (E2E) testing on the web has gained a negative reputation for unreliable (flaky) tests and slowing down development processes, modern E2E tools have made strides forward to create more reliable, interactive, and useful tests. When choosing an E2E testing framework, the following sections provide some guidance on things to keep in mind when choosing a testing framework for your application.

#### Cross-browser testing

One of the primary benefits that end-to-end (E2E) testing is known for is its ability to test your application across multiple browsers. While it may seem desirable to have 100% cross-browser coverage, it is important to note that cross browser testing has diminishing returns on a team's resources due the additional time and machine power required to run them consistently. As a result, it is important to be mindful of this trade-off when choosing the amount of cross-browser testing your application needs.

#### Faster feedback loops

One of the primary problems with end-to-end (E2E) tests and development is that running the entire suite takes a long time. Typically, this is only done in continuous integration and deployment (CI/CD) pipelines. Modern E2E testing frameworks have helped to solve this by adding features like parallelization, which allows for CI/CD pipelines to often run magnitudes faster than before. In addition, when developing locally, the ability to selectively run a single test for the page you are working on while also providing hot reloading of tests can help to boost a developer's workflow and productivity.

#### First-class debugging experience

While developers have traditionally relied on scanning logs in a terminal window to help determine what went wrong in a test, modern end-to-end (E2E) test frameworks allow developers to leverage tools that they are already familiar with, e.g. browser developer tools.

#### Visibility in headless mode

When end-to-end (E2E) tests are run in continuous integration / deployment pipelines, they are often run in headless browsers (i.e., no visible browser is opened for the user to watch). A critical feature of modern E2E testing frameworks is the ability to see snapshots and/or videos of the application during testing, providing some insight into why errors are happening. Historically, it was tedious to maintain these integrations.

### Recommendation

- [Cypress](https://www.cypress.io/)

  Overall, we believe Cypress provides the most complete E2E solution with features like an informative graphical interface, excellent debuggability, built-in assertions and stubs, flake-resistance, parallelization, and snapshots. As mentioned above, it also provides support for [Component Testing](https://docs.cypress.io/guides/component-testing/introduction). However, it only supports Chromium-based browsers and Firefox.

### Other Options

- [Playwright](https://playwright.dev/) is also a great E2E testing solution with a wider range of browser support (mainly WebKit). See [Why Playwright](https://playwright.dev/docs/why-playwright) for more details.

- [Nightwatch v2](https://v2.nightwatchjs.org/) is an E2E testing solution based on [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). This gives it the widest browser support range.

## Recipes

### Adding Vitest to a Project

In a Vite-based Vue project, run:

```sh
> npm install -D vitest happy-dom @testing-library/vue@next
```

Next, update the Vite configuration to add the `test` option block:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // enable jest-like global test APIs
    global: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
})
```

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

### Testing Composables

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
