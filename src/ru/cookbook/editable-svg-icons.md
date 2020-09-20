# Редактируемая система SVG-иконок

## Простой пример

Существуют множество способов создания системы SVG-иконок (SVG Icon System), но один из методов, который использует возможности Vue, — это создание редактируемых встроенных иконок в виде компонентов. Некоторые из преимуществ такого подхода:

- Их легко редактировать «на лету»
- Они анимируются
- Вы можете использовать обычные входные параметры и значения по умолчанию для сохранения стандартного размера или изменения их, если это нужно
- Они встраиваемые, поэтому HTTP-запросы не требуются
- Они могут быть доступны динамически

Сначала мы создадим каталог для всех иконок и назовём их в стандартизированном подходе для облегчения их поиска:

> `components/icons/IconBox.vue`
> `components/icons/IconCalendar.vue`
> `components/icons/IconEnvelope.vue`

Вот репозиторий с примером для начала работы, где вы увидите готовую настройку: [https://github.com/sdras/vue-sample-svg-icons/](https://github.com/sdras/vue-sample-svg-icons/)

![Сайт документации](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/screendocs.jpg 'Пример документации')

Мы создадим компонент базовой иконки (`IconBase.vue`), который использует слот.

```html
<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title
      :id="iconName"
      lang="en"
    >{{iconName}} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>
```

Вы можете использовать эту базовую иконку как есть, однако вам нужно обновить `viewBox` в зависимости от `viewBox` ваших иконок. В базовом компоненте мы устанавливаем `width`, `height`, `iconColor` и имя иконки как входные данные так, что он может динамически обновляться. Имя используется как для содержимого `<title>`, так и для его `id` для лучшей доступности.

Наш скрипт будет выглядеть следующим образом: у нас будут некоторые значения по умолчанию, поэтому иконка будет отрисовываться всегда одинаково, пока мы не изменим её:

```js
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
```

Свойство `currentColor`, заданное по умолчанию используется для цвета иконки, заставит иконку наследовать цвет любого окружающего текста. Мы также можем передать другой цвет во входные данные, если захотим.

Мы можем использовать его следующим образом, с единственным содержимым `IconWrite.vue`, содержащим пути внутри иконок:

```html
<icon-base icon-name="write"><icon-write /></icon-base>
```

Теперь, если мы захотим несколько иконок с различными размерами, это сделать довольно просто:

```html
<p>
  <!-- вы можете передать меньшую `width` и `height` во входные данные -->
  <icon-base
    width="12"
    height="12"
    icon-name="write"
  ><icon-write /></icon-base>
  <!-- или вы можете использовать значение по умолчанию, которое равно 18 -->
  <icon-base icon-name="write"><icon-write /></icon-base>
  <!-- или также сделать её немного больше :) -->
  <icon-base
    width="30"
    height="30"
    icon-name="write"
  ><icon-write /></icon-base>
</p>
```

<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/Screen%20Shot%202018-01-01%20at%204.51.40%20PM.png" width="450" />

## Анимируемые иконки

Хранение иконок в компонентах очень удобно, когда вы хотите их анимировать, особенно при взаимодействии. Встроенные SVG-иконки имеют самую высокую поддержку для какого-либо взаимодействия. Ниже очень простой пример иконки, которая анимируется при клике:

```vue
<template>
  <svg
    @click="startScissors"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    aria-labelledby="scissors"
    role="presentation"
  >
    <title
      id="scissors"
      lang="en"
    >
      Анимированная иконка с ножницами
    </title>
    <path
      id="bk"
      fill="#fff"
      d="M0 0h100v100H0z"
    />
    <g ref="leftscissor">
      <path d="M..."/>
      ...
    </g>
    <g ref="rightscissor">
      <path d="M..."/>
      ...
    </g>
  </svg>
</template>
```

```js
import { TweenMax, Sine } from 'gsap'

export default {
  methods: {
    startScissors() {
      this.scissorAnim(this.$refs.rightscissor, 30)
      this.scissorAnim(this.$refs.leftscissor, -30)
    },
    scissorAnim(el, rot) {
      TweenMax.to(el, 0.25, {
        rotation: rot,
        repeat: 3,
        yoyo: true,
        svgOrigin: '50 45',
        ease: Sine.easeInOut
      })
    }
  }
}
```

Мы применяем `refs` для группы путей, которые нам нужно переместить, и по мере того, как обе стороны ножниц должны перемещаться вместе, мы создаём функцию, которую повторно используем при обращении к `refs`. Использование GreenSock помогает разрешить поддержку анимации и проблемы с `transform-origin` во всех браузерах.

<p data-height="300" data-theme-id="0" data-slug-hash="dJRpgY" data-default-tab="result" data-user="Vue" data-embed-version="2" data-pen-title="Editable SVG Icon System: Animated icon" class="codepen">Смотрите Pen <a href="https://codepen.io/team/Vue/pen/dJRpgY/">Editable SVG Icon System: Animated icon</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>) на сайте <a href="https://codepen.io">CodePen</a>.</p><script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<p style="margin-top:-30px">Довольно легко сделано! И легко обновлять «на лету».</p>

Вы можете посмотреть больше анимационных примеров в [репозитории](https://github.com/sdras/vue-sample-svg-icons/)

## Дополнительные замечания

Дизайнеры могут поменять своё мнение. Требования продукта измениться. Сохранение всей логики системы иконок в одном базовом компоненте означает, что вы можете быстро обновить все ваши иконки и распространить их по всему приложению. Даже при использовании загрузчика иконок, некоторые ситуации требуют пересоздания или редактирования каждой SVG-иконки при глобальных изменениях. Этот метод поможет сэкономить время и уменьшить боль.

## Когда не следует этого делать

Эта система SVG-иконок действительно полезна, когда у вас есть несколько иконок, которые используются по-разному на всём сайте. Если вы дублируете одну и ту же иконку много раз на одной странице (например, во всех строках гигантской таблицы в качестве иконки удаления), может имеет больше смысла сделать спрайты, скомпилированные в лист спрайта, и использовать теги `<use>` для их загрузки.

## Альтернативные варианты

Другие инструменты для помощи в управлении SVG-иконками включают:

* [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)
* [svgo-loader](https://github.com/rpominov/svgo-loader)

Эти инструменты собирают SVG-иконки во время компиляции, что делает их сложнее для редактирования во время выполнения, потому что теги `<use>` могут иметь странные проблемы с кроссбраузерностью при выполнении чего-то сложного. Они также оставляют вас с двумя вложенными свойствами `viewBox` и, таким образом, с двумя системами координат. Это делает реализацию немного более сложной.
