---
badges:
  - removed
---

# Filters <MigrationBadges :badges="$frontmatter.badges" />

## Обзор

Filters are removed from Vue 3.0 and no longer supported.

## Синтаксис в 2.x

In 2.x, developers could use filters in order to apply common text formatting.

For example:

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return '$' + value
      }
    }
  }
</script>
```

While this seems like a convenience, it requires a custom syntax that breaks the assumption of expressions inside of curly braces being "just JavaScript," which has both learning and implementation costs.

## Что изменилось в 3.x

In 3.x, filters are removed and no longer supported. Instead, we recommend replacing them with method calls or computed properties.

Using the example above, here is one example of how it could be implemented.

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountInUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    computed: {
      accountInUSD() {
        return '$' + this.accountBalance
      }
    }
  }
</script>
```

## Стратегия миграции

Instead of using filters, we recommend replacing them with computed properties or methods.
