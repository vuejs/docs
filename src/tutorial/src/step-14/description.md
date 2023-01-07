# Slots

Además de pasar datos a través de props, el componente padre también puede pasar fragmentos de plantilla al hijo a través de **slots**:

<div class="sfc">

```vue-html
<ChildComp>
  ¡Este es algún contenido del slot!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  ¡Este es algún contenido del slot!
</child-comp>
```

</div>

En el componente hijo, se puede renderizar el contenido del slot del padre utilizando el elemento `<slot>` como punto de salida:

<div class="sfc">

```vue-html
<!-- en la plantilla hija -->
<slot />
```

</div>
<div class="html">

```vue-html
<!-- en la plantilla hija -->
<slot></slot>
```

</div>

El contenido dentro del punto de salida `<slot>` será tratado como contenido "fallback" (_de reserva_): se mostrará si el padre no pasó ningún contenido al slot:

```vue-html
<slot>Contenido fallback</slot>
```

En este momento no estamos pasando ningún contenido del slot a `<ChildComp>`, por lo que deberías ver el contenido fallback. Proporcionemos algún contenido del slot al hijo mientras hacemos uso del estado `msg` del padre.
