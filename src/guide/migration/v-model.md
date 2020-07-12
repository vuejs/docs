# Changes to `v-model` on custom components

## Overview

In terms of what has changed, at a high level:

- **DEPRECATED:** `v-bind`'s `.sync` modifier is removed and replaced with an argument on `v-model`;
- Multiple `v-model` bindings on the same component are possible now;
- When used on custom components, `v-model` prop and event default names are changed:
  - prop: `value` -> `modelValue`;
  - event: `input` -> `update:modelValue`;
- Added a possibility to create custom `v-model` modifiers.

For more information, read on!
