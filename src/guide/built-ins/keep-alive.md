<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive {#keepalive}

`<KeepAlive>` — це вбудований компонент, який дозволяє умовно кешувати екземпляри компонентів під час динамічного перемикання між декількома компонентами.

## Основне використання {#basic-usage}

У розділі «Основи компонентів» ми представили синтаксис для [динамічних компонентів](/guide/essentials/component-basics#dynamic-components), використовуючи спеціальний елемент `<component>`:

```vue-html
<component :is="activeComponent" />
```

За промовчанням екземпляр активного компонента буде демонтовано, якщо його вимкнути. Це призведе до втрати будь-якого зміненого стану. Коли цей компонент буде показано знову, буде створено новий екземпляр лише з початковим станом.

У наведеному нижче прикладі ми маємо два компоненти зі збереженням стану: A містить лічильник, а Б містить повідомлення, синхронізоване з введенням через `v-model`. Спробуйте оновити стан одного з них, вимкніться, а потім поверніться до нього:

<SwitchComponent />

Ви помітите, що після перемикання назад попередній змінений стан було б скинуто.

Створення нового екземпляра компонента є корисною поведінкою, але в цьому випадку ми дійсно хотіли б, щоб два екземпляри компонента зберігалися, навіть якщо вони неактивні. Щоб вирішити цю проблему, ми можемо обернути наш динамічний компонент вбудованим компонентом `<KeepAlive>`:

```vue-html
<!-- Неактивні компоненти будуть кешовані! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

Тепер стан буде збережено для компонентів:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbmNvbnN0IGN1cnJlbnQgPSBzaGFsbG93UmVmKENvbXBBKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEJcIiAvPiBCPC9sYWJlbD5cbiAgICA8S2VlcEFsaXZlPlxuICAgICAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50XCI+PC9jb21wb25lbnQ+XG4gICAgPC9LZWVwQWxpdmU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBjb3VudCA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+Q3VycmVudCBjb21wb25lbnQ6IEE8L3A+XG4gIDxzcGFuPmNvdW50OiB7eyBjb3VudCB9fTwvc3Bhbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJjb3VudCsrXCI+KzwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cbiIsIkNvbXBCLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5jb25zdCBtc2cgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ29tcEEsIENvbXBCIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJkZW1vXCI+XG4gICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIiB2LW1vZGVsPVwiY3VycmVudFwiIHZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgdmFsdWU9XCJDb21wQlwiIC8+IEI8L2xhYmVsPlxuICAgIDxLZWVwQWxpdmU+XG4gICAgICA8Y29tcG9uZW50IDppcz1cImN1cnJlbnRcIj48L2NvbXBvbmVudD5cbiAgICA8L0tlZXBBbGl2ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBBLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQTwvcD5cbiAgPHNwYW4+Y291bnQ6IHt7IGNvdW50IH19PC9zcGFuPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj4rPC9idXR0b24+XG48L3RlbXBsYXRlPlxuIiwiQ29tcEIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXNnOiAnJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>

:::tip
У разі використання в [шаблонах DOM](/guide/essentials/component-basics#dom-template-parsing-caveats) на нього слід посилатися як `<keep-alive>`.
:::

## Включити / Виключити {#include-exclude}

За замовчуванням `<KeepAlive>` кешуватиме будь-який екземпляр компонента всередині. Ми можемо налаштувати цю поведінку за допомогою атрибутів `include` і `exclude`. Обидва атрибути можуть бути рядком із розділеними комами, `RegExp` або масивом, що містить один із типів:

```vue-html
<!-- рядок, розділений комами -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- регулярний вираз (використовуйте `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- Масив (використовуйте `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

Збіг перевіряється з параметром [`name`](/api/options-misc#name) компонента, тому компоненти, які потрібно умовно кешувати за допомогою `KeepAlive`, повинні явно оголосити параметр `name`.

:::tip
Починаючи з версії 3.2.34, однофайловий компонент, який використовує `<script setup>`, автоматично визначатиме свій параметр `name` на основі назви файлу, усуваючи необхідність вручну оголошувати назву.
:::

## Максимальна кількість кешованих екземплярів {#max-cached-instances}

Ми можемо обмежити максимальну кількість екземплярів компонентів, які можна кешувати, за допомогою властивості `max`. Якщо вказано `max`, `<KeepAlive>` поводиться як [кеш LRU](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>): якщо кількість кешованих екземплярів приблизно щоб перевищити вказану максимальну кількість, кешований екземпляр, до якого нещодавно зверталися, буде знищено, щоб звільнити місце для нового.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## Життєвий цикл кешованого екземпляра {#lifecycle-of-cached-instance}

Коли екземпляр компонента видаляється з DOM, але є частиною дерева компонентів, кешованого `<KeepAlive>`, він переходить у **деактивований** стан замість того, щоб бути демонтованим. Коли екземпляр компонента вставляється в DOM як частину кешованого дерева, він **активується**.

<div class="composition-api">

Компонент, що підтримує роботу, може реєструвати хуки життєвого циклу для цих двох станів за допомогою [`onActivated()`](/api/composition-api-lifecycle#onactivated) і [`onDeactivated()`](/api/composition-api-lifecycle#ondeactivated):

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // викликається під час початкового монтування
  // і кожного разу, коли він повторно вставляється з кешу
})

onDeactivated(() => {
  // викликається при видаленні з DOM у кеш
  // а також коли розмонтуванні
})
</script>
```

</div>
<div class="options-api">

Компонент може реєструвати хуки життєвого циклу для цих двох станів за допомогою хуків [`activated`](/api/options-lifecycle#activated) та [`deactivated`](/api/options-lifecycle#deactivated):

```js
export default {
  activated() {
    // викликається під час початкового монтування
    // і кожного разу, коли він повторно вставляється з кешу
  },
  deactivated() {
    // викликається при видаленні з DOM у кеш
    // а також коли розмонтуванні
  }
}
```

</div>

Зауважте:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> також викликається під час монтування, а <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> під час демонтування.

- Обидва хуки працюють не лише для кореневого компонента, кешованого `<KeepAlive>`, але й для компонентів-нащадків у кешованому дереві.

---

**Пов'язані**

- [Посилання на API `<KeepAlive>`](/api/built-in-components#keepalive)
