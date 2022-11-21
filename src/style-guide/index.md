---
outline: deep
---

# Style Guide {#style-guide}

:::warning Status Notice
The style guide is currently a bit outdated. Most examples are in Options API only, and there are no rules regarding `<script setup>` and Composition API. We are planning to improve it in the future.
:::

This is the official style guide for Vue-specific code. If you use Vue in a project, it's a great reference to avoid errors, bikeshedding, and anti-patterns. However, we don't believe that any style guide is ideal for all teams or projects, so mindful deviations are encouraged based on past experience, the surrounding tech stack, and personal values.

For the most part, we also avoid suggestions about JavaScript or HTML in general. We don't mind whether you use semicolons or trailing commas. We don't mind whether your HTML uses single-quotes or double-quotes for attribute values. Some exceptions will exist however, where we've found that a particular pattern is helpful in the context of Vue.

Finally, we've split rules into four categories:

## Rule Categories {#rule-categories}

### Priority A: Essential (Error Prevention) {#priority-a-essential-error-prevention}

These rules help prevent errors, so learn and abide by them at all costs. Exceptions may exist, but should be very rare and only be made by those with expert knowledge of both JavaScript and Vue.

- [See all priority A rules](./rules-essential)

### Priority B: Strongly Recommended {#priority-b-strongly-recommended}

These rules have been found to improve readability and/or developer experience in most projects. Your code will still run if you violate them, but violations should be rare and well-justified.

- [See all priority B rules](./rules-strongly-recommended)

### Priority C: Recommended {#priority-c-recommended}

Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you're consistent and have a good reason. Please do have a good reason though! By adapting to the community standard, you will:

1. Train your brain to more easily parse most of the community code you encounter
2. Be able to copy and paste most community code examples without modification
3. Often find new hires are already accustomed to your preferred coding style, at least in regards to Vue

- [See all priority C rules](./rules-recommended)

### Priority D: Use with Caution {#priority-d-use-with-caution}

Some features of Vue exist to accommodate rare edge cases or smoother migrations from a legacy code base. When overused however, they can make your code more difficult to maintain or even become a source of bugs. These rules shine a light on potentially risky features, describing when and why they should be avoided.

- [See all priority D rules](./rules-use-with-caution)
