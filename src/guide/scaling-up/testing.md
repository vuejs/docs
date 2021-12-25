---
aside: deep
---

# Testing <Badge text="WIP" />

## Overview

When it comes to building reliable applications, tests can play a critical role in an individual or team's ability to build new features, refactor code, fix bugs, etc. While there are many schools of thought with testing, there are three categories often discussed in the context of Vue applications:

- Unit Testing
- Component Testing
- End-To-End (E2E) Testing

We will briefly discuss what each of these are concerned with, and provide some general recommendations.

## Unit Testing

- Small, isolated units
- Focus on logical correctness that can be easily validated
- See [testing composables](#testing-composables) below

### Recommendation

- [Vitest](https://vitest.dev/)

### Other Options

- [Peeky](https://peeky.dev/)
- Jest
- Mocha

## Component Testing

- Component testing is a form of integration testing
- Test the interfaces (props and events), not the internals

### Recommendation

- Vitest
- Cypress Component Testing

### Libraries

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library)
- [`@vue/test-utils`](https://github.com/vuejs/vue-test-utils)

### Other Options

- Nightwatch Component Testing

## E2E Testing

### Recommendation

- [Cypress](https://www.cypress.io/)

### Other Options

- [Playwright](https://playwright.dev/)
- [Nightwatch](https://nightwatchjs.org/)

## Recipes

### Testing Composables

- Composables without Side Effects

- Composables with Side Effects or Provide / Inject

<!-- TODO link to this from composables page -->

<!--
  TODO more testing recipes can be added in the future
  e.g. mocking, CI setup, etc.
-->
