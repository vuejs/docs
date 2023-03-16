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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp1UkuO00AQvUqpN5OR/ImQ2BgniA1LTtAbx64kHdwfdbcdwOMFbNiwYsFBEEhISJzBvhHVtpMZGM3Grn7V71X1q+rYK2OStkGWsdyVVhgPDn1jtlwJabT10IHFfUSfovSixQjOhS+P0MPeagk3xL253j24wix4CCnBVamV86AauUMLmyC2Wt9eYH9GVFhN+Ky/6riC5XoGa656uszVVHR1n4pCuFK3sNnCxICpeOL1atGMqPOqsYUXWpFQ8jy6qr6Z/oF9dwdrCBUAeq7on6ezC/R+OniUpi480gkgr0QLZV04t+GsQqk5m3CA4evwffg5/Bi/jZ/GLzB+Hn6NH4ffw58McqFM46GNpa6wTuYOiD8HnEG6aOTmqr0Th/iS33bdxaSFTE98Ld5hRS5C3+dpGBXRU+qOojx90DMdnX9fhzC5F5392mvl4zOKw9FnsNN19eKKOvEBM3iGkiByhSxZRFjE5kHHkqw+Oa1obSY1viQcZ9llHpyFiQSAs6P3xmVp2ijz9pCUWqYh95JMaWrkbJpmYNA2/Utw+zKs58kl2h5SihLbKC8kJuhkvLP67MiSE9V9qJES2KKNLaoKbfDxac3/rj7SXXajZ/1fjpsfiQ==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp1Ujtu3DAQvcqAjXeBlbQIkEZRHKRJmROw0UqzWjriB+Ro14msImnSpEqRgwQJYMCAzyDdyKRkyT8YEKCZ9ziPM2/Yso/GxMcGWcoyV1hh6JwrIY22BJXLDeytlnAWwjOuuMLLkSpxnzc1QcsVQJlTvlpPMYBFaqyaMwDVyB3aFLabGaETosLSQxPShV830qecikM6F0+lK7Vow9hTTHpFB+E20ELZ2JyEVl4sfrt5kP68lF5dwRa69eOruPJflizz+oRQmjonDBn1v/u//f/+3/Bn+DH8guFnfz1872/62xQyoUxDcIykLrGOpw7fczYFnEEyKmQGijp3zjM7UUUze962c4t+iE/iEsvVdg1dlyXG12XJ4zZU5uhrHcL4QWNyYq8VRScU1YFS2Om6fLegTnzDFN6g9NA05SjCNmzaaiS9gRdOK7/xUYvfE46zxXjOgs8B4OxAZFyaJI0yX6q40DIJ3Ac/f1MjZ/db5cw/oqcFbl+El3XhYm2rxEexbRQJiTE6Ge2sPjm0vpWnGokHj2gji6pEG0x7XfPZ0Re687JZdwcXOASm)

</div>
