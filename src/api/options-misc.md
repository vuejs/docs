# Опції: Різне {#options-misc}

## name {#name}

Явне оголошення відображуваного імені компонента.

- **Тип**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **Подробиці**

  Ім'я компонента використовується для наступного:

  - Рекурсивне само посилання у власному шаблоні компонента
  - Відображення в дереві перевірки компонентів Vue DevTools
  - Відображення в попередженнях при трасуванні компонентів

  Коли ви використовуєте одно-файлові компоненти, компонент уже визначає свою назву з назви файлу. Наприклад, файл із назвою `MyComponent.vue` матиме передбачувану відображувану назву "MyComponent".

  Інший випадок полягає в тому, що коли компонент зареєстровано глобально за допомогою [`app.component`](/api/application.html#app-component), глобальний ідентифікатор автоматично встановлюється як його ім’я.

  Параметр `name` дозволяє вам замінити виведене ім’я або явно вказати ім’я, якщо ім’я не може бути виведено (наприклад, коли не використовуються інструменти збірки або вбудований компонент, що не є одно-файловим компонентом).

  Є один випадок, коли `name` є явно необхідним: під час зіставлення з кешованими компонентами в [`<KeepAlive>`](/guide/built-ins/keep-alive.html) через його реквізити `include / exclude`.

  :::tip Примітка
  Починаючи з версії 3.2.34, одно-файловий компонент, який використовує `<script setup>`, автоматично визначатиме свій параметр `name` на основі імені файлу, усуваючи потребу вручну оголошувати назву, навіть якщо використовується з `<KeepAlive>`.
  :::

## inheritAttrs {#inheritattrs}

Контролює, чи слід увімкнути прохідну поведінку компонента за промовчуванням.

- **Тип**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // за промовчанням: true
  }
  ```

- **Подробиці**

  За промовчуванням, прив'язки атрибутів батьківської області, які не розпізнаються як реквізити є "прохідними". Це означає, що коли у нас є однокореневий компонент, ці прив'язки будуть застосовані до кореневого елемента дочірнього компонента як звичайні атрибути HTML. Під час створення компонента, який є обгорткою для цільового елемента або іншого компонента, це не завжди може бути бажаною поведінкою. Встановивши для `inheritAttrs` значення `false`, цю поведінку за промовчанням можна вимкнути. Атрибути доступні через властивість екземпляра `$attrs` і можуть бути явно пов'язані з некореневим елементом за допомогою `v-bind`.

- **Приклад**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  При оголошенні цього параметра в компоненті, який використовує `<script setup>`, потрібен окремий блок `<script>`:

  ```vue
  <script>
  export default {
    inheritAttrs: false
  }
  </script>

  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **Також до вашої уваги:** [Прохідні атрибути](/guide/components/attrs.html)

## components {#components}

Об’єкт, який реєструє компоненти, які будуть доступні для екземпляра компонента.

- **Тип**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **Приклад**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // скорочення
      Foo,
      // зареєструватися під іншим ім'ям
      RenamedBar: Bar
    }
  }
  ```

- **Також до вашої уваги:** [Реєстрація компонентів](/guide/components/registration.html)

## directives {#directives}

Об’єкт, який реєструє директиви, які будуть доступні для екземпляра компонента.

- **Тип**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **Приклад**

  ```js
  export default {
    directives: {
      // вмикає v-focus у шаблоні
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

  Хеш директив, які будуть доступні для екземпляра компонента.

- **Також до вашої уваги:** [Користувацькі директиви](/guide/reusability/custom-directives.html)
