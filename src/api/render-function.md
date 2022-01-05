# Render Function APIs

## h()

## mergeProps()

## cloneVNode()

## isVNode()

## resolveComponent()

<div class="composition-api">

```js
const { h, resolveComponent } = Vue

export default {
  setup() {
    const ButtonCounter = resolveComponent('ButtonCounter')

    return () => {
      return h(ButtonCounter)
    }
  }
}
```

</div>
<div class="options-api">

```js
const { h, resolveComponent } = Vue

export default {
  render() {
    const ButtonCounter = resolveComponent('ButtonCounter')
    return h(ButtonCounter)
  }
}
```

</div>

Note that `resolveComponent()` must be called inside<span class="composition-api">either `setup()` or</span> the render function in order to resolve from the correct component context.

## resolveDirective()

## withDirectives()
