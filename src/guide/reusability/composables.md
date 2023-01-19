# Composables {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
Để đọc phần này, bạn cần kiến thức cơ bản về [Composition API](# "abc"). Nếu bạn mới chỉ học Options API, bạn nên chuyển API Preference thành Composition API (dùng nút chuyển ở bên trên sidebar) và đọc lại hai chương [Các nguyên tắc cơ bản về Reactivity](/guide/essentials/reactivity-fundamentals.html) và [Các Lifecycle Hook](/guide/essentials/lifecycle.html).
:::

## "Composable" là gì? {#what-is-a-composable}

Trong project Vue, một "composable" là một hàm tận dụng Composition API để đóng gói và tái sử dụng **stateful logic** (logic có động tới state của component).

Khi xây dựng frontend, ta hay phải tái sử dụng logic cho các task thông dụng. Ví dụ, ta có thể phải format ngày tháng ở nhiều chỗ, do đó cần tách logic ra thành một hàm có thể tái sử dụng. Hàm format này đóng gói các **stateless logic** (logic không chứa các state của component): nó nhận một vài input và ngay lập tức trả về output mong muốn. Có nhiều thư viện hỗ trợ tái sử dụng stateless logic, ví dụ hai thư viện nổi tiếng [lodash](https://lodash.com/) và [date-fns](https://date-fns.org/).

Ngược lại, stateful logic liên quan đến quản lý state, mà state thì thay đổi. Một ví dụ đơn giản là theo dõi vị trí hiện tại của con trỏ chuột trong một trang. Trong các tình huống thực tế, logic có thể phức tạp hơn, như là các cử chỉ chạm trên màn hình cảm ứng hay trạng thái connect tới database.

## Ví dụ: Theo dõi con trỏ chuột {#mouse-tracker-example}

Nếu làm chức năng này trong một component bằng Composition API, code sẽ như sau:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Vị trí con trỏ chuột là: {{ x }}, {{ y }}</template>
```

Nhưng nếu ta cần tái sử dụng logic này trong nhiều component thì sao? Chúng ta có thể tách logic ra một file khác, như một "composable function" (chức năng có thể tổng hợp:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// theo quy ước, tên các composable function bắt đầu với "use"
export function useMouse() {
  // đóng gói và quản lý state với composable
  const x = ref(0)
  const y = ref(0)

  // một composable có thể update state bên trong nó.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // một composable cũng có thể được gán vào lifecycle của component dùng nó
  // để cài đặt và loại bỏ các "side effect".
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose các state thông qua return
  return { x, y }
}
```

Sau đó dùng nó trong các component:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Vị trí con trỏ chuột là: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Vị trí con trỏ chuột là: {{ x }}, {{ y }}
</div>

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnLi9tb3VzZS5qcydcblxuY29uc3QgeyB4LCB5IH0gPSB1c2VNb3VzZSgpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBNb3VzZSBwb3NpdGlvbiBpcyBhdDoge3sgeCB9fSwge3sgeSB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwibW91c2UuanMiOiJpbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb3VzZSgpIHtcbiAgY29uc3QgeCA9IHJlZigwKVxuICBjb25zdCB5ID0gcmVmKDApXG5cbiAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgeC52YWx1ZSA9IGV2ZW50LnBhZ2VYXG4gICAgeS52YWx1ZSA9IGV2ZW50LnBhZ2VZXG4gIH1cblxuICBvbk1vdW50ZWQoKCkgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG4gIG9uVW5tb3VudGVkKCgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxuXG4gIHJldHVybiB7IHgsIHkgfVxufSJ9)

Có thể thấy, logic quan trọng vẫn tương tự - việc ta làm là chuyển nó tới một hàm bên ngoài và trả về state cần được expose. Cũng giống như bên trong một component, bạn có thể dùng tất cả [các hàm của Composition API](/api/#composition-api) trong các composable. `useMouse()` giờ có thể được dùng trong bất kỳ component nào.

Phần cool hơn về các composable, là bạn có thể lồng chúng với nhau: một hàm composable có thể gọi một hoặc nhiều hàm composable khác. Điều này cho phép chúng ta kết hợp (nguyên văn: compose) nhiều đơn vị nhỏ, riêng lẻ thành một composable phức tạp, tương tự như cách ta tạo ra một app Vue từ các component. Thực tế, đây là lý do chúng tôi quyết định gọi tập hợp các API tạo nên pattern này là Composition API.

Ví dụ, ta có thể tách logic thêm và xóa một event listener DOM thành composable riêng:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // nếu muốn, bạn có thể support chọn target bằng CSS selector
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

Bây giờ `useMouse()` composable có thể đơn giản hóa thành:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
Mỗi component instance gọi đến `useMouse()` sẽ tạo một bản copy state `x` và `y` của riêng nó, nên chúng sẽ không liên quan đến nhau. Nếu bạn muốn quản lý các state để có thể chia sẻ giữa các component, đọc thêm chương [Quán lý State](/guide/scaling-up/state-management.html).
:::

## Ví dụ: Async State {#async-state-example}

Composable `useMouse()` không nhận argument nào, nên ta sẽ thử một ví dụ khác. Khi fetch data một cách bất đồng bộ, ta thường cần xử lý các trạng thái khác nhau: đang load, load thành công và load bị lỗi:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Có lỗi xảy ra: {{ error.message }}</div>
  <div v-else-if="data">
    Data đã load:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Đang load...</div>
</template>
```

Thật tẻ nhạt nếu phải lặp lại đoạn pattern này trong tất cả component cần fetch data. Hãy tách nó ra thành một composable:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Bây giờ trong component ta chỉ cần gọi:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

`useFetch()` nhận một URL cố định làm input - vậy nên nó chỉ fetch data một lần sau đó không làm gì nữa. Vậy nếu ta cần fetch data mới mỗi khi URL thay đổi thì sao? Ta có thể thực hiện điều này bằng cách chấp nhận một argument là một ref:

```js
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // reset state trước khi fetch..
    data.value = null
    error.value = null
    // unref() để unwrap url nếu nó là ref
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    //  nếu input URL là một ref, setup re-fetch với watchEffect
    watchEffect(doFetch)
  } else {
    // nếu không phải, chỉ cần fetch một lần
    // để bỏ watcher không cần thiết
    doFetch()
  }

  return { data, error }
}
```

Bây giờ, `useFetch()` đã có thể nhận cả URL cố định và URL là ref. Khi nó nhận thấy URL là một ref động thông qua [`isRef()`](/api/reactivity-utilities.html#isref), nó sẽ cài một reactive effect bằng [`watchEffect()`](/api/reactivity-core.html#watcheffect). Effect sẽ được thực thi ngay, và cũng sẽ theo dõi URL ref giống như một dependency. Bất cứ khi nào URL ref thay đổi, data sẽ được reset và gọi fetch lại.

Đây là [phiên bản nâng cấp của `useFetch()`](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJy4vdXNlRmV0Y2guanMnXG5cbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLydcbmNvbnN0IGlkID0gcmVmKCcxJylcbmNvbnN0IHVybCA9IGNvbXB1dGVkKCgpID0+IGJhc2VVcmwgKyBpZC52YWx1ZSlcblxuY29uc3QgeyBkYXRhLCBlcnJvciwgcmV0cnkgfSA9IHVzZUZldGNoKHVybClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIExvYWQgcG9zdCBpZDpcbiAgPGJ1dHRvbiB2LWZvcj1cImkgaW4gNVwiIEBjbGljaz1cImlkID0gaVwiPnt7IGkgfX08L2J1dHRvbj5cblxuXHQ8ZGl2IHYtaWY9XCJlcnJvclwiPlxuICAgIDxwPk9vcHMhIEVycm9yIGVuY291bnRlcmVkOiB7eyBlcnJvci5tZXNzYWdlIH19PC9wPlxuICAgIDxidXR0b24gQGNsaWNrPVwicmV0cnlcIj5SZXRyeTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2UtaWY9XCJkYXRhXCI+RGF0YSBsb2FkZWQ6IDxwcmU+e3sgZGF0YSB9fTwvcHJlPjwvZGl2PlxuICA8ZGl2IHYtZWxzZT5Mb2FkaW5nLi4uPC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJ1c2VGZXRjaC5qcyI6ImltcG9ydCB7IHJlZiwgaXNSZWYsIHVucmVmLCB3YXRjaEVmZmVjdCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoKHVybCkge1xuICBjb25zdCBkYXRhID0gcmVmKG51bGwpXG4gIGNvbnN0IGVycm9yID0gcmVmKG51bGwpXG5cbiAgYXN5bmMgZnVuY3Rpb24gZG9GZXRjaCgpIHtcbiAgICAvLyByZXNldCBzdGF0ZSBiZWZvcmUgZmV0Y2hpbmcuLlxuICAgIGRhdGEudmFsdWUgPSBudWxsXG4gICAgZXJyb3IudmFsdWUgPSBudWxsXG4gICAgXG4gICAgLy8gcmVzb2x2ZSB0aGUgdXJsIHZhbHVlIHN5bmNocm9ub3VzbHkgc28gaXQncyB0cmFja2VkIGFzIGFcbiAgICAvLyBkZXBlbmRlbmN5IGJ5IHdhdGNoRWZmZWN0KClcbiAgICBjb25zdCB1cmxWYWx1ZSA9IHVucmVmKHVybClcbiAgICBcbiAgICB0cnkge1xuICAgICAgLy8gYXJ0aWZpY2lhbCBkZWxheSAvIHJhbmRvbSBlcnJvclxuICBcdCAgYXdhaXQgdGltZW91dCgpXG4gIFx0ICAvLyB1bnJlZigpIHdpbGwgcmV0dXJuIHRoZSByZWYgdmFsdWUgaWYgaXQncyBhIHJlZlxuXHQgICAgLy8gb3RoZXJ3aXNlIHRoZSB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIGFzLWlzXG4gICAgXHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmxWYWx1ZSlcblx0ICAgIGRhdGEudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3IudmFsdWUgPSBlXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzUmVmKHVybCkpIHtcbiAgICAvLyBzZXR1cCByZWFjdGl2ZSByZS1mZXRjaCBpZiBpbnB1dCBVUkwgaXMgYSByZWZcbiAgICB3YXRjaEVmZmVjdChkb0ZldGNoKVxuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwganVzdCBmZXRjaCBvbmNlXG4gICAgZG9GZXRjaCgpXG4gIH1cblxuICByZXR1cm4geyBkYXRhLCBlcnJvciwgcmV0cnk6IGRvRmV0Y2ggfVxufVxuXG4vLyBhcnRpZmljaWFsIGRlbGF5XG5mdW5jdGlvbiB0aW1lb3V0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjMpIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdSYW5kb20gRXJyb3InKSlcbiAgICAgIH1cbiAgICB9LCAzMDApXG4gIH0pXG59In0=), với khoảng delay giả và lỗi random để demo.

## Quy ước và Best Practice {#conventions-and-best-practices}

### Đặt tên {#naming}

Theo quy ước, tên của các hàm composable có dạng camelCase và bắt đầu với "use".

### Tham số đầu vào {#input-arguments}

Một composable có thể nhận tham số ref kể cả nó không phụ thuộc vào các ref này cho reactivity. Nếu bạn viết một composable (mà có thể sau này dev khác sẽ dùng), bạn nên xử lý thêm xử lý cho trường hợp tham số là các ref, thay vì giá trị tĩnh. Hàm [`unref()`](/api/reactivity-utilities.html#unref) sẽ hữu ích cho mục đích này:

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // nếu maybeRef is indeed a thực sự là một ref, giá trị của nó sẽ được trả về
  // nếu không, trả về chính maybeRef
  const value = unref(maybeRef)
}
```

Nếu composable tạo các reactive effect khi đầu vào là một ref, bạn cần "watch" (quan sát) ref với `watch()`, hoặc dùng `unref()` bên trong một `watchEffect()` để  có thể theo dõi khi ref cập nhật.

### Các giá trị trả về {#return-values}

Có lẽ bạn đã để ý rằng chúng ta đang chỉ sử dụng `ref()` thay vì `reactive()` trong các composable. Quy ước gợi ý với các composable là luôn trả về một object JS không reactive, trong đó chứa các ref. Cách này cho phép destructure object trong các component, trong khi vẫn giữ lại reactivity:

```js
// x và y là các ref
const { x, y } = useMouse()
```

Trả về một reactive object từ composable sẽ khiến quá trình destructure làm mất kết nối reactivity tới state bên trong composable, trong khi các ref sẽ giữ lại kết nối này.

Nếu bạn muốn trả về state từ các composable theo kiểu các property của object, bạn có thể wrap giá trị trả về với `reactive()` để các ref vẫn unwrapped. Ví dụ:

```js
const mouse = reactive(useMouse())
// mouse.x được link tới ref gốc
console.log(mouse.x)
```

```vue-html
Vị trí của con trỏ chuột là: {{ mouse.x }}, {{ mouse.y }}
```

### Các Side Effect {#side-effects}

Bạn hoàn toàn có thể thực hiện các side effect (ví dụ thêm DOM event listener hoặc fetch data) trong composable, chỉ cần để ý các quy định dưới đây:

- Nếu bạn đang làm việc với ứng dụng [Server-Side Rendering](/guide/scaling-up/ssr.html) (SSR), đảm bảo rằng chỉ thực hiện các side effect liên quan đến DOM trong các lifecycle hook sau khi mount, ví dụ `onMounted()`. Các hook này chỉ được gọi ở trên trình duyệt, nên code bên trong hook có thể truy cập tới DOM.

- Nhớ clean các side effect trong `onUnmounted()`. Ví dụ, nếu một composable cài một DOM event listener thì cần loại bỏ listener trong `onUnmounted()` như ta đã thấy trong ví dụ `useMouse()`. Tốt hơn nên có một composable làm việc này tự động, ví dụ như `useEventListener()` ở trên.

### Những hạn chế {#usage-restrictions}

Các composable chỉ nên được gọi **synchronously (đồng bộ)** bên trong `<script setup>` hoặc `setup()` hook. Trong một số trường hợp, bạn có thể gọi chúng ở trong các hook, ví dụ `onMounted()`.

Đây là các phạm vi mà Vue có thể xác định được bạn đang dùng composable bên trong component instance nào. Cần xác định component instance vì:

1. Các lifecycle hook có thể gán vào instance.

2. Các thuộc tính Computed và các watcher có thể gắn vào instance, để chúng được xử lý khi instance unmounted để không bị tràn bộ nhớ.

:::tip
`<script setup>` là chỗ duy nhất bạn có thể gọi các composable **sau khi** dùng `await`. Compiler tự động phục hồi instance context cho bạn sau khi chạy xong async.
:::

## Tách các composable để tổ chức code tốt hơn {#extracting-composables-for-code-organization}

Các composable có thể được tách ra, không chỉ để tái sử dụng mà còn giúp tổ chức code tốt hơn. Khi các component của bạn phức tạp dần lên, việc theo dõi code là rất khó. Composition API cho bạn đủ sự linh động để tổ chức component của bạn thành các hàm nhỏ hơn, dựa vào logic:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

Ở mức độ nào đó, bạn có thể nghĩ các composable này như là các service ở phạm vi component, và chúng có thể giao tiếp với nhau.

## Dùng composable trong Options API {#using-composables-in-options-api}

Nếu bạn đang dùng Options API, bạn phải gọi các composable trong `setup()`, và các ràng buộc phải được trả về từ `setup()` để chúng được expose tới `this` và template:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // các thuộc tính expose từ setup() có thể truy cập bằng `this`
    console.log(this.x)
  }
  // ...các option khác
}
```

## So sánh với các kỹ thuật khác {#comparisons-with-other-techniques}

### vs. Mixins {#vs-mixins}

Người dùng Vue 2 có thể quen với [mixins](/api/options-composition.html#mixins), cái cũng cho phép ta tách component logic thành các unit có thể tái sử dụng. Có ba hạn chế đối với mixin:

1. **Nguồn gốc của các thuộc tính không rõ ràng**: khi sử dụng nhiều mixin, sẽ không rõ ràng để biết thuộc tính instance nào được inject bới mixin nào, làm ta khó theo dõi và khó để hiểu hành vi của component. Đây cũng là lý do chúng tôi khuyên sử dụng ref + destructure cho composable: nó giúp nguồn của các thuộc tính rõ ràng trong các component.

2. **Xung đột namespace**: mixin từ các dev khác nhau có thể tiềm tàng đăng ký cùng key, làm xung đột namespace. Với composable, bạn có thể thay đổi các biến được destructure nếu có conflict từ composable khác nhau.

3. **Giao tiếp ẩn giữa các mixin**: các mixin tương tác với mixin khác sẽ phụ thuộc vào các thuộc tính được share, làm chúng bắt cặp với nhau không rõ ràng. Với composable, giá trị trả về từ một composable có thể truyền vào composable khác như là tham số, giống như hàm bình thường.

Vì các lý do trên, chúng tôi không khuyến khích dùng mixin trong Vue 3. Chức năng này được giữ để giúp migration (Vue 2 lên Vue 3) và do nó đã quen thuộc.

### vs. Renderless Components {#vs-renderless-components}

In the component slots chapter, we discussed the [Renderless Component](/guide/components/slots.html#renderless-components) pattern based on scoped slots. We even implemented the same mouse tracking demo using renderless components.

The main advantage of composables over renderless components is that composables do not incur the extra component instance overhead. When used across an entire application, the amount of extra component instances created by the renderless component pattern can become a noticeable performance overhead.

The recommendation is to use composables when reusing pure logic, and use components when reusing both logic and visual layout.

### vs. React Hooks {#vs-react-hooks}

If you have experience with React, you may notice that this looks very similar to custom React hooks. Composition API was in part inspired by React hooks, and Vue composables are indeed similar to React hooks in terms of logic composition capabilities. However, Vue composables are based on Vue's fine-grained reactivity system, which is fundamentally different from React hooks' execution model. This is discussed in more detail in the [Composition API FAQ](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Further Reading {#further-reading}

- [Reactivity In Depth](/guide/extras/reactivity-in-depth.html): for a low-level understanding of how Vue's reactivity system works.
- [State Management](/guide/scaling-up/state-management.html): for patterns of managing state shared by multiple components.
- [Testing Composables](/guide/scaling-up/testing.html#testing-composables): tips on unit testing composables.
- [VueUse](https://vueuse.org/): an ever-growing collection of Vue composables. The source code is also a great learning resource.
