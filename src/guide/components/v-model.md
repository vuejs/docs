# Component v-model {#component-v-model}

টু-ওয়ে বাইন্ডিং বাস্তবায়ন করতে একটি উপাদানে `v-মডেল` ব্যবহার করা যেতে পারে।

প্রথমে আসুন একটি নেটিভ এলিমেন্টে কীভাবে `v-মডেল` ব্যবহার করা হয় তা আবার দেখা যাক:

```vue-html
<input v-model="searchText" />
```

হুডের নিচে, টেমপ্লেট কম্পাইলার `v-model`-কে আমাদের জন্য আরও ভারবোজ সমতুল্য করে প্রসারিত করে। সুতরাং উপরের কোডটি নিম্নলিখিত হিসাবে একই কাজ করে:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

একটি উপাদানে ব্যবহার করা হলে, `v-model` এর পরিবর্তে এতে প্রসারিত হয়:

```vue-html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

যদিও এটি আসলে কাজ করার জন্য, `<CustomInput>` উপাদানটিকে অবশ্যই দুটি জিনিস করতে হবে:

1. একটি নেটিভ `<input>` উপাদানের `value` বৈশিষ্ট্যকে `modelValue` প্রপের সাথে আবদ্ধ করুন
2. যখন একটি নেটিভ `input` ইভেন্ট ট্রিগার হয়, তখন নতুন মান সহ একটি `update:modelValue` কাস্টম ইভেন্ট নির্গত করুন

এখানে এটি কর্মে রয়েছে:

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

এখন `v-model` এই উপাদানটির সাথে পুরোপুরি কাজ করা উচিত:

```vue-html
<CustomInput v-model="searchText" />
```

<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqFkctqwzAQRX9lEAEn4Np744aWrvoD3URdiHiSGvRCHpmC8b93JDfGKYGCkJjXvTrSJF69r8aIohHtcA69p6O0vfEuELzFgZx5tz4SXIIzUFT1JpfGCmmlxe/c3uFFRU0wSQtwdqxh0dLQwHSnNJep3ilS+8PSCxCQYrC3CMDgMKgrNlB8odaOXVJ2TgdvvNp6vSwHhMZrRcgRQLs1G5+M61A/S/ErKQXUR5immwXMWW1VEKX4g3j3Mo9QfXCeKU9FtvpQmp/lM0Oi6RP/qYieebHZNvyL0acLLODNmGYSxCogxVJ6yW1c2iWz/QOnEnY48kdUpMIVGSllD8t8zVZb+PkHqPG4iw==)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp9j81qwzAQhF9lEQE7kNp344SW0kNvPfVS9WDidSrQH9LKF+N37yoOxoSQm7QzO9/sJN68r8aEohFtPAflCSJS8idplfEuEEwQcIAZhuAMFGwtVuk9RXLm0/pEN7mqN7Ocy2YAac/ORgKDMXYXhGOOLIs/1NoVe2nbekEzlD+ExuuOkH8A7ZYxvhjXoz5KcUuSAuoTTNOaPM85bU0QB3HX58GdPQ7K4ldwPpY/xZXw3Wmu/svVFvHDKMpi8j3HNneeZ/VVBucXQDPmjVx+XZdikV6vNpZ2yKTyAecAOxzRUkVduCCfkqf7Zb9m1Pbo+R9ZkqZn)

</div>

এই উপাদানের মধ্যে `v-model` বাস্তবায়নের আরেকটি উপায় হল একটি লিখনযোগ্য `computed` বৈশিষ্ট্য একটি গেটার এবং একটি সেটারের সাথে ব্যবহার করা। `get` পদ্ধতিটি `modelValue` বৈশিষ্ট্য প্রদান করবে এবং `set` পদ্ধতিটি সংশ্লিষ্ট ইভেন্ট নির্গত করবে:

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

## `v-model` arguments {#v-model-arguments}

ডিফল্টরূপে, একটি উপাদানে `v-model` প্রপ হিসেবে `modelValue` এবং `update:modelValue` ইভেন্ট হিসেবে ব্যবহার করে। আমরা এই নামগুলিকে 'v-মডেল'-এ একটি যুক্তি পাস করে সংশোধন করতে পারি:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

এই ক্ষেত্রে, চাইল্ড কম্পোনেন্টের একটি `title` প্রপ আশা করা উচিত এবং প্যারেন্ট মান আপডেট করার জন্য একটি `update:title` ইভেন্ট নির্গত করা উচিত:

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp9kE1rwzAMhv+KMIW00DXsGtKyMXYc7D7vEBplM8QfOHJoCfnvk+1QsjJ2svVKevRKk3h27jAGFJWoh7NXjmBACu4kjdLOeoIJPHYwQ+ethoJLi1vq7fpi+WfQ0JI+lCstcrkYQJqzNQMBKeoRjhG4LcYHbVvsofFfQUcCXhrteix20tRl9sIuOCBkvSHkCKD+fjxN04Ka57rkOOlrMwu7SlVHKdIrBZRcWpc3ntiLO7t/nKHFThl899YN248ikYpP9pj1V60o6sG1TMwDU/q/FZRxgeIPgK4uGcQLSZGlamz6sHKd1afUxOoGeeT298A9bHCMKxBfE3mTSNjl1vud5x8qNa76)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqFUNFqwzAM/BVhCm6ha9hryMrGnvcFdR9Mo26B2DGuHFJC/n2yvZakDAohtuTTne5G8eHcrg8oSlFdTr5xtFe2Ma7zBF/Xz45vFi3B2XcG5K6Y9eKYVFZZHBK8xrMOLcGoLMDphrqUMC6Ypm18rzXp9SZjATxS8PZWAVBDLZYg+xfT1diC9t/BxGEctHFtlI2wKR78468q7ttzQcgoTcgVQPXzuh/HzAnTVBVcp/58qz+lMqHelEinElAwtCrufGIrHhJYBPdfEs53jkM4yEQpj8k+miYmc5DBcRKYZeXxqZXGukDZPF1dWhQHUiK3yl63YbZ97r6nIe6uoup6KbmFFfbRCnHGyI4iwyaPPnqffgGMlsEM)

</div>

## Multiple `v-model` bindings {#multiple-v-model-bindings}

[`v-model` arguments](#v-model-arguments) দিয়ে আমরা আগে যেমন শিখেছি তেমন কোনো নির্দিষ্ট প্রপ এবং ইভেন্টকে টার্গেট করার ক্ষমতাকে কাজে লাগিয়ে, আমরা এখন একটি একক কম্পোনেন্ট ইনস্ট্যান্সে একাধিক `v-model` বাইন্ডিং তৈরি করতে পারি।

প্রতিটি `v-model` উপাদানে অতিরিক্ত বিকল্পের প্রয়োজন ছাড়াই একটি ভিন্ন প্রপের সাথে সিঙ্ক করবে:

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
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

[চেষ্টা করুন](https://play.vuejs.org/#eNqNUc1qwzAMfhVjCk6hTdg1pGWD7bLDGIydlh1Cq7SGxDaOEjaC332yU6cdFNpLsPRJ348y8idj0qEHnvOi21lpkHWAvdmWSrZGW2Qjs1Azx2qrWyZoVMzQZwf2rWrhhKVZbHhGGivVTqsOWS0tfTeeKBGv+qjEMkJNdUaeNXigyCYjZIEKhNY0FQJVjBXHh+04nvicY/QOBM4VGUFhJHrwBWPDutV7aPKwslbU35Q8FCX/P+GJ4oB/T3hGpEU2m+ArfpnxytX2UEsF71abLhk9QxDzCzn7QCvVYeW7XuGyWSpH0eP6SyuxS75Eb/akOpn302LFYi8SiO8bJ5PK9DhFxV/j0yH8zOnzoWr6+SbhbifkMSwSsgByk1zzsoABFKZY2QNgGpiW57Pdrx2z3JCeI99Svvxh7g8muf2x)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqNkk1rg0AQhv/KIAETSJRexYYWeuqhl9JTt4clmSSC7i7rKCnif+/ObtYkELAiujPzztejQ/JqTNZ3mBRJ2e5sZWgrVNUYbQm+WrQfskE4WN1AmuXRwQmpUELh2Qv3eJBdTTAIBbDTLluhoraA4VpjXHNwL0kuV0EIYJE6q6IFcKhsSwWk7/qkUq/nq5be+aa5JztGfrmHu8t8GtoZhI2pJaGzAMrT03YYQk0YR3BnruSOZe5CXhKnC3X7TaP3WBc+ZaOc/1kk3hDJvYILRQGfQzx3Rct8GiJZJ7fA7gg/AmesNszMrUIXFpxbwCfZSh09D0Hc7tbN6sAWm4qZf6edcZgxrMHSdA3RF7PTn1l8lTIdhbXp1/CmhOeJRNHLupv4eIaXyItPdJEFD7R8NM0Ce/d/ZCTtESnzlVZXhP/vHbeZaT0tPdf59uONfx7mDVM=)

</div>

## Handling `v-model` modifiers {#handling-v-model-modifiers}

আমরা যখন ফর্ম ইনপুট বাইন্ডিং সম্পর্কে শিখছিলাম, তখন আমরা দেখেছিলাম যে `v-model`-এ রয়েছে [বিল্ট-ইন মডিফায়ার](/guide/essentials/forms#modifiers) - `.trim`, `.number` এবং `.lazy`। কিছু ক্ষেত্রে, আপনি কাস্টম সংশোধককে সমর্থন করার জন্য আপনার কাস্টম ইনপুট উপাদানটিতে `v-model`ও চাইতে পারেন।

আসুন একটি উদাহরণ তৈরি করি কাস্টম মডিফায়ার, `capitalize`, যা `v-model` বাইন্ডিং দ্বারা প্রদত্ত স্ট্রিংয়ের প্রথম অক্ষরকে বড় করে তোলে:

```vue-html
<MyComponent v-model.capitalize="myText" />

```

একটি উপাদান `v-model`-এ যোগ করা সংশোধকগুলিকে `modelModifiers` প্রপের মাধ্যমে উপাদানকে প্রদান করা হবে। নিচের উদাহরণে, আমরা একটি কম্পোনেন্ট তৈরি করেছি যাতে একটি 'modelModifiers' প্রপ রয়েছে যা একটি খালি বস্তুতে ডিফল্ট হয়:

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

লক্ষ্য করুন কম্পোনেন্টের `modelModifiers` প্রপে `capitalize` আছে এবং এর মান `true` - কারণ এটি `v-model` বাইন্ডিং `v-model.capitalize="myText"`-এ সেট করা হয়েছে।

এখন যেহেতু আমরা আমাদের প্রপ সেট আপ করেছি, আমরা `modelModifiers` অবজেক্ট কীগুলি পরীক্ষা করতে পারি এবং নির্গত মান পরিবর্তন করতে একটি হ্যান্ডলার লিখতে পারি। নিচের কোডে আমরা যখনই `<input />` উপাদানটি একটি `input` ইভেন্ট ফায়ার করে তখনই আমরা স্ট্রিংটিকে ক্যাপিটালাইজ করব।

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp9Us1Og0AQfpUJF5ZYqV4JNTaNxyYmVi/igdCh3QR2N7tDIza8u7NLpdU0nmB+v5/ZY7Q0Jj10GGVR7iorDYFD6sxDoWRrtCU4gsUaBqitbiHm1ngqrfuV5j+Fik7ldH6R83u5GaBQlVaOoO03+Emw8BtFHCeFyucjKMNxQNiapiTkCGCzlw6kMh1BVRpJZSO/0AEe0Pa0l2oHve6AYdBmvj+/ZHO4bfUWm/Q8uSiiEb6IYM4A+XxCi2bRH9ZX3BgVGKuNYwFbrKXCZx+Jo0cPcG9l02EGL2SZ3mxKr/VW1hKty9hMniy7hjIQCSweQByHBIZCDWzGDwi20ps0Yjxx4MR73Jktc83OOPFHGKk7VZHUKkyFgsAEAqcG2Qif4WWYUml3yOp8wldlDSLISX+TvPDstAemLeGbVvvSLkncJSnpV2PQrkqHLOfmVHeNrFDcMz3w0iBQE1cUzMYBbuS2f55CPj4D6o0/I41HzMKsP+u0kLOPoZWzkx1X7j18A8s0DEY=)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqFks1qg0AQgF9lkIKGpqa9iikNOefUtJfaw6KTZEHdZR1DbPDdO7saf0qgIq47//PNXL2N1uG5Ri/y4io1UtNrUspCK0Owa7aK/0osCQ5GFeCHq4nMuvlJCZCUeHEOGR5EnRNcrTS92VURXGex2qXVZ4JEsOhsAQxSbcrbDaBo9nihCHyXAaC1B3/4jVdDoXwhLHQuCPkGsD/JCmSpa4JUaEkilz9YAZ7RNHSS5REaVQPXgCay9vG0rPNToTLMw9FznXhdHYkHK04Qr4Zs3tL7g2JG8B4QbZS2LLqGXK5PkdcYwTsZrs1R6RU7lcmDRDPaM7AuWARMbf0KwbVdTNk4dyyk5f3l15r5YjRm8b+dQYF0UtkY1jo4fYDDLAByZBxWCmvAkIQ5IvdoBTcLeYCAiVbhvNwJvEk4GIK5M0xPwmwoeF6EpD60RrMVFXJXj72+ymWKwUvfXt+gfVzGB1tzcKfDZec+o/LfxsTdtlCj7bSpm3Xk4tjpD8FZ+uZMWTowu7MW7S+CWR77)

</div>

### Modifiers for `v-model` with arguments {#modifiers-for-v-model-with-arguments}

আর্গুমেন্ট এবং মডিফায়ার উভয়ের সাথে `v-model` বাইন্ডিংয়ের জন্য, জেনারেট করা প্রপের নাম হবে `arg + "Modifiers"`। উদাহরণ স্বরূপ:

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

সংশ্লিষ্ট ঘোষণাগুলি হওয়া উচিত:

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

Here's another example of using modifiers with multiple `v-model` with different arguments:

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

<div class="composition-api">

```vue{5,6,10,11}
<script setup >
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
