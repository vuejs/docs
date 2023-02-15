# Прослуховування подій {#event-listeners}

Ми можемо слухати події DOM, використовуючи директиву `v-on`:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

Завдяки частому використанню, `v-on` також має скорочений синтаксис:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

Тут `increment` посилається на функцію, яка оголошена в секції методів:

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
      // оновлює стан компонента
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
      // оновлює стан компонента
      this.count++
    }
  }
})
```

</div>

Всередині методу ми маємо доступ до екземпляру компонента використовуючи `this`. Екземпляр компонента відкриває властивості даних оголошених в `data`. Ми можемо оновити стан компонента, змінивши ці власнивості.

</div>

<div class="composition-api">

<div class="sfc">

Тут `increment` посилається на функцію, яка оголошена в `<script setup>`:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // оновлює стан компонента
  count.value++
}
</script>
```

</div>

<div class="html">

Тут `increment` посилається на метод в об'єкті, який повертає `setup()`:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // оновлює стан компонента
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

Всередині функції ми можемо оновити стан компонента, змінивши референції.

</div>

Обробники подій також можуть використовувати вбудовані вирази та спрощувати типові завдання за допомогою модифікаторів. Ці деталі описані в <a target="_blank" href="/guide/essentials/event-handling.html">гіді з обробки подій</a>.

Тепер спробуйте самостійно реалізувати <span class="options-api">метод</span><span class="composition-api">функцію</span> `increment` і прив'язати <span class="options-api">його</span><span class="composition-api">її</span> до кнопки за допомогою `v-on`.
