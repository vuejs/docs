# Provide / Inject {#provide-inject}

> Подразумевается, что вы уже изучили и разобрались с разделом [Основы компонентов](/guide/essentials/component-basics). Если нет — прочитайте его сначала.

## Пробрасывание входных параметров {#prop-drilling}

Обычно для передачи данных от родительского компонента в дочерний используются [входные параметры](/guide/components/props). Представьте структуру, в которой будет несколько глубоко вложенных компонентов и потребуется что-то от родительского компонента в глубоко вложенном дочернем. В таком случае необходимо передавать входные параметры вниз по всей цепочке компонентов, что может быть очень неудобным.

![Диаграмма пробрасывания входных параметров](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

Обратите внимание, хотя компоненту `<Footer>` не нужны входные параметры, ему все равно необходимо объявить и передать их, чтобы `<DeepChild>` мог получить к ним доступ. Если есть более длинная родительская цепочка, по пути будет затронуто больше компонентов. Это называется "пробрасывание входных параметров", и с этим определенно не весело иметь дело.

В таких случаях можно использовать пару `provide` и `inject`. Родительские компоненты могут служить **провайдерами зависимостей** для всех своих потомков. Любой компонент в дереве-потомке, независимо от его глубины, может **внедрить** зависимости, предоставляемые компонентами, расположенными выше в его родительской цепочке.

![Схема provide/inject](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## Provide {#provide}

<div class="composition-api">

Чтобы предоставить данные потомкам компонента, используйте функцию [`provide()`](/api/composition-api-dependency-injection.html#provide):

```vue
<script setup>
import { provide } from 'vue'

provide(/* ключ */ 'message', /* значение */ 'привет!')
</script>
```

Если не используется `<script setup>`, убедитесь, что функция `provide()` вызывается синхронно внутри функции `setup()`:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* ключ */ 'message', /* значение */ 'привет!')
  }
}
```

Функция `provide()` принимает два аргумента. Первый аргумент называется **ключом инъекции**, который может быть строкой или `Symbol`. Ключ инъекции используется компонентами-потомками для поиска нужного значения для инъекции. Один компонент может вызывать функцию `provide()` несколько раз с разными ключами инъекции для получения различных значений.

Вторым аргументом является предоставляемое значение. Значение может быть любого типа, включая реактивное состояние, такое как refs:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

Предоставление реактивных значений позволяет компонентам-потомкам, использующим предоставленное значение, устанавливать реактивное соединение с компонентом-провайдером.

</div>

<div class="options-api">

Чтобы предоставить данные потомкам компонента, используйте опцию [`provide`](/api/options-composition.html#provide):

```js
export default {
  provide: {
    message: 'привет!'
  }
}
```

Для каждого свойства в объекте `provide`, ключ используется дочерними компонентами для поиска нужного значения для инъекции, а значение - это то, что в итоге будет инъецировано.

Если нам нужно предоставить состояние для каждого экземпляра, например, данные, объявленные с помощью `data()`, тогда `provide` должен использовать значение функции:

```js{7-12}
export default {
  data() {
    return {
      message: 'привет!'
    }
  },
  provide() {
    // используйте синтаксис функции, чтобы получить доступ к `this`
    return {
      message: this.message
    }
  }
}
```

Однако следует иметь в виду, что это **не делает инъекцию реактивной**. О том, как [сделать инъекции реактивными](#working-with-reactivity) мы поговорим ниже.

</div>

## Предоставление на уровне приложения {#app-level-provide}

Помимо предоставления данных в компоненте, мы также можем предоставлять их на уровне приложения:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* ключ */ 'message', /* значение */ 'привет!')
```

Предоставление на уровне приложения доступно для всех компонентов, отображаемых в приложении. Это особенно полезно при написании [плагинов](/guide/reusability/plugins.html), поскольку плагины обычно не могут предоставлять значения с использованием компонентов.

## Inject {#inject}

<div class="composition-api">

Для инъекции данных, предоставляемых компонентом-предком, используйте функцию [`inject()`](/api/composition-api-dependency-injection.html#inject):

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

Если предоставленное значение является ref, то оно будет внедрено как есть и **не будет автоматически разворачиваться**. Это позволяет компоненту-инжектору сохранять реактивную связь с компонентом-провайдером.

[Полный пример provide + inject с реактивностью](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuLy8gYnkgcHJvdmlkaW5nIGEgcmVmLCB0aGUgR3JhbmRDaGlsZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaGFwcGVuaW5nIGhlcmUuXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG5wcm92aWRlKCdtZXNzYWdlJywgbWVzc2FnZSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiPlxuICA8Q2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNoaWxkLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgR3JhbmRDaGlsZCBmcm9tICcuL0dyYW5kQ2hpbGQudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBtZXNzYWdlID0gaW5qZWN0KCdtZXNzYWdlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPlxuICAgIE1lc3NhZ2UgdG8gZ3JhbmQgY2hpbGQ6IHt7IG1lc3NhZ2UgfX1cbiAgPC9wPlxuPC90ZW1wbGF0ZT4ifQ==)

Опять же, если не используется `<script setup>`, то `inject()` следует вызывать синхронно только внутри `setup()`:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

Для инъекции данных, предоставляемых компонентом-предком, используйте опцию [`inject`](/api/options-composition.html#inject):

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // внедрённое значение
  }
}
```

Инъекции разрешаются **раньше**, чем собственное состояние компонента, поэтому к внедрённым свойствам можно обращаться в `data()`:

```js
export default {
  inject: ['message'],
  data() {
    return {
      // исходные данные на основе внедрённого значения
      fullMessage: this.message
    }
  }
}
```

[Полный пример provide + inject](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENoaWxkIH0sXG4gIHByb3ZpZGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

### Внедрение псевдонимов \* {#injection-aliasing}

При использовании синтаксиса массива для `inject`, внедряемые свойства отображаются в экземпляре компонента с использованием того же ключа. В приведенном примере свойство было предоставлено под ключом `"message"`, и внедряется как `this.message`. Локальный ключ совпадает с ключом инъекции.

Если мы хотим внедрить свойство с использованием другого локального ключа, то необходимо использовать объектный синтаксис для опции `inject`:

```js
export default {
  inject: {
    /* локальный ключ */ localMessage: {
      from: /* внедряемый ключ */ 'message'
    }
  }
}
```

Здесь компонент найдет свойство с ключом `"message"`, а затем выставит его как `this.localMessage`.

</div>

### Значения по умолчанию для инъекций {#injection-default-values}

По умолчанию, `inject` предполагает, что инжектируемый ключ предоставлен где-то в родительской цепочке.  В случае, если ключ не предоставлен, будет выдано предупреждение.

Если мы хотим, чтобы инжектируемое свойство работало с необязательными провайдерами, нам необходимо объявить значение по умолчанию, аналогично входным параметрам:

<div class="composition-api">

```js
// `value` будет "значением по умолчанию"
// если данные, соответствующие "message", не были предоставлены
const value = inject('message', 'default value')
```

В некоторых случаях значение по умолчанию может потребоваться создать путем вызова функции или инстанцирования нового класса. Чтобы избежать лишних вычислений или побочных эффектов в случае, если необязательное значение не используется, мы можем использовать фабричную функцию для создания значения по умолчанию:

```js
const value = inject('key', () => new ExpensiveClass())
```

</div>

<div class="options-api">

```js
export default {
  // необходим синтаксис объекта
  // при объявлении значений по умолчанию для инъекций
  inject: {
    message: {
      from: 'message', // это необязательно, если для инъекций используется один и тот же ключ
      default: 'default value'
    },
    user: {
      // используйте фабричную функцию для непримитивных значений, которые дороги
      // для создания или те, которые должны быть уникальными для каждого экземпляра компонента.
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

## Работа с реактивностью {#working-with-reactivity}

<div class="composition-api">

При использовании реактивных значений provide / inject, **рекомендуется по возможности хранить любые мутации реактивного состояния внутри _провайдера_**. Это гарантирует, что предоставляемое состояние и его возможные мутации будут находиться в одном компоненте, что облегчает их поддержку в будущем.

Бывают случаи, когда необходимо обновить данные из компонента-инжектора. В таких случаях рекомендуется предоставлять функцию, отвечающую за мутацию состояния:

```vue{7-9,13}
<!-- внутри компонента провайдер -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- в компоненте injector -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

Наконец, вы можете обернуть предоставленное значение с помощью [`readonly()`](/api/reactivity-core.html#readonly), если хотите гарантировать, что данные, переданные через `provide`, не могут быть изменены инжектируемым компонентом.

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

Чтобы сделать инъекции реактивно связанной с провайдером, нам нужно предоставить вычисляемое свойство с помощью функции [computed()](/api/reactivity-core.html#computed):

```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'привет!'
    }
  },
  provide() {
    return {
      // явно указываем вычисляемое свойство
      message: computed(() => this.message)
    }
  }
}
```

[Полный пример provide + inject с реактивностью](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ2hpbGQgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJ2hlbGxvJ1xuICAgIH1cbiAgfSxcbiAgcHJvdmlkZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogY29tcHV0ZWQoKCkgPT4gdGhpcy5tZXNzYWdlKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGlucHV0IHYtbW9kZWw9XCJtZXNzYWdlXCI+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

Функция `computed()` обычно используется в компонентах Composition API, но ее также можно использовать для дополнения определенных вариантов использования в Options API. Вы можете узнать больше о его использовании, прочитав [Основы реактивности](/guide/essentials/reactivity-fundamentals.html) и [Вычисляемые свойства](/guide/essentials/computed.html) с переключателем API Preference, установленным на Composition API.

:::warning Временно требуется дополнительная конфигурация
Приведенное выше использование требует установки `app.config.unwrapInjectedRef = true`, чтобы инъекции автоматически разворачивали вычисленные ссылки. Это станет поведением по умолчанию в Vue 3.3, и данный конфиг введен временно, чтобы избежать поломок. После версии 3.3 он больше не потребуется.
:::

</div>

## Работа с символьными ключами {#working-with-symbol-keys}

До сих пор в примерах мы использовали ключи инъекции строк. Если вы работаете в большом приложении с большим количеством поставщиков зависимостей или создаете компоненты, которые будут использоваться другими разработчиками, лучше всего использовать ключи инъекции символов, чтобы избежать возможных коллизий.

Рекомендуется экспортировать символы в отдельный файл:

```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// в компоненте provider
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* данные для предоставления */
})
```

```js
// в компоненте injector
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

См. также: [Типизация Provide / Inject](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// в компоненте provider
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* данные для предоставления */
      }
    }
  }
}
```

```js
// в компоненте injector
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
