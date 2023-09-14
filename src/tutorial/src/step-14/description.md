# Slots {#slots}

Oltre a passare i dati tramite props, il componente padre può anche passare dei frammenti di template al figlio tramite **slots**.

<div class="sfc">

```vue-html
<ChildComp>
  Questo è il contenuto di uno slot!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  Questo è il contenuto di uno slot!
</child-comp>
```

</div>

Il componente figlio, può renderizzare il contenuto dello slot passato dal genitore usando l'elemento `<slot>` per renderizzarlo:

<div class="sfc">

```vue-html
<!-- nel componente figlio -->
<slot/>
```

</div>
<div class="html">

```vue-html
<!-- nel componente figlio -->
<slot></slot>
```

</div>

Il contenuto all'interno di uno `<slot>` sarà trattato come contenuto di "fallback", cioè sarà visualizzato se il padre non ha passato alcuno contenuto:

```vue-html
<slot>Contenuto di fallback</slot>
```

Attualmente non stiamo passando alcun contenuto di slot a `<ChildComp>`, quindi dovresti vedere il contenuto di fallback. Aggiungi un contenuto di slot al figlio, utilizzando lo stato `msg` del padre.
