# Поддержка TypeScript

> [Vue CLI](https://cli.vuejs.org/ru/) предоставляет поддержку TypeScript из коробки.

## Официальные декларации в npm-пакетах

Статическая система типов может помочь предотвратить многие возможные ошибки по мере роста приложения, поэтому Vue 3 написан на TypeScript. Это значит, что для использования TypeScript с Vue не требуется никаких дополнительных инструментов — он уже поставляется с отличной поддержкой.

## Рекомендованная конфигурация

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    // включает более строгий вывод о свойствах данных в `this`
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

Обратите внимание, что необходимо включать `strict: true` (или хотя бы `noImplicitThis: true`, который является частью флага `strict`) для проверки `this` в методах компонента, потому что иначе он всегда будет рассматриваться как тип `any`.

Подробнее можно изучить в [документации настроек компилятора TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.md).

## Инструментарий для разработки

### Создание проекта

[Vue CLI](https://github.com/vuejs/vue-cli) может создавать новые проекты, которые будут использовать TypeScript:

```bash
# 1. Устанавливаем Vue CLI, если ещё не установлен
npm install --global @vue/cli

# 2. Создаём новый проект, затем выбираем опцию "Manually select features"
vue create my-project-name

# Если есть проект Vue CLI без TypeScript, то добавляем плагин для Vue CLI:
vue add typescript
```

Убедитесь, что в секции `script` компонента в качестве языка указан TypeScript:

```html
<script lang="ts">
  ...
</script>
```

### Поддержка редакторов

Для разработки приложений Vue на TypeScript настоятельно рекомендуем использовать [Visual Studio Code](https://code.visualstudio.com/), которая предоставляет отличную поддержку TypeScript из коробки. Если используете [однофайловые компоненты](single-file-component.md) (SFC), то установите [расширение Vetur](https://github.com/vuejs/vetur), которое добавит вывод типов TypeScript внутри SFC и множество других замечательных возможностей.

[WebStorm](https://www.jetbrains.com/webstorm/) также предоставляет готовую поддержку как для TypeScript, так и для Vue.

## Определение компонентов Vue

Для корректного вывода типов TypeScript внутри опций компонентов Vue необходимо определять компоненты с помощью глобального метода `defineComponent`:

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  // вывод типов работает
})
```

## Использование с Options API

TypeScript умеет определять большинство типов без их явного определения. Например, если есть компонент со свойством `count`, то получите ошибку при попытке вызывать метод для строк на этом свойстве:

```ts
const Component = defineComponent({
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    const result = this.count.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

Для сложных типов или интерфейсов можно привести его в соответствие с помощью [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions):

```ts
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})
```

### Аннотация возвращаемых типов

Из-за цикличной природы файлов деклараций Vue, TypeScript может испытывать трудности с выводом типа вычисляемых свойств. По этой причине может потребоваться аннотировать возвращаемый тип вычисляемых свойств.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // требуется аннотация
    greeting(): string {
      return this.message + '!'
    }

    // при наличии сеттера, геттер должен быть аннотирован
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase();
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase();
      },
    },
  }
})
```

### Аннотация входных параметров

Vue валидирует входные параметры по указанному `type` в runtime. Чтобы передать эти типы в TypeScript необходимо привести конструктор с помощью `PropType`:

```ts
import { defineComponent, PropType } from 'vue'

interface ComplexMessage {
  title: string
  okMessage: string
  cancelMessage: string
}
const Component = defineComponent({
  props: {
    name: String,
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    message: {
      type: Object as PropType<ComplexMessage>,
      required: true,
      validator(message: ComplexMessage) {
        return !!message.title
      }
    }
  }
})
```

Если обнаружили, что валидатор не получает вывод типов или автокомплит по свойствам не работает, аннотация аргумента с ожидаемым типом может помочь решить эту проблему.

## Использование с Composition API

Для функции `setup()` нет необходимости указывать типы параметру `props`, так как это будет выводить типы из опции компонента `props`.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const result = props.message.split('') // корректно, тип 'message' будет строка
    const filtered = props.message.filter(p => p.value) // произойдёт ошибка: Property 'filter' does not exist on type 'string'
  }
})
```

### Типы `ref`

Ref-ссылки получают вывод типа из исходного значения:

```ts
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  setup() {
    const year = ref(2020)

    const result = year.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

Иногда может потребоваться указать сложный тип для внутреннего значения ref-ссылки. Это можно сделать передав общий аргумент при вызове ссылки для переопределения вывода типа по умолчанию:

```ts
const year = ref<string | number>('2020') // тип year: Ref<string | number>

year.value = 2020 // ok!
```

:::tip Примечание
Если тип generic неизвестен, рекомендуется приводить `ref` к `Ref<T>`.
:::

### Типы `reactive`

При типизации свойства `reactive` можно использовать интерфейсы:

```ts
import { defineComponent, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // ИЛИ
    const book: Book = reactive({ title: 'Vue 3 Guide' })
    // ИЛИ
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

### Типы `computed`

Вычисляемые свойства будут автоматически получать тип из возвращаемого значения:

```ts
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CounterButton',
  setup() {
    let count = ref(0)

    // только для чтения
    const doubleCount = computed(() => count.value * 2)

    const result = doubleCount.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```
