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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqtkrFOwzAQhl/llKWgAmaOTETLyMacJaQuRDi2lThBqOpShBjZWOEREAIJCi2v4LwRZyeUBoQqpA6J4vN3d/n/u5HXU2qnLJjnezSPs0RpyJkuVBCKJFUy0zCC/DTiXJ4fsSGMYZjJFDqY0VkQBzJVveZih7iTLdkG+i2g3wChiKXINcRFljGhYW+p2YartBkKSuo/w3/Cg2ap4pFmeAKgg6SEmEd5vhd6A5bK0HNxvOHRMeMBTYQqNOgLxZDIokGCCJTbqRwwjpGmMcb8MuKFhVxbDJAAepTUZdZRs1/X7P+oeciY6vGkrAW5UIy0FNYPP7HCFgUDShZ3X/mkXYAStAS/KFkyytuqVa2adPZrxIsBycKNB4mN3RUzUYG5M/Nqgs+1mZkX8wpmaubm3Xzge2aezaya+NZc2xwTchWJwNybh+qqukRgbqY+jEZN0/EYm1nCsceF1lLAfsyT+Mx6Y5luF73pUlJf/qHe7dz/1Nfa0/ykUd7prEc67kBLOuaYx+rWPDn0zWII3jgTbPe2BfX6fe8bEm7t26LHn75Mei8=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqtk0tOwzAQhq8yyqagFsw6MhEtS67QjUlcFOEkVuJUoCqbIsSSHVs4AkIgQaHlCs6NGNttIQVU8ZDymvE3M/Y/k5HXlXJ7WHLP92gR5rFUQT+NE5nlCvazRHZhkGcJtLaJtQzaagC9BtCbAwD9lJ9YKOIDVgoFI+MNkclSnqrCh5Er0JmnqToGiJhiG5sOBsi5KvN0YWF4mecY7EPLhtpCAJV54QMvSpaHQEPxRAqmOFoANIqHEApWFLt9L+JJ1vesH1cEO+QioHEqSwXqVHIkchbFiMBwK8kiLtAzL258TJSGsZtAmwTQpcRl+YeUPZeyt5LygHPZFfHQHce6lnKCH5tjLfMFlCzXFvGkmYASFAS/KPkgk9dxh/o0El81c02vstJ0audHPZKBvtazeoz3hZ7qR/0EeqJn+kW/4nOqH/S0HvtGbekCCsnSQN/o2/q8PkNgpic4WSNXHaoKixnCsoelUlkKe6GIw2OjlmHabVSrTYlb/EYPO9Z/1CMpjnBu14zsbwXBWWkIgjH6rr7S9xZ9NhiCl1Ya3MiKMG5K38cSCftzNKWo3gDzuY1z)

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
