---
aside: deep
---

# Performance Guide

## Page Load Performance

### Bundle Size and Tree-shaking

### Full Build vs. Runtime-only build

### Code Splitting

### Big List Virtualization

### Avoid Unnecessary Component Abstractions

## Update Performance

### Reducing Reactivity Overhead

- Use shallow APIs to hold immutable data

### Component and Reactivity Boundary

- Identify unnecessary updates with `renderTriggered`

### Provide / Inject

- Avoid props drilling
- Avoid duplicated computed properties

### `v-once`

### `v-memo`
