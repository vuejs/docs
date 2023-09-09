# Rendering di liste {#list-rendering}

Possiamo utilizzare la direttiva `v-for` per renderizzare una lista di elementi basati su un array di origine:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Qui `todo` è una variabile locale che rappresenta l'elemento dell'array attualmente in iterazione. È accessibile solo all'interno dell'elemento `v-for`, in modo simile allo scope di una funzione.

Da notare come stiamo assegnando a ogni oggetto todo un `id` univoco, e facendo il binding come <a target="_blank" href="/api/built-in-special-attributes.html#key">attributo speciale `key` </a> per ciascun `<li>`. L'uso di `key` permette a Vue di spostare con precisione ciascun `<li>` in modo tale da farlo corrispondere alla posizione del suo oggetto corrispondente nell'array.

Ci sono due modi per aggiornare la lista:

1. Chiamare dei [mutating methods](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) sull'array di origine:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

2. Sostituire l'array con uno nuovo:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

Qui abbiamo un semplice elenco di cose da fare (todo list): prova a implementare la logica dei metodi `addTodo()` e `removeTodo()` per farlo funzionare!

Maggiori dettagli su `v-for`: <a target="_blank" href="/guide/essentials/list.html">Guida - Il Rendering delle Liste</a>
