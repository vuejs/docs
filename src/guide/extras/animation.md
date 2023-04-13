<script setup>
import ElasticHeader from './demos/ElasticHeader.vue'
import DisabledButton from './demos/DisabledButton.vue'
import Colors from './demos/Colors.vue'
import AnimateWatcher from './demos/AnimateWatcher.vue'
</script>

# Техніки анімації {#animation-techniques}

Vue надає компоненти [`<Transition>`](/guide/built-ins/transition) і [`<TransitionGroup>`](/guide/built-ins/transition-group) для обробки переходів входу / виходу і списків. Однак існує багато інших способів використання анімації в Інтернеті, навіть у програмі Vue. Тут ми обговоримо кілька додаткових прийомів.

## Анімація на основі класу {#class-based-animations}

Для елементів, які не входять / виходять з DOM, ми можемо запускати анімацію, динамічно додаючи клас CSS:

<div class="composition-api">

```js
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }
  }
}
```

</div>

```vue-html
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">Натисніть мене</button>
  <span v-if="disabled">Ця функція вимкнена!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

<DisabledButton />

## Анімація на основі стану {#state-driven-animations}

Деякі ефекти переходу можна застосувати шляхом інтерполяції значень, наприклад, шляхом прив’язки стилю до елемента під час взаємодії. Візьмемо, наприклад, цей приклад:

<div class="composition-api">

```js
const x = ref(0)

function onMousemove(e) {
  x.value = e.clientX
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX
    }
  }
}
```

</div>

```vue-html
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>Перемістіть курсор миші по цьому div...</p>
  <p>x: {{ x }}</p>
</div>
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```

<Colors />

Крім кольору, ви також можете використовувати прив’язки стилю для анімації трансформації, ширини або висоти. Ви навіть можете анімувати шляхи SVG за допомогою пружинної фізики - зрештою, усі вони є прив’язками даних атрибутів:

<ElasticHeader />

## Анімація зі спостерігачами {#animating-with-watchers}

З деякою креативністю ми можемо використовувати спостерігачі, щоб анімувати будь-що на основі певного числового стану. Наприклад, ми можемо анімувати саме число:

<div class="composition-api">

```js
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'

const number = ref(0)
const tweened = reactive({
  number: 0
})

watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

```vue-html
Введіть число: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```

</div>
<div class="options-api">

```js
import gsap from 'gsap'

export default {
  data() {
    return {
      number: 0,
      tweened: 0
    }
  },
  watch: {
    number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    }
  }
}
```

```vue-html
Введіть число: <input v-model.number="number" />
<p>{{ tweened.toFixed(0) }}</p>
```

</div>

<AnimateWatcher />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpNUr2Om0AQfpXRNsdJGKxIaQh2lCZlnmAbDGN7E/ZH7GAn4SiSJk2qFHmQKCeddNI9A7zRzQL2XcPOfjPfN7Pf0IkPziWnFkUmcl82yhF4pNZtpVHa2Yaggwb3MX+KktQJYzgXVB6hh31jNdww9+Zae/CFW/AQckKa0hpPYFq9wwY2QSxa315gOiMarCZ81o86aWApz2AtTc/F0kxNo5dUHMLI3MJmCxMDpuYJ2WjRjHnyqm0KUtawUPI2vqp+ms7AvruDNYQOAL00fObp7AK/ny+E2tUFId8A8kqdoKwL7zdSVKitFBMOMPwZ/g33w//x7/hz/A3jr+Fh/DE8Dk8Z5Mq4luC00rbCOpknYP4cSAHpopG7q/ZOHVaX/LbrLiYtZH7iR/UVK3YR+j5Pw6qYnvJ0HOXpq5n56ulbHcLkRXT2a28Nrc6oDkfKYGfr6t0V9eo7ZvAGNUPsCluyiIhYzIteabb6s7eGf5tJTS4JL0V22YcUYSMBkOJI5HyWpq1xXw5JaXUacu/ZlLZGKRb/e9E/A1sj6Pc=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpNUUtOwzAQvcrIm7ZSPhUSmxCK2LDkBN6kiZsYEtuKJ20hzQI2bFix4CAIJCQkzpDcCCcmaSVLnnlP8zzvuSbXSnnbipGAhDouucIVFbxQskRIdaRgU8oCZn05o4IKth+ohG2iKkeoqQBIIozmC1sDlAyrUowdgKiKNSsDWDojgjvGBEsMZJGmv5qB3kUYZ8E4bEfnYtKGYScP5Rwzrh2oIanKCLkURsw7d47St9Po4QBLaBanT1FhTuhPfk2DrFB5hKzvsH1rP9qv9rN77567V+he2u/uqf1pfwMIuVAVwtYtZMJyz254SYktKAF/UAgVxHmktWHWPHVHdlXX44rGxA3fs2S+XEDThL4yc6F/uoYINT7kfekdNWwSGynQ3TGeZhjAWubJxYRq/sgCOGOFgazLQYQ4xP6qW5gA77QU5scHLfpPaEqm4Cnpc+4BSjJEpQPfr4S6T71YFn7PXRn/Vc4oGQMlzR9HBM4U)

</div>
