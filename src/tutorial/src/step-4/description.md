# Слушатели событий {#event-listeners}

Мы можем прослушивать события DOM, используя директиву `v-on`:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

Из-за его частого использования `v-on` также имеет сокращенный синтаксис:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

Здесь `increment` ссылается на функцию, объявленную с использованием опции `methods`:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // обновление состояния компонента
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // обновление состояния компонента
      this.count++
    }
  }
})
```

</div>

Внутри метода можно получить доступ к экземпляру компонента, используя `this`. Экземпляр компонента раскрывает свойства данных, объявленные в `data`. Можно обновлять состояние компонента, изменяя эти свойства.

</div>

<div class="composition-api">

<div class="sfc">

Здесь `increment` ссылается на функцию, объявленную в `<script setup>`:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // обновление состояния компонента
  count.value++
}
</script>
```

</div>

<div class="html">

Здесь `increment` ссылается на метод в объекте, возвращенном из `setup()`:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // обновление состояния компонента
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

Внутри функции мы можем обновить состояние компонента, изменив ссылки.

</div>

Обработчики событий также могут использовать встроенные выражения и могут упростить общие задачи с помощью модификаторов. Эти подробности рассматриваются в <a target="_blank" href="/guide/essentials/event-handling.html">Руководстве - Обработка событий</a>.

Теперь попробуйте самостоятельно реализовать `increment` <span class="options-api">метод</span><span class="composition-api">функцию</span> и привязать ее к кнопке с помощью `v-on`.
