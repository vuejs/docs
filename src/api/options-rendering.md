# Опції: Рендеринг {#options-rendering}

## template

Рядок шаблону для компонента.

- **Тип**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **Подробиці**

  Шаблон, наданий за допомогою параметра `template`, буде скомпільовано на льоту під час виконання. Він підтримується лише під час використання збірки Vue, яка включає компілятор шаблонів. Компілятор шаблону **НЕ** включено до збірок Vue, у назвах яких є слово «runtime», напр. `vue.runtime.esm-bundler.js`. Зверніться до [гіда файлів комплекту](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use), щоб дізнатися більше про різні збірки.

  Якщо рядок починається з `#`, він використовуватиметься як `querySelector` і використовуватиме `innerHTML` вибраного елемента як рядок шаблону. Це дозволяє створювати вихідний шаблон за допомогою власних елементів `<template>`.

  Якщо параметр `render` також присутній у тому самому компоненті, `template` ігноруватиметься.

  Якщо в кореневому компоненті вашого застосунку не вказано параметри `template` або `render`, Vue замість цього спробує використати `innerHTML` змонтованого елемента як шаблон.

  :::warning Примітка безпеки
  Використовуйте лише джерела шаблонів, яким можна довіряти. Не використовуйте вміст, наданий користувачами, як шаблон. Додаткову інформацію див. у [Гіді безпеки](/guide/best-practices/security.html#rule-no-1-never-use-non-trusted-templates).
  :::

## render

Функція, яка програмно повертає віртуальне дерево DOM компонента.

- **Тип**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **Подробиці:**

  `render` — це альтернатива рядку шаблонів, яка дає змогу використовувати всю програмну потужність JavaScript, щоб оголосити результат рендерингу компонента.

  Попередньо скомпільовані шаблони, наприклад ті, що містяться в одно-файлових компонентах, компілюються в параметр `render` під час збірки. Якщо в компоненті присутні `render` і `template`, `render` матиме вищий пріоритет.

- **Також до вашої уваги:**
  - [Механізм рендерингу](/guide/extras/rendering-mechanism.html)
  - [Функції рендерингу](/guide/extras/render-function.html)

## compilerOptions

Налаштування параметрів компілятора під час виконання для шаблону компонента.

- **Тип**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // за промовчанням: 'condense'
      delimiters?: [string, string] // за промовчанням: ['{{', '}}']
      comments?: boolean // за промовчанням: false
    }
  }
  ```

- **Подробиці**

  Цей параметр конфігурації застосовується лише під час використання повної збірки (тобто окремого `vue.js`, який може компілювати шаблони у браузері). Він підтримує ті самі параметри, що й [app.config.compilerOptions](/api/application.html#app-config-compileroptions) на рівні застосунку, і має вищий пріоритет для поточного компонента.

- **Також до вашої уваги:** [app.config.compilerOptions](/api/application.html#app-config-compileroptions)
