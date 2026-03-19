---
outline: deep
---

# Style Guide {#style-guide}

::: warning Status
This section is under active revision. Priority A: Essential is currently the maintained section of the guide. Priority B, C, and D are retained as legacy reference content.
:::

This is the official style guide for Vue-specific code. It is meant to help teams make sound architectural, semantic, and maintainability decisions in modern Vue applications. However, no style guide is ideal for every team or project, so mindful deviations are still encouraged when they are deliberate and well understood.

This guide focuses on a small set of human-facing Vue rules. It is not intended to mirror every rule that lint tooling may enforce. Tools such as [eslint-plugin-vue](https://eslint.vuejs.org/), formatters, and other static analysis can still cover broader mechanical correctness and consistency checks.

For the most part, we avoid suggestions about JavaScript or HTML in general. We do not try to settle choices like semicolons, trailing commas, or quote style unless they become specifically important in the context of Vue.

## How to use this guide {#how-to-use-this-guide}

- Start with the [essential rules](./rules-essential). They are the primary maintained part of this guide and focus on component contracts, explicit data flow, component boundaries, and the Vue mental model.
- Treat Priority B, C, and D as legacy reference pages. They may still contain useful conventions, but they are not part of the current maintained scope.
- If your team uses [eslint-plugin-vue](https://eslint.vuejs.org/), expect tooling to enforce additional syntax, correctness, and consistency rules that are not all repeated here.

## Rule Categories {#rule-categories}

### Priority A: Essential (Maintained) {#priority-a-essential-error-prevention}

These rules focus on component contracts, explicit data flow, component boundaries, and the Vue mental model. They are written to guide human decisions, not to duplicate every lint rule.

- [See all priority A rules](./rules-essential)

### Priority B: Strongly Recommended (Legacy Reference) {#priority-b-strongly-recommended}

This page is preserved for historical reference. Its recommendations may still be useful, but they are not part of the current maintained scope.

- [See all priority B rules](./rules-strongly-recommended)

### Priority C: Recommended (Legacy Reference) {#priority-c-recommended}

This page is also preserved as legacy reference content. It may help teams that want additional conventions, but it is not part of the current maintained scope.

- [See all priority C rules](./rules-recommended)

### Priority D: Use with Caution (Legacy Reference) {#priority-d-use-with-caution}

This page remains available as historical guidance on risky patterns, but it is not part of the current maintained scope.

- [See all priority D rules](./rules-use-with-caution)
