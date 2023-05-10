<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# Сохранение состояния {#keepalive}

`<KeepAlive>` это встроенный компонент, который позволяет условно кэшировать экземпляры компонентов при динамическом переключении между несколькими компонентами.

## Базовое использование {#basic-usage}

В главе "Основы компонентов" мы представили синтаксис для [Динамических компонентов](/guide/essentials/component-basics.html#dynamic-components), используя специальный элемент `<component>`:

```vue-html
<component :is="activeComponent" />
```

По умолчанию активный экземпляр компонента будет размонтирован при переключении с него. Это приведет к потере любого измененного состояния, которое оно содержит. При повторном отображении этого компонента будет создан новый экземпляр только с начальным состоянием.

В приведенном ниже примере у нас есть два компонента с состоянием: компонент A содержит счетчик, а компонент B содержит сообщение, синхронизированное с введенным значением через `v-model`. Попробуйте обновить состояние одного из них, переключиться на другой компонент, а затем вернуться к нему:

<SwitchComponent />

Вы заметите, что при обратном переключении предыдущее измененное состояние будет сброшено.

Создание нового экземпляра компонента при переключении обычно является полезным поведением, но в этом случае нам бы очень хотелось, чтобы два экземпляра компонента сохраняли свое состояние, даже когда они неактивны. Чтобы решить эту проблему, мы можем обернуть наш динамический компонент встроенным компонентом `<KeepAlive>`:

```vue-html
<!-- Неактивные компоненты будут кэшироваться! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

Теперь состояние будет сохраняться при переключении компонентов:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbmNvbnN0IGN1cnJlbnQgPSBzaGFsbG93UmVmKENvbXBBKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEJcIiAvPiBCPC9sYWJlbD5cbiAgICA8S2VlcEFsaXZlPlxuICAgICAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50XCI+PC9jb21wb25lbnQ+XG4gICAgPC9LZWVwQWxpdmU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBjb3VudCA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+Q3VycmVudCBjb21wb25lbnQ6IEE8L3A+XG4gIDxzcGFuPmNvdW50OiB7eyBjb3VudCB9fTwvc3Bhbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJjb3VudCsrXCI+KzwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cbiIsIkNvbXBCLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5jb25zdCBtc2cgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>
<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ29tcEEsIENvbXBCIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJkZW1vXCI+XG4gICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIiB2LW1vZGVsPVwiY3VycmVudFwiIHZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgdmFsdWU9XCJDb21wQlwiIC8+IEI8L2xhYmVsPlxuICAgIDxLZWVwQWxpdmU+XG4gICAgICA8Y29tcG9uZW50IDppcz1cImN1cnJlbnRcIj48L2NvbXBvbmVudD5cbiAgICA8L0tlZXBBbGl2ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBBLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQTwvcD5cbiAgPHNwYW4+Y291bnQ6IHt7IGNvdW50IH19PC9zcGFuPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj4rPC9idXR0b24+XG48L3RlbXBsYXRlPlxuIiwiQ29tcEIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXNnOiAnJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>

:::tip Совет
При использовании в [DOM-шаблонах](/guide/essentials/component-basics.html#dom-template-parsing-caveats), на него следует ссылаться как на `<keep-alive>`.
:::

## Включение / Исключение {#include-exclude}

По умолчанию `<KeepAlive>` будет кэшировать любой экземпляр компонента внутри. Мы можем настроить это поведение с помощью параметров `include` и `exclude`. Оба свойства могут быть строками, разделенными запятыми, `RegExp`, или массивами, содержащими элементы типа:

```vue-html
<!-- строка, разделённая запятыми -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- регулярное выражение (используйте `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- массив (используйте `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

Соответствие проверяется параметром [`name`](/api/options-misc.html#name) компонента, поэтому компоненты, которые должны быть условно кэшированы с помощью `KeepAlive` должны явно объявлять параметр `name`.

:::tip Совет
Начиная с версии 3.2.34, однофайловый компонент, использующий `<script setup>`, будет автоматически определять собственный `name` на основе имени файла, устраняя необходимость вручную объявлять имя.
:::

## Максимальное количество кэшированных экземпляров {#max-cached-instances}

Мы можем ограничить максимальное количество экземпляров компонентов, которые можно кэшировать с помощью опции `max`. Когда `max` задан, `<KeepAlive>` ведет себя как [LRU cache](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>): если количество закэшированных экземпляров вот-вот превысит указанное максимальное количество, то наименее недавно использованный закэшированный экземпляр будет уничтожен, чтобы освободить место для нового.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## Жизненный цикл кэшированного экземпляра {#lifecycle-of-cached-instance}

Когда экземпляр компонента удаляется из DOM, но является частью дерева компонентов, кэшированного `<KeepAlive>`, он переходит в состояние **деактивированного** вместо того, чтобы быть размонтированным. Когда экземпляр компонента вставляется в DOM как часть кэшированного дерева, он **активируется**.

<div class="composition-api">

Также наш компонент может регистрировать хуки жизненного цикла для этих двух состояний [`onActivated()`](/api/composition-api-lifecycle.html#onactivated) и [`onDeactivated()`](/api/composition-api-lifecycle.html#ondeactivated):

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // вызывается при первоначальном монтировании
  // и каждый раз, когда он повторно вставляется из кэша
})

onDeactivated(() => {
  // вызывается, когда удаляется из DOM в кэш
  // и также при размонтировании
})
</script>
```

</div>
<div class="options-api">

Также наш компонент может регистрировать хуки жизненного цикла для этих двух состояний [`activated`](/api/options-lifecycle.html#activated) и [`deactivated`](/api/options-lifecycle.html#deactivated) хуки:

```js
export default {
  activated() {
    // вызывается при первоначальном монтировании
    // и каждый раз, когда он повторно вставляется из кэша
  },
  deactivated() {
    // вызывается, когда удаляется из DOM в кэш
    // и также при размонтировании
  }
}
```

</div>

Обратите внимание, что:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> также вызывается при монтировании, и <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> при размонтировании.

- Оба хука работают не только с корневым компонентом, кэшированным `<KeepAlive>`, но и с дочерними компонентами в кэшированном дереве.

---

**Связанные**

- [`<KeepAlive>` API reference](/api/built-in-components.html#keepalive)
