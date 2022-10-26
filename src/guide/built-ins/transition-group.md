<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# TransitionGroup {#transitiongroup}

`<TransitionGroup>` is a built-in component designed for animating the insertion, removal, and order change of elements or components that are rendered in a list.

## Differences from `<Transition>` {#differences-from-transition}

`<TransitionGroup>` supports the same props, CSS transition classes, and JavaScript hook listeners as `<Transition>`, with the following differences:

- By default, it doesn't render a wrapper element. But you can specify an element to be rendered with the `tag` prop.

- [Transition modes](./transition.html#transition-modes) are not available, because we are no longer alternating between mutually exclusive elements.

- Elements inside are **always required** to have a unique `key` attribute.

- CSS transition classes will be applied to individual elements in the list, **not** to the group / container itself.

:::tip
When used in [DOM templates](/guide/essentials/component-basics.html#dom-template-parsing-caveats), it should be referenced as `<transition-group>`.
:::

## Enter / Leave Transitions {#enter-leave-transitions}

Here is an example of applying enter / leave transitions to a `v-for` list using `<TransitionGroup>`:

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## Move Transitions {#move-transitions}

The above demo has some obvious flaws: when an item is inserted or removed, its surrounding items instantly "jump" into place instead of moving smoothly. We can fix this by adding a few additional CSS rules:

```css{1,13-17}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```

Now it looks much better - even animating smoothly when the whole list is shuffled:

<ListMove />

[Full Example](/examples/#list-transition)

## Staggering List Transitions {#staggering-list-transitions}

By communicating with JavaScript transitions through data attributes, it's also possible to stagger transitions in a list. First, we render the index of an item as a data attribute on the DOM element:

```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

Then, in JavaScript hooks, we animate the element with a delay based on the data attribute. This example is using the [GreenSock library](https://greensock.com/) to perform the animation:

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[Full Example in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuXG5jb25zdCBsaXN0ID0gW1xuICB7IG1zZzogJ0JydWNlIExlZScgfSxcbiAgeyBtc2c6ICdKYWNraWUgQ2hhbicgfSxcbiAgeyBtc2c6ICdDaHVjayBOb3JyaXMnIH0sXG4gIHsgbXNnOiAnSmV0IExpJyB9LFxuICB7IG1zZzogJ0t1bmcgRnVyeScgfVxuXVxuXG5jb25zdCBxdWVyeSA9IHJlZignJylcblxuY29uc3QgY29tcHV0ZWRMaXN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gbGlzdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubXNnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudmFsdWUpKVxufSlcblxuZnVuY3Rpb24gb25CZWZvcmVFbnRlcihlbCkge1xuICBlbC5zdHlsZS5vcGFjaXR5ID0gMFxuICBlbC5zdHlsZS5oZWlnaHQgPSAwXG59XG5cbmZ1bmN0aW9uIG9uRW50ZXIoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgaGVpZ2h0OiAnMS42ZW0nLFxuICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIG9wYWNpdHk6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgLz5cbiAgPFRyYW5zaXRpb25Hcm91cFxuICAgIHRhZz1cInVsXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgPlxuICAgIDxsaVxuICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNvbXB1dGVkTGlzdFwiXG4gICAgICA6a2V5PVwiaXRlbS5tc2dcIlxuICAgICAgOmRhdGEtaW5kZXg9XCJpbmRleFwiXG4gICAgPlxuICAgICAge3sgaXRlbS5tc2cgfX1cbiAgICA8L2xpPlxuICA8L1RyYW5zaXRpb25Hcm91cD5cbjwvdGVtcGxhdGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Full Example in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmNvbnN0IGxpc3QgPSBbXG4gIHsgbXNnOiAnQnJ1Y2UgTGVlJyB9LFxuICB7IG1zZzogJ0phY2tpZSBDaGFuJyB9LFxuICB7IG1zZzogJ0NodWNrIE5vcnJpcycgfSxcbiAgeyBtc2c6ICdKZXQgTGknIH0sXG4gIHsgbXNnOiAnS3VuZyBGdXJ5JyB9XG5dXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6ICcnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkTGlzdCgpIHtcbiAgICAgIHJldHVybiBsaXN0LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5tc2cudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0aGlzLnF1ZXJ5KSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkJlZm9yZUVudGVyKGVsKSB7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMFxuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgIH0sXG4gICAgb25FbnRlcihlbCwgZG9uZSkge1xuICAgICAgZ3NhcC50byhlbCwge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBoZWlnaHQ6ICcxLjZlbScsXG4gICAgICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICAgICAgb25Db21wbGV0ZTogZG9uZVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgICAgIGdzYXAudG8oZWwsIHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBkZWxheTogZWwuZGF0YXNldC5pbmRleCAqIDAuMTUsXG4gICAgICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgLz5cbiAgPFRyYW5zaXRpb25Hcm91cFxuICAgIHRhZz1cInVsXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgPlxuICAgIDxsaVxuICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNvbXB1dGVkTGlzdFwiXG4gICAgICA6a2V5PVwiaXRlbS5tc2dcIlxuICAgICAgOmRhdGEtaW5kZXg9XCJpbmRleFwiXG4gICAgPlxuICAgICAge3sgaXRlbS5tc2cgfX1cbiAgICA8L2xpPlxuICA8L1RyYW5zaXRpb25Hcm91cD5cbjwvdGVtcGxhdGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

---

**Related**

- [`<TransitionGroup>` API reference](/api/built-in-components.html#transitiongroup)
