# v-model з компонентами {#component-v-model}

`v-model` можна використовувати в компоненті для реалізації двостороннього прив’язування.

Спочатку давайте переглянемо, як `v-model` використовується на нативному елементі:

```vue-html
<input v-model="searchText" />
```

Під капотом компілятор шаблонів розширює `v-model` до більш детального еквівалента для нас. Отже, наведений вище код робить те саме, що й наступний:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

Коли використовується на компоненті, `v-model` натомість розширюється до цього:

```vue-html
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```

Щоб це справді спрацювало, компонент `<CustomInput>` має виконати дві дії:

1. Прив’язати атрибут `value` рідного елемента `<input>` до реквізиту `modelValue`
2. Коли запускається нативна подія `input`, створити спеціальну подію `update:modelValue` з новим значенням

Ось це в дії:

<div class="options-api">

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>
<div class="composition-api">

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>

Тепер `v-model` має ідеально працювати з цим компонентом:

```vue-html
<CustomInput v-model="searchText" />
```

<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFkU1qwzAQha8yiIATcO29cUNLV71AN1EXIp4Eg/WDLJmCMZQeogfpqrtewb5RR3ZinBAICInRzLynb9SyZ2OSxiPLWF7vbWnclqtSGm0dvPjaafmqjHdwsFpClKSLu9AWccUVfozlBR6Erxy0XAHsNWkoVK7OoL1Q6uKQL4QT681UC2DReavOEYDEuhZHzCDq/4bP/rf/Gb6HLzILyS4ctNHK0/nNFDiUphIOKQLIl57Ng9QFVo+cnZQ5g3QLbXt2gm5UmxVYzK5ILwZ0i9hYbQh2F41Wb6Ki6byPrCjLMIZd5A1hY7YsuItRhgdM4FkTegLELMDZlHoayyi1CmbrG04xrLCh/0icsEckpHC7mfpTslrCd/+sdL8b)

</div>
<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9jz1qw0AQha8yLAbJ4Ei9kE1CSJEuVZpsCmGNjED7w+5IjRCEHCIHSZUuV5BulFnLCGFMut15M+97rxcP1iZdiyITuT+62hJ4pNYepK6VNY6gB4cVDFA5oyDi1WiRHltPRj1r29JFTtLVLPjyMoDUR6M9gULvixPCPljG0fg7fYw/4/f0NX1GW6nzdE7AbP4QKtsUhPwDyNeo7k6ZEpu9FBdDKSA9QN8vgGEIbouD2ImrWDfqlljVGl+csT5+i86E16LhBu8cbRafVE1BbG3JttnVzn/x6wAOL4CsCxch/HIuxSzdn9dY2iCT4hucHWywQ00JFe6EXCVMt/N9yqh16eEPe8Ss9w==)

</div>

Інший спосіб реалізації `v-model` в цьому компоненті полягає у використанні властивості `computed`, доступної для запису, як з геттером, так і з сеттером. Метод `get` має повертати реквізит `modelValue`, а метод `set` має випромінювати відповідну подію:

<div class="options-api">

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

</div>
<div class="composition-api">

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```

</div>

### Агрументи `v-model` {#v-model-arguments}

За промовчанням `v-model` для компонента використовує `modelValue` як реквізит і `update:modelValue` як подію. Ми можемо змінити ці імена, передавши аргумент `v-model`:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

У цьому випадку дочірній компонент має очікувати реквізит `title` і випромінювати подію `update:title` для оновлення батьківського значення:

<div class="composition-api">

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9UNtKw0AQ/ZVhKSSF2uBrSIsiPgq+Gx9CM9FAslmSSbCEgNgfKqggXvAXNn/kZDeUWMSnnTlz5sw524pzpZZNjcIXQbUpU0VQIdVqHco0V0VJ0EKJCXSQlEUODlOdw+hqe1FwJVHSOF56E2zQZTJAKDeFrAgopQxhNQi6jv7uH/Wbftcfeq9fQO+5fe53+lO/6q/+qd9Bc5IXMWbOPJSBZ82xLW4Ic5VFhNwBBPen67Ydtbsu8Lg3+NTdKOUb1ioU5g0FeEwNvIOeWIgj/3/8S4xJKvG6LFTl3jhGyblljxa/zFMa8FrFrGgPmvF/EVKpahoqANoqYxAfKBQW8psoqyeuLXpmlhidIZ90fx9cwAybIQJF5R1ykkFhblePM3c/lsbAGQ==)

</div>
<div class="options-api">

```vue
<!-- MyComponent.vue -->
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFUFtqwzAQvMoiAkogjemvcUNLv3uCKB8m2bQGWxbK2iQYQ2kuFGgLpQ96BflG1aMJcSgUjKUdzc7uTMNulJrUFbKYJeuFzhRNhcwKVWqCu+1taW8SJcFKlwXwSXSCuTYupJC48fQlrtIqJ2iEBFgcWOsYmp5SO3bvy5TS4ShwATRSpeWhAqCMcoyBm+/u0byZd/Nh9uYFzN6Wz93OfJpX89U9dTuoL4pyibndw/W17rA/+yXR0Y4tCAuVp4S2AkgeLqdNE4ZA2yaRrT1+uuavcOxZV4L5UzCILDWJjnpszM4i6SX5VzRKl8qmMuNeks99HlhkLqoZr5SNBsNYPv/XSiZVRcE8bZVfFDckWIDiOs2rk+0Deu2bLDpwU4f9kWMYYO2sUKrv0TpyCqPQeu69/QE1OtIr)

</div>

### Кілька прив'язок `v-model` {#multiple-v-model-bindings}

Використовуючи можливість націлюватися на конкретний реквізит та подію, як ми дізналися раніше за допомогою аргументів [`v-model`](#v-model-arguments), тепер ми можемо створити кілька прив’язок `v-model` до одного екземпляра компонента.

Кожна `v-model` синхронізуватиметься з іншими реквізитами без необхідності додаткових параметрів у компоненті:

```vue-html
<UserName
  v-model:first-name="firstName"
  v-model:last-name="lastName"
/>
```

<div class="composition-api">

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUc1qg0AQfpVFAmsgUXoVE9pDr6VQeqo9SDKmC7ou6ygtsqe+Qp+lt+YZ7Bt1ds3aBALJRXbmm/l+xj64UyrqWgiSIG02WihkDWCr1pkUlao1sp5pKJhhha4rxmmUT9BzA/ohr+CARbFvWEYay+Smlg2yQmj6rixRyIev4XvYDz987uEyP0H3v58WS+PRDzmhAqFSZY5AFWPp28267w+0xjB6Ow5j0pggN+Kt2IKxblnVWygTt7KU1F9lgSuy4HTCEvkB+x7xmEjTeDIRLILjqGeOt4VCSHjUtWrC3jI4MbuQsCfUQu4WtmsVjpuZNBTdr99XApvwhbdqS6qjeTvNF8z3PAF/vXAyIVWLY1T8UDYdwvuUPunysp1u4u52QG7dIiEzIDfhOS8z6EBihLneAUaOaf5/tuu1fZYL0lPkS8rHP8z8AcF2BWQ=)

</div>
<div class="options-api">

```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqNUlFqg0AQvcogARNIIv0VG9oL9Kf0q/ZjSSapoOuyjpIifvUKPUv/mjPYG3VmzZoEAqmI7sy892bmaRs8GrNsagziIKnWNjO0SnVWmNISvFRon1SBsLVlAeEy8gkhhKlONe4dcINbVecEbaoB1iWzNWqqYmhPGt1cihtFajobgAAWqbbaRwDbzFYUQ9h/9d/9of8JHUeuXPnC4feTW0uukxc/+E6icXYOCAuTK0KOAJL3u1XbDtLQdcBnEeNjEnHJQfyQg26zKMoN5rGjLDTn79PABWlwiRAhD5DzUI9YNInGIYJ5cO7bhdHX/DO2NGIdr0JHS4QbwzPZTO+cJSlJu/O0oAeLscjE+tewNuw2DmsINJyDz3l2+HbTvkybmoa16cPIpoT70Ym4UXk9+uM8PFYeHJErExloem2aCTb8myxJ2R3S0inNThb+v7ff5kbrcelbnc8/XvcHqZ0U9w==)

</div>

### Обробка модифікаторів `v-model` {#handling-v-model-modifiers}

Коли ми вивчали прив’язки введення форм, ми побачили, що `v-model` має [вбудовані модифікатори](/guide/essentials/forms#modifiers) – `.trim`, `.number` і `.lazy`. У деяких випадках вам також може знадобитися, щоб `v-model` у вашому власному компоненті введення підтримувала користувацькі модифікатори.

Давайте створимо приклад власного модифікатора, `capitalize`, який робить першу літеру рядка великою, що надається прив’язкою `v-model`:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

Модифікатори, додані до `v-model`, будуть надані компоненту через реквізит `modelModifiers`. У наведеному нижче прикладі ми створили компонент, який містить реквізит `modelModifiers`, яка за промовчанням має порожній об’єкт:

<div class="composition-api">

```vue{4,9}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

defineEmits(['update:modelValue'])

console.log(props.modelModifiers) // { capitalize: true }
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>
<div class="options-api">

```vue{11}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>

Зауважте, що реквізит `modelModifiers` компонента містить `capitalize`, а його значення — `true`, оскільки воно прив’язано до `v-model` `v-model.capitalize="myText"`.

Тепер, коли ми налаштували реквізит, ми можемо перевірити ключі об’єкта `modelModifiers` і написати обробник для зміни випромінюваного значення. У наведеному нижче коді ми будемо використовувати рядок з великої літери щоразу, коли елемент `<input />` запускає подію `input`.

<div class="composition-api">

```vue{11-13}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp9Us2K1EAQfpUil/TgmNFryCwui8cFwZ+L8RAylbUh6TSdzuI4BNSTnrzpG/gAYnBw2dlX6LyRVZ0xzi7DkkNSVV/VV99X2QSnWkeXLQZxkDS5kdpCg7bVJ6mSla6NhQ0YLKCDwtQVhAQNp9L5+qymL4XK7svR4iDHcwkMkKq8Vo2Fav0C31lY8kQRhrNUJYuRlOgosFjpMrNIEYD74XpwN27nrvjjl7savoL7SU9PQe+u3TUnbtx2+MyA31zsCbx1f9xu+A7U8G345Prhg9tSbfjo+jkMX9yOgZyhZ0ejtgyKmTI5FHT5sKpXWEZ5pqXNSvkel2kwKkgDWNCOyWJaOJgHd4QfMXQ0QZtaN+TBCgup8BlHYsPsnu5VVrYYw3NrpLqYT+nzeiULiaaJ6R7UmbWljUHMYHkCYtPNoEtVR37+I8FKss8jx1MKGvE6bPWKdo3/84RvfEvRqtzKWvkuXxA4A79TiWQEZ2gYRjYzF0jqOMFVWYDwcqLbSx54tp8D0xT/jvK3mTm14tEssvVLrdGcZQ2SnAf7elPKHMVjWg9YGvjVxBEF87GBgAS7529KpNKtBbvWfEY7HjH2vXzWaSBln3goZSc7jty7+wvqkEYu)

</div>
<div class="options-api">

```vue{13-15}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqFUs1q20AQfpVBFCxTV26vQg4NOefUn0vVwyKN4wX9LKtViGsMbU/tqbf2DfoApaKmIc4rrN4oMytbloMhktDuznzzzcw3u/LOlQqua/RCL6oSLZU5iwuZq1IbuFxelLQrsDAw12UOo2A6sHHYKC4A4gJvXECKc1FnBlZsTfa4KoTVEdd6wv5UGOGPOyyARlPrYn8CyJdv8caEMHIZANa80I++aNoXSgeDucqEQToB2N+2AXtvt/aWN3/tbfsD7B96Gzo09s7eseHebtpvDPjHzobAG/vfbttfQAE/26+2aT/bDfnaL7aZQPvdbhnIFnq3RLVhUMgpo2Fn1y/yMsUsSISSRmTyE85ir2sl9mBKNUbTvmBv4j1S82gIpzRVulQsZ6eJy/VeZDWG8MZoWVw5YXeOyzKVc4n6gCfNO7IQSPjZGfir9XgorwvHXPLIPoxqRSPC8JBl9NEBcjSLMj3QcoDz+9iPEyBDkoOtMAMMjNBXSD2yYY+Qc/DNQlbBcbkD8QZ00JO5NUgWQp8b/+U4MOU7pVBfiAqpq+c7f5XJBP1Xu/Z2DfLjMj7jmv0THU668CNVnrp0kSxUbcAsFU/bdLMOHQ9Pvycn62sHJWuv2YlrsX4Ar0hY4w==)

</div>

### Модифікатори для `v-model` з аргументами {#modifiers-for-v-model-with-arguments}

Для прив’язок `v-model` як з аргументом, так і з модифікаторами, ім’я створеного реквізита буде `arg + "Modifiers"`. Наприклад:

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

Відповідні оголошення мають бути:

<div class="composition-api">

```js
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

</div>
<div class="options-api">

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```

</div>

Ось ще один приклад використання модифікаторів із кількома `v-model` з різними аргументами:

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

<div class="composition-api">

```vue{5,6,10,11}
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```

</div>
<div class="options-api">

```vue{15,16}
<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    firstNameModifiers: {
      default: () => ({})
    },
    lastNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:firstName', 'update:lastName'],
  created() {
    console.log(this.firstNameModifiers) // { capitalize: true }
    console.log(this.lastNameModifiers) // { uppercase: true}
  }
}
</script>
```

</div>
