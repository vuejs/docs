# Komponenty {#components}

Do tej pory pracowaliśmy tylko z pojedynczym komponentem. Prawdziwe aplikacje Vue są zazwyczaj tworzone z zagnieżdżonymi komponentami.


Komponent nadrzędny może renderować inny komponent w swoim szablonie jako komponent podrzędny. Aby użyć komponentu podrzędnego, musimy go najpierw zaimportować:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

Musimy również zarejestrować komponent za pomocą opcji `components`. Tutaj używamy skrótu właściwości obiektu, aby zarejestrować komponent `ChildComp` pod kluczem `ChildComp`.

</div>
</div>

<div class="sfc">

Następnie możemy użyć komponentu w szablonie:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

Musimy również zarejestrować komponent za pomocą opcji `components`. Tutaj używamy skrótu właściwości obiektu, aby zarejestrować komponent `ChildComp` pod kluczem `ChildComp`.

Ponieważ piszemy szablon w DOM, będzie on podlegał regułom parsowania przeglądarki, które są nieczułe na wielkość liter w nazwach tagów. Dlatego musimy używać nazwy w formacie kebab-case, aby odwołać się do komponentu podrzędnego:

```vue-html
<child-comp></child-comp>
```

</div>


Teraz spróbuj sam - zaimportuj komponent podrzędny i wyrenderuj go w szablonie.
