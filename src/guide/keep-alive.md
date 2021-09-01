# Dynamic Components with `keep-alive`

Earlier, we used the `is` attribute to switch between components in a tabbed interface:

```vue-html
<component :is="currentTabComponent"></component>
```

When switching between these components though, you'll sometimes want to maintain their state or avoid re-rendering for performance reasons. For example, when expanding our tabbed interface a little:

<!-- <common-codepen-snippet title="Dynamic components: without keep-alive" slug="jOPjZOe" tab="html,result" /> -->

You'll notice that if you select a post, switch to the _Archive_ tab, then switch back to _Posts_, it's no longer showing the post you selected. That's because each time you switch to a new tab, Vue creates a new instance of the `currentTabComponent`.

Recreating dynamic components is normally useful behavior, but in this case, we'd really like those tab component instances to be cached once they're created for the first time. To solve this problem, we can wrap our dynamic component with a `<keep-alive>` element:

```vue-html
<!-- Inactive components will be cached! -->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

Check out the result below:

<!-- <common-codepen-snippet title="Dynamic components: with keep-alive" slug="VwLJQvP" tab="html,result" /> -->

Now the _Posts_ tab maintains its state (the selected post) even when it's not rendered.

Check out more details on `<keep-alive>` in the [API reference](../api/built-in-components.html#keep-alive).
