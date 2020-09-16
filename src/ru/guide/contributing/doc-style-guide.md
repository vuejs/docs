# Documentation Style Guide

This guide will provide an overview of different design elements that are available for your use in creating documentation.

## Alerts

VuePress provides a custom container plugin to create alert boxes. There are four types:

- **Info**: Provide information that is neutral
- **Tip**: Provide information that is positive and encouraged
- **Warning**: Provide information that users should be aware of as there is a low to moderate
- **Danger**: Provide information that is negative and has a high risk to the user

**Markdown Examples**

```
::: info
You can find more information at this site.
:::

::: tip
This is a great tip to remember!
:::

::: warning
This is something to be cautious of.
:::

::: danger DANGER
This is something we do not recommend. Use at your own risk.
:::
```

**Rendered Markdown**

::: info
You can find more information at this site.
:::

::: tip
This is a great tip to remember!
:::

::: warning
This is something to be cautious of.
:::

::: danger DANGER
This is something we do not recommend. Use at your own risk.
:::

## Code Blocks

VuePress uses Prism to provide language syntax highlighting by appending the language to the beginning backticks of a code block:

**Markdown Example**

````
```js
export default {
  name: 'MyComponent'
}
```
````

**Rendered Output**
```js
export default {
  name: 'MyComponent'
}
```

### Line Highlighting

To add line highlighting to your code blocks, you need to append the line number in curly braces.

#### Single Line

**Markdown Example**

````
```js{2}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
````

**Rendered Markdown**

```js{2}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```

#### Group of Lines

````
```js{4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
````

```js{4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```

#### Multiple Sections

````
```js{2,4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
````

```js{2,4-5}
export default {
  name: 'MyComponent',
  props: {
    type: String,
    item: Object
  }
}
```
