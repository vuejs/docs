# Глобальний API: Загальне {#global-api-general}

## version {#version}

Показує поточну версію Vue.

- **Тип:** `string`

- **Приклад**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

Утиліта для очікування наступного оновлення DOM.

- **Тип**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Подробиці**

  Коли ви змінюєте реактивний стан у Vue, отримані оновлення DOM не застосовуються синхронно. Натомість Vue буферизує їх до «наступного тіка», щоб гарантувати, що кожен компонент оновлюється лише один раз, незалежно від того, скільки змін стану ви зробили.

  `nextTick()` можна використовувати одразу після зміни стану, щоб дочекатися завершення оновлення DOM. Ви можете або передати функцію зворотного виклику як аргумент, або дочекатися поверненого Promise.

- **Приклад**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM ще не оновлено
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM оновлено
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM ще не оновлено
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM оновлено
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **Також до вашої уваги:** [`this.$nextTick()`](/api/component-instance.html#nexttick)

## defineComponent() {#definecomponent}

Помічник типу для визначення компонента Vue за допомогою визначення типу.

- **Тип**

  ```ts
  function defineComponent(
    component: ComponentOptions | ComponentOptions['setup']
  ): ComponentConstructor
  ```

  > Тип спрощено для зручності читання.

- **Подробиці**

  Перший аргумент очікує об’єкт параметрів компонента. Поверненим значенням буде той самий об’єкт параметрів, оскільки функція, по суті, є безопераційною під час виконання і потрібна лише для визначення типу.

  Зверніть увагу, що тип поверненого значення є дещо особливим: це буде тип конструктора, тип екземпляра якого є виведеним типом екземпляра компонента на основі параметрів. Це використовується для визначення типу, коли повернутий тип використовується як тег у TSX.

  Ви можете витягнути тип екземпляра компонента (еквівалентний типу `this` у його параметрах) із типу поверненого значення `defineComponent()` наступним чином:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Примітка щодо "Струшування дерева" {#note-on-webpack-treeshaking}

  Оскільки `defineComponent()` є викликом функції, це може виглядати так, ніби це спричинить побічні ефекти для деяких інструментів збірки, напр. webpack. Це запобіжить струшування компонента, навіть якщо компонент ніколи не використовується.

  Щоб повідомити webpack, що цей виклик функції безпечний для обробки дерева, ви можете додати анотацію коментаря `/*#__PURE__*/` перед викликом функції:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Зауважте, що це не обов'язково робити, якщо ви використовуєте Vite, оскільки Rollup (основний продакшн комплектувальник, який використовує Vite) достатньо розумний, щоб визначити, що `defineComponent()` насправді не має побічних ефектів і не потребує ручних анотацій.

- **Також до вашої уваги:** [Гід - Використання Vue з TypeScript](/guide/typescript/overview.html#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

Визначає асинхронний компонент, який відкладено завантажується лише під час рендерингу. Аргумент може бути або функцією завантажувача, або об'єктом параметрів для більш розширеного керування поведінкою завантаження.

- **Тип**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **Також до вашої уваги:** [Гід - Асинхронні компоненти](/guide/components/async.html)

## defineCustomElement() {#definecustomelement}

Цей метод приймає той самий аргумент, що й [`defineComponent`](#definecomponent), але натомість повертає рідний конструктор класу [користувацького елемента](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

- **Тип**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > Тип спрощено для зручності читання.

- **Подробиці**

  Окрім звичайних параметрів компонента, `defineCustomElement()` також підтримує спеціальну опцію `styles`, яка має бути масивом вбудованих рядків CSS, для надання CSS, який слід вставити в тіньовий корінь елемента.

  Значення, що повертається, є власним конструктором елемента, який можна зареєструвати за допомогою [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **Приклад**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* параметри компонента */
  })

  // Реєстрація користувацького елемента.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **Також до вашої уваги:**

  - [Гід - Створення власних елементів за допомогою Vue](/guide/extras/web-components.html#building-custom-elements-with-vue)

  - Також зауважте, що `defineCustomElement()` вимагає [спеціальної конфігурації](/guide/extras/web-components.html#sfc-as-custom-element) при використанні з однофайловими компонентами.
