# Маршрутизація {#routing}

## Клієнтська маршрутизація у порівнянні з серверною маршрутизацією {#client-side-vs-server-side-routing}

Маршрутизація на сервері реалізована таким чином, що сервер надсилає відповідь, залежно від URL, який відвідує користувач. Коли ми переходимо за посиланням, у традидійному додатку з рендерингом на стороні серверу, браузер отримує HTML у відповідь та перезавантажує всю сторінку з новим HTML.

Проте в [одно-сторінковому додатку](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA), JavaScript може перехоплювати навігацію, динамічно отримувати дані та оновлювати поточну сторінку без повного перезавантаження. Зазвичай це покращує взаємодію з користувачем, особливо для випадків використання, які більше схожі на традиційні "додатки", де користувач виконує багато взаємодій протягом тривалого часу.

У таких одно-сторінкових додатках, "маршрутизація" відбувається на стороні клієнта, в браузері. Маршрутизатор на стороні клієнта відповідає за керування відрендереним виглядом програми за допомогою API браузера, наприклад [API історії](https://developer.mozilla.org/en-US/docs/Web/API/History) або події [`hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event).

## Офіційний маршрутизатор {#official-router}

<!-- TODO оновити посилання -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="Безкоштовний курс по Vue Router">
    Перегляньте безкоштовний відеокурс у Vue School
  </VueSchoolLink>
</div>

Vue добре підходить для розробки одно-сторінкових додатків. Для більшості SPA рекомендується використовувати офіційно підтримувану бібліотеку [Vue Router](https://github.com/vuejs/router). Для додаткової інформації перегляньте [документацію Vue Router](https://router.vuejs.org/).

## Проста маршрутизація з нуля {#simple-routing-from-scratch}

Якщо вам потрібна дуже проста маршрутизація і ви не хочете використовувати повноцінну бібліотеку, ви можете це зробити за допомогою [динамічних компонентів](/guide/essentials/component-basics.html#динамічні-компоненти) і оновлювати поточний стан компонента прослуховуючи [`подію hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) або використовуючи [API історії](https://developer.mozilla.org/en-US/docs/Web/API/History).

Ось простий приклад:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Головна</a> |
  <a href="#/about">Про нас</a> |
  <a href="#/non-existent-path">Несправне посилання</a>
  <component :is="currentView" />
</template>
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U82K2zAQfpVBPTiBxOrCnkIS2ENLD6X01EvVg9aerL3EkpHkpJAEuk/QQ8+lrxAKC4Wy2Vdw3qgj2/Hmx/QQ4hl93zejb0YrdpPn4aJANmJjG5k0d2DRFflUqDTLtXGwAoOzAUQ6ywuHMWxgZnQGAZGCFvROZ9jkQ+4Dr/lyfHOrC9eeV9Ep4IN2b3Wh4hZzSDQwoSKtrANDTLQwgZVQAAEPRlXpQR1JL0ypqoBQmxdeVBiDyn2ULiEyXai3TFWsl+FcR9KlWoWJtEnfE5oDGcdvFkR5n1qHCk0v8IgokeoOgwH0+jCZ1l0caYcLOS+QKnSpU0NVgZOOPqW4JPzB3d6RrqE5GNVc+fNFldDO0wh7V31Yr70TX/z/wba61pjXI6VhUuAwy+fSIUUAYwkJ2TAR7BUXbFr+KHflX/r9Lp/K7ZjLKazPYZW7Hvtr/63cgQfuH7qhSqshfq2cc8OcWva0n+Xj/qF8JvK2KvMI5XO5o9QfqrylxNP+u5erxLwhWhEdRqklzSO7BANOoDFvL8QGrN6jYSbz8N5qRetceSiaAyvYqHbV52infCxY4lxuR5zbWeQX7d6G2txx+gpNoVxKa4w2G94avbRoSFiwatMaDU7JBZohNRajQfM/zTPoha6XpX3d0FUOz8c/ydOZJVcXg6LUuRXt8+oWOJ1eB//46XVKXL++7iBu/gFiF5uS)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">Головна</a> |
  <a href="#/about">Про нас</a> |
  <a href="#/non-existent-path">Несправне посилання</a>
  <component :is="currentView" />
</template>
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U81q20AQfpVhe5ANtraBnIRtyKGlh1J66qXbw0ZaRwrWrthd2YHY0DxBDz2XvoIpBAolzivIb9TZ1U/8I3LQz8x+830zOzP35KoowmUpSEQmJtZZYWdMZnmhtIUPKhcw1yqHIKTOcMCgO766VqXtzr11DPik7HtVyqTDtI4GxmSspLGgMVIYmMI9kwABDSIvPaot7ojR5QWY3Lg4cecFEjHn5cLWcQm3fDCs/wG0sKWWrQUQl1oLaT9zm0awymSiVuFCxdxmSoYpN2kNRHZ8eeVY5QXmlUQtSUPxJROrF51OqS7iq00zEx6IhWaRxWJwMYT12pX2zX3bezjTzNGLki/0TaY8Sd4tkfFjZqyQQg8Cl3KccnkjghEgfjpzIcwyC3CaA95sf8UOvhl6eX+xE9qNABpW5MWCW4EWwIRDqsV8ysgbysis+lntqn/4/Kmequ2E8hmsT2G+cQ77e/+92oED7h/6oVLJsbjzxdlxgSm7sF/V4/6hesbgrZd5hOq52qHrLypv0fG0/+HoPJnrlpIYDlFmkPOgWYwARdCEdgWREalHdJzzIrw1SuL4+xtnzYFhpOs7IziuzmYktbYwEaVmHrsZvjWh0jcU/0KNjctwQ4TJx9darYzQSMyIb2vDQdG5FHqMiSVCC/0a5wn0jLdtGpbSbqZb4eOepRdnjULX6VV0m9tPcNy9nvjDre6luHx72RO4+Q9GqaXv)

</div>
