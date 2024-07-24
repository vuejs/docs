# Slots {#slots}

Oprócz przekazywania danych za pośrednictwem rekwizytów, komponent nadrzędny może również przekazywać fragmenty szablonu do komponentu podrzędnego za pośrednictwem **slotów**:

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

Komponent podrzędny może on renderować zawartość slotu od rodzica, używając elementu <slot> jako wyjścia:

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

Zawartość wewnątrz `<slot>` będzie traktowana jako zawartość „awaryjna”: będzie wyświetlana, jeśli rodzic nie przekazał żadnej zawartości slotu:

```vue-html
<slot>Fallback content</slot>
```

Obecnie nie przekazujemy żadnej zawartości do slotu komponentu `<ChildComp>`, więc powinieneś zobaczyć zawartość awaryjną. Przekażmy dziecku zawartość slotu, korzystając ze stanu `msg` rodzica.
