# Props {#props}

> Si assume che tu abbia già letto le [Basi dei componenti](/guide/essentials/component-basics). Leggi prima quello se sei nuovo al concetto di componente.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Free Vue.js Props Lesson"/>
</div>

## Dichiarazione delle Props {#props-declaration}

I componenti di Vue richiedono una dichiarazione esplicita delle props affinché Vue sappia come trattare le props esterne passate al componente come attributi passanti (che verranno discusse nella [sezione dedicata](/guide/components/attrs)).

<div class="composition-api">

Nei SFC utilizzando `<script setup>`, le props possono essere dichiarate utilizzando la macro `defineProps()`:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

Nei componenti non-`<script setup>`, le props vengono dichiarate utilizzando la sezione [`props`](/api/options-state#props):

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() prende props come primo parametro
    console.log(props.foo)
  }
}
```

Nota che l'argomento passato a defineProps() è lo stesso valore fornito all'opzione props: la stessa API di opzioni per le props è condivisa tra i due stili di dichiarazione..

</div>

<div class="options-api">

Le props vengono dichiarate nella sezione [`props`](/api/options-state#props):

```js
export default {
  props: ['foo'],
  created() {
    // puoi riferirti alle props con `this`
    console.log(this.foo)
  }
}
```

</div>

Oltre a dichiarare le props utilizzando un array di stringhe, possiamo anche utilizzare la sintassi dell'oggetto:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// in <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// non-<script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

Per ogni proprietà nella sintassi di dichiarazione dell'oggetto, la chiave rappresenta il nome della prop, mentre il valore dovrebbe essere la funzione costruttrice del tipo previsto.

Questo non solo documenta il componente, ma avvertirà anche gli altri sviluppatori che utilizzano il componente nella console del browser se passano un tipo errato. Discuteremo ulteriori dettagli sulla [validazione delle props](#prop-validation) più avanti in questa pagina.

<div class="options-api">

Guarda anche: [Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

Se stai usando TypeScript con `<script setup>`, è anche possibile dichiarare le props utilizzando solo annotazioni di tipo:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

Più dettagli: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

## Dettagli sul passaggio delle Props {#prop-passing-details}

### Casing dei nomi delle Props {#prop-name-casing}

Dichiarare i nomi delle props lunghi utilizzando camelCase ci permette di evitare l'uso di virgolette quando li utilizziamo come chiavi di proprietà e ci consente di farvi riferimento direttamente nelle espressioni del template, poiché sono identificatori JavaScript validi:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

Tecnicamente, puoi anche utilizzare camelCase quando passi props a un componente figlio (ad eccezione dei [template DOM](/guide/essentials/component-basics#dom-template-parsing-caveats)). Tuttavia, la convenzione è utilizzare kebab-case in tutti i casi per allinearsi agli attributi HTML:

```vue-html
<MyComponent greeting-message="hello" />
```

Utilizziamo [PascalCase per i tag dei componenti](/guide/components/registration#component-name-casing)  quando possibile poiché migliora la leggibilità del template differenziando i componenti Vue dagli elementi nativi. Tuttavia, non ci sono molti vantaggi pratici nell'utilizzare camelCase quando si passano props, quindi scegliamo di seguire le convenzioni di ciascun linguaggio.

### Props Statiche vs. Dinamiche {#static-vs-dynamic-props}

Finora, hai visto le props passate come valori statici, come in:

```vue-html
<BlogPost title="My journey with Vue" />
```

Hai anche visto le props assegnate dinamicamente con v-bind o il suo abbreviato :, come ad esempio in:

```vue-html
<!-- Assegna dinamicamente il valore di una variabile -->
<BlogPost :title="post.title" />

<!-- Assegna dinamicamente il valore di una espressione complessa -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### Passaggio di diversi tipi di valori {#passing-different-value-types}

Negli esempi sopra, casualmente abbiamo passato valori di tipo stringa, ma  _qualsiasi_ tipo di valore può essere passato a una prop.

#### Numero  {#number}

```vue-html
<!-- Anche se `42` è statico, abbiamo bisogno di v-bind per indicare a Vue che -->
<!-- questa è un'espressione JavaScript piuttosto che una stringa. -->
<BlogPost :likes="42" />

<!-- Assegna dinamicamente il valore di una variabile -->
<BlogPost :likes="post.likes" />
```

#### Booleani {#boolean}

```vue-html
<!-- Includere la prop senza valore implicherà `true`. -->
<BlogPost is-published />

<!-- Anche se `false` è statico, abbiamo bisogno di v-bind per dire a Vue che -->
<!-- questa è un'espressione JavaScript piuttosto che una stringa.          -->
<BlogPost :is-published="false" />

<!-- Assegnare dinamicamente al valore di una variabile. -->
<BlogPost :is-published="post.isPublished" />
```

#### Array {#array}

```vue-html
<!-- Anche se l'array è statico, abbiamo bisogno di v-bind per dire a Vue che -->
<!-- questa è un'espressione JavaScript piuttosto che una stringa. -->

<BlogPost :comment-ids="[234, 266, 273]" />
<!-- Assegnare dinamicamente al valore di una variabile. -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Oggetti {#object}

```vue-html
<!-- Anche se l'oggetto è statico, abbiamo bisogno di v-bind per dire a Vue che -->
<!-- questa è un'espressione JavaScript piuttosto che una stringa.             -->
<BlogPost
:author="{
 name: 'Veronica',
 company: 'Veridian Dynamics'
  }"
/>

<!-- Assegnare dinamicamente al valore di una variabile. -->
<BlogPost :author="post.author" />
```

### Associazione di più proprietà utilizzando un oggetto {#binding-multiple-properties-using-an-object}

Se desideri passare tutte le proprietà di un oggetto come props, puoi utilizzare [`v-bind` senza un argomento](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) (`v-bind` invece di `:prop-name`). Ad esempio, dato un oggetto `post`:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

</div>

Il seguente codice:

```vue-html
<BlogPost v-bind="post" />
```

Sarà equivalente a:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## Flusso unidirezionale dei dati {#one-way-data-flow}

Tutte le props formano un legame **unidirezionale verso il basso** tra la proprietà figlio e quella genitore: quando la proprietà genitore viene aggiornata, essa fluirà verso il basso fino al figlio, ma non viceversa. Questo impedisce ai componenti figlio di mutare accidentalmente lo stato del genitore, il che può rendere più difficile comprendere il flusso dei dati dell'app.

Inoltre, ogni volta che il componente genitore viene aggiornato, tutte le props nel componente figlio verranno aggiornate con il valore più recente. Ciò significa che **non** dovresti tentare di mutare una prop all'interno di un componente figlio. Se lo fai, Vue ti avviserà nella console:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ Attenzione, le props sono readonly!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ Attenzione, le props sono readonly!
    this.foo = 'bar'
  }
}
```

</div>

Di solito ci sono due casi in cui è tentativo mutare una prop:

1. **La prop viene utilizzata per passare un valore iniziale; il componente figlio vuole usarla successivamente come proprietà dati locale.** In questo caso, è meglio definire una proprietà dati locale che utilizzi la prop come suo valore iniziale:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // counter utilizza solo props.initialCounter come valore iniziale;
   // è scollegato dagli aggiornamenti futuri della prop.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // counter utilizza solo this.initialCounter come valore iniziale;
         // è scollegato dagli aggiornamenti futuri della prop.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **La prop viene passata come un valore grezzo che deve essere trasformato.** In questo caso, è meglio definire una proprietà calcolata che utilizzi il valore della prop:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // computed property che fa un auto-update quando la prop cambia
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // computed property che fa un auto-update quando la prop cambia
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### Modifica props Oggetto / Array{#mutating-object-array-props}

Quando oggetti e array vengono passati come props, sebbene il componente figlio non possa mutare il legame con la prop, **potrà** mutare le proprietà annidate dell'oggetto o dell'array. Questo perché in JavaScript gli oggetti e gli array vengono passati per riferimento, ed è irragionevolmente costoso per Vue prevenire tali mutazioni.

Il principale svantaggio di tali mutazioni è che consentono al componente figlio di influenzare lo stato del genitore in un modo che non è ovvio per il componente genitore, rendendo potenzialmente più difficile ragionare sul flusso dei dati in futuro. Come buona pratica, dovresti evitare tali mutazioni a meno che il genitore e il figlio siano strettamente accoppiati dal design. Nella maggior parte dei casi, il figlio dovrebbe [emettere un evento](/guide/components/events) per permettere al genitore di effettuare il cambiamento.

## Validazione delle props {#prop-validation}

I componenti possono specificare requisiti per le loro props, come i tipi che hai già visto. Se un requisito non viene soddisfatto, Vue ti avviserà nella console JavaScript del browser. Questo è particolarmente utile quando sviluppi un componente destinato ad essere utilizzato da altri.

Per specificare la validazione delle props, puoi fornire un oggetto con requisiti di validazione alla macro <span class="composition-api">`defineProps()`</span><span class="options-api">opzione `props`</span>, invece di un array di stringhe. Ad esempio:

<div class="composition-api">

```js
defineProps({
  // Controllo di base dei tipi
  // (null e undefined consentiranno qualsiasi tipo)
  propA: Number,
  // Diversi tipi possibili
  propB: [String, Number],
  // Stringa obbligatoria
  propC: {
    type: String,
    required: true
  },
  // Numero con un valore predefinito
  propD: {
    type: Number,
    default: 100
  },
  // Oggetto con un valore predefinito
  propE: {
    type: Object,
  // I valori predefiniti degli oggetti o degli array devono essere restituiti da
  // una funzione factory. La funzione riceve come argomento le props grezze
  // ricevute dal componente.
  default(rawProps) {
    return { message: 'hello' }
  }
},
  // Funzione di validazione personalizzata
  propF: {
    validator(value) {
  // Il valore deve corrispondere a una di queste stringhe
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Funzione con un valore predefinito
  propG: {
    type: Function,
    // A differenza dei valori predefiniti degli oggetti o degli array, questa non è una
    // funzione "factory" - questa è una funzione da utilizzare come valore predefinito
    default() {
      return 'Default function'
    }
  }
})
```

:::tip
Il codice all'interno dell'argomento di `defineProps()` **non può accedere ad altre variabili dichiarate in  `<script setup>`**, perché l'intera espressione viene spostata in un ambito di funzione esterno durante la compilazione.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // Controllo di base dei tipi
    //  (i valori `null` e `undefined`  consentiranno qualsiasi tipo)
    propA: Number,
    // Molteplici tipi possibili
    propB: [String, Number],
    // stringa required 
    propC: {
      type: String,
      required: true
    },
    // Numero con un valore default 
    propD: {
      type: Number,
      default: 100
    },
    // Oggetto con un valore default 
    propE: {
      type: Object,
      // I valori predefiniti degli oggetti o degli array devono essere restituiti da
      // una funzione factory. La funzione riceve come argomento le props grezze
      // ricevute dal componente.
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // funzione custom `validator`
    propF: {
      validator(value) {
        // Il valore deve corrispondere a una di queste stringhe
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // Funzione con un valore default
    propG: {
      type: Function,
      // A differenza dei valori predefiniti degli oggetti o degli array, questa non è una 
      // funzione factory - questa è una funzione da utilizzare come valore predefinito
      default() {
        return 'Default function'
      }
    }
  }
}
```

</div>

Dettagli aggiuntivi:

- Tutte le props sono opzionali per impostazione predefinita, a meno che non venga specificato `required: true`.

- Una prop opzionale assente diversa da `Boolean` avrà il valore `undefined`.

- Le props `Boolean` assenti verranno convertite in `false`. You can change this by setting a `default` for it — i.e.: `default: undefined` to behave as a non-Boolean prop.

- Se viene specificato un valore `default`, verrà utilizzato se il valore della prop risolto è `undefined` - ciò include sia quando la prop è assente, sia quando viene passato esplicitamente un valore `undefined`.

Quando la validazione delle props fallisce, Vue genererà un avviso nella console (se si utilizza la versione di sviluppo).

<div class="composition-api">

Se si utilizzano le [Dichiarazioni delle props basate sul tipo](/api/sfc-script-setup#type-only-props-emit-declarations) <sup class="vt-badge ts" />, Vue farà del suo meglio per compilare le annotazioni di tipo in dichiarazioni di props runtime equivalenti. Ad esempio, `defineProps<{ msg: string }>` verrà compilato in `{ msg: { type: String, required: true }}`.

</div>
<div class="options-api">

::: tip Note
Tieni presente che le props vengono validate **prima** che venga creata un'istanza del componente, quindi le proprietà dell'istanza (ad es. `data`, `computed`, etc.) non saranno disponibili all'interno delle funzioni `default` o `validator`.
:::

</div>

### Verifiche dei tipi nel runtime {#runtime-type-checks}

Il `type` può essere uno dei seguenti costruttori nativi:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

Inoltre, `type` può anche essere una classe personalizzata o una funzione costruttrice e la verifica verrà effettuata con un controllo `instanceof` check. Ad esempio, data la seguente classe:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

Potresti usarla come tipo di prop:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

Vue utilizzerà  `instanceof Person` per validare se il valore della prop `author` è effettivamente un'istanza della classe `Person`.

## Conversione in Booleano {#boolean-casting}

Le props con il tipo `Boolean` hanno regole speciali di conversione per emulare il comportamento degli attributi booleani nativi. Dato un `<MyComponent>` con la seguente dichiarazione:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

Il componente può essere utilizzato in questo modo:

```vue-html
<!-- equivalente di passare :disabled="true" -->
<MyComponent disabled />

<!-- equivalente di passare :disabled="false" -->
<MyComponent />
```

Quando una prop è dichiarata per consentire più tipi, le regole di conversione per `Boolean` verranno applicate anche a essa. Tuttavia, c'è un'eccezione quando sia `String` che `Boolean` sono consentiti - la regola di conversione in booleano si applica solo se Boolean appare prima di String:

<div class="composition-api">

```js
// disabled verrà convertito in true
defineProps({
  disabled: [Boolean, Number]
})
  
// disabled verrà convertito in true
defineProps({
  disabled: [Boolean, String]
})
  
// disabled verrà convertito in true
defineProps({
  disabled: [Number, Boolean]
})
  

defineProps({
  disabled: [String, Boolean]
})
```

</div>
<div class="options-api">

```js
// disabled verrà convertito in true
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
  
// disabled verrà convertito in true
export default {
  props: {
    disabled: [Boolean, String]
  }
}
  
// disabled verrà convertito in true
export default {
  props: {
    disabled: [Number, Boolean]
  }
}
  
// disabled verrà interpretato come una stringa vuota (disabled="")
export default {
  props: {
    disabled: [String, Boolean]
  }
}
```

</div>
