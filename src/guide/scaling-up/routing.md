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

Якщо вам потрібна дуже проста маршрутизація і ви не хочете використовувати повноцінну бібліотеку, ви можете це зробити за допомогою [динамічних компонентів](/guide/essentials/component-basics#dynamic-components) і оновлювати поточний стан компонента прослуховуючи [`подію hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) або використовуючи [API історії](https://developer.mozilla.org/en-US/docs/Web/API/History).

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNptUs1qwkAQfpUhPSSCTSp4kih4aOmhlJ56aXrYJmsTMLths9GCCvUJeui59BWkIBSK+grrG3U2akw0hxBm9vvZ+XYmRj9J7FFGjY7hpr6IEgkplVnS81gUJ1xImICggyb4PE4ySQOYwUDwGEwkmQXolsd037cdXWjN43H/hWeyOM+rKuCeyxuesaDAHBp7mMd8zlIJApk0hS5MPAZgOmYnt27uKqKFsZUbeGx25PmZEJTJByJDJONA1jhiAR/bQ+4TGXFmhyQNG5qwPyBBcD1Cyl2USsqosEyN8EPCXqnZBKsB3d7uFiVte0SGGUWHOnW8UG5QudFjRMeIP6RrlXQFvoNg+5GfzlzsdBj51Go1YDrVSTzr/yG2nZfr7J4UHxMLSeNkSCTFCsAlEGIMXc+4cDyjpz7VWv3h96NWauE6pAfTU1iersZ+b9/VGjRwO6+HMs4u6VuenLxM8Mqa9qWW27naIHmR2yxBbdQaW7/ovMDGavuh5XIxHQhnSIdOlKJmKS7PAAdBrlMMZDSNw87pPa4OGrbOpsPWKb/YyXqB6sg1/PK+1kq0r9o1xNk/GwRVLQ==)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNptU81q20AQfpVBPcgGR2ogJyEbcmjpoZSeeun2sJXW1YK1K1ajOBAbmifooefSVzCBQCDEeYX1G2V2ZSm2o4N+ZvT9zLe7ugkuqyq6akSQBGmdGVnhjClZVtogfNKlgLnRJYRR7AoHDPvPlz91g/13Xx0Dvmj8qBuV95iusYcxlWlVIxhiihqmcMMUQBiHibeetBV3wtTyBkytHU9ce4NczHmzwJaXc+SjcfsOYAQ2RnUVQNYYIxR+5VgksJQq18tooTOOUquo4HXRAkmdbt4502VFc+VJJ7KX+CbF8tWnd2pDfMdC1tGBWVQvZCZG52NYrVy0H+7ZrcMbz5K6ZPkqv5+U5/mHK1L8LGsUSphR6EbOCq5+iXAChJ/OHIUhQ4DTGWhlhxM7+Hrs7f3CpnF/BKhAUVYLjoIqgJRDYcR8yoJ3MQtm9q/d2ke67uyT3aQxn8HqFOY3zmH/737bLTjg7nYYqrQ6E9c+HJ5VNLKj/bP3u1v7TOSNt7kH+2y31Hog5w01nnZ/nJwXc7ulFdEhkTVpHmwWCyAmUBr3gYJJ0B1nd+6Pgxbnb9JR65TfH/dhgePIA/zDX2FQ4uL9xQBx/QLHUF+K)

</div>
