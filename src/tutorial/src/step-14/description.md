# Slots {#slots}

In addition to passing data via props, the parent component can also pass down template fragments to the child via **slots**:

<div class="sfc">

```vue-html
<ChildComp>
  This is some slot content!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  This is some slot content!
</child-comp>
```

</div>

In the child component, it can render the slot content from the parent using the `<slot>` element as outlet:

<div class="sfc">

```vue-html
<!-- in child template -->
<slot/>
```

</div>
<div class="html">

```vue-html
<!-- in child template -->
<slot></slot>
```

</div>

Content inside the `<slot>` outlet will be treated as "fallback" content: it will be displayed if the parent did not pass down any slot content:

```vue-html
<slot>Fallback content</slot>
```

Currently we are not passing any slot content to `<ChildComp>`, so you should see the fallback content. Let's provide some slot content to the child while making use of the parent's `msg` state.
