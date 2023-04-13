<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# TransitionGroup {#transitiongroup}

`<TransitionGroup>` — це вбудований компонент, розроблений для анімації вставки, видалення та зміни порядку елементів або компонентів, які відображаються у списку.

## Відмінності від `<Transition>` {#differences-from-transition}

`<TransitionGroup>` підтримує ті самі властивості, класи переходів CSS і хуки слухачів JavaScript, що й `<Transition>`, з такими відмінностями:

- За промовчанням він не відображає елемент обгортки. Але ви можете вказати елемент для візуалізації за допомогою властивості `tag`.

- [Режими переходу](./transition#transition-modes) недоступні, оскільки ми більше не чергуємо взаємовиключні елементи.

- Елементи всередині **завжди повинні** мати унікальний атрибут `key`.

- Класи переходу CSS будуть застосовані до окремих елементів у списку, а **не** до самої групи/контейнера.

:::tip
У разі використання в [шаблонах DOM](/guide/essentials/component-basics#dom-template-parsing-caveats) на нього слід посилатися як `<transition-group>`.
:::

## Вхід / вихід з переходів {#enter-leave-transitions}

Ось приклад застосування переходів «входу/виходу» до списку `v-for` за допомогою `<TransitionGroup>`:

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## Перехід переміщення {#move-transitions}

Наведена вище демонстрація має кілька очевидних недоліків: коли елемент вставляється або видаляється, елементи, що його оточують, миттєво «стрибають» на місце замість того, щоб рухатися плавно. Ми можемо виправити це, додавши кілька додаткових правил CSS:

```css{1,13-17}
.list-move, /* застосувати перехід до рухомих елементів */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* переконайтеся, що кінцеві елементи вилучено з потоку, щоб перемістити
  анімації можна правильно розрахувати. */
.list-leave-active {
  position: absolute;
}
```

Тепер це виглядає набагато краще - навіть анімація плавна, коли весь список перемішується:

<ListMove />

[Повний приклад](/examples/#list-transition)

## Нестійкі переходи списків {#staggering-list-transitions}

Зв’язуючись із переходами JavaScript через атрибути, можна також розмістити переходи в списку. Спочатку ми візуалізуємо індекс елемента як атрибут в елементі DOM:


```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

Потім в хуках JavaScript ми додаємо анімацію елементу зі затримкою на основі атрибута `data`. У цьому прикладі для виконання анімації використовується [бібліотека GreenSock](https://greensock.com/):

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqlVD2P00AQ/SsjN3ZQYl8KKKzk+DghmpR0mMI4k2S59a7xrgNRFOkOeiQklAJEh0SLhKA46fgN63/E7NpOLuEaRGN734znvXkz9tp7WBThskIv9kYqK1mhQaGuitNEsLyQpYY1lDjrQybzotI4hQ3MSpmDTy/5u6S5SosWt48USEQmhdLAGV3G8CwRQKVyNY/BNx/qi/p9fQnmc731YdM/CH40v8xPc1VvwXwz3831XwkWvQLzxfymMhf1tr68vUb99naCT/U7c21+gPmaJD7poBKUk4jne9WvKixXJJtaD3y/tw90NkyatrpjEPRgfApry1OSf6VwjYczxjWWQcA05i7DPoSkI9RyIl9jeZYqDHohExmvpqgCRxwuU15hj2g3jnpWiUwzKUCKRziTJT4WtiryXsOIPFR6xTGURZoxbYWfHOALZPOF1UswNXpQsavVh6kU2Fa0QySJDnYAQFs7hqFzE6ApSoYOw3uY+y06RZ5SElFPU03Naeptim/gDpyEw7ttkhRnZBxHjbFjtaht9VjbBNMl/ou2kyNt3fl/VY2i5uOgz4IONMOCpxrpBDBiglYAloNcEss48dwIEw+iJvy0TIVitqEnpayKhkqnc8qseOI15zhTioBZyhV22IMXbtYDtAOi4MHwd0n76CHOrXUOdyY2uFNEmjhrHoBkU0lKcxvaB+dKj24Hi94VJZ3nuKLsbotvBKyvA/e6jdt7F2xJ6QNc79YfNmSqkxJx1vgUHRlF6Ci64bTX95qfzSCn+b9UUtA/y82f+FxAJV7cbUTi2TWxQOIttC5UHEWVKM7nITUW2dh9mlfFW2NIzcbb/AHpo8Rl)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNqtVE1v00AQ/SsjX5KgxG4PcLDS8lEhLj1yYzmYeJIsXe8a7zo0iiK1cEdCQj2AuCFxRUJwqFR+w/ofMbuOXYfkhBpFtnfe+M3bN7NeBY/zPFyUGMTBWE8KnptjJnmWq8LATCc5TAuVQc899phkcqKkNiA4XY7gBZMAK8j0LIae/VhdVB+qS7BfqqserIdb4Cf72/6y19UV2O/2h73ZSXDRa7Bf7R+iuaiuqsv9HNW7/QU+V+/tjf0J9htjPdJBFJTD5EunGs/9hlKcJqUwsHJvpolJ+oP6GaBAUxayWQG8KbFYEi9t2i2JiC6+4kRleWkwjZvkJnBKptwStpTOq3DKhcGi3+cGswEcHYN7CEl6aNSpeovFSaKxPwi5nIgyRd03c65DL2Iw2JGQoZmrVLcKlHyCU1XgU+mKoOiIQBFqsxQYqjyZcLOkrh3sYHPks7lr6AaqqzjehnEIqZLY4XUDQdo91AbpjbpKDIcbCver6cnMw/ABZr0OkqJIKJmEuG5oNGRAiudwDw7Cw/udRCVPyGWBBmOvpEHWjTmt4lNMFvg/ig/2KO7G7k6rbyST9B9H7ZmjBY1ELhKDtAIYc0lTBYtRpqjyEQv8MLAAohp+XiRSc8OVfFaoMq+pTTKjzFKwoF7HE60pME2Exib26JWflRG61hK4NTxt0i26HRfOXh/3Rtdxr4g0Cd7sdTEiSkrzAz8E79SAbluHpSElnWe4pOzmUHQA5/XIv+5wd2/ATVH6BKza0wRrby5JiQSvfYr+MYqi46jjdDAM6s/dKKP5eK2VpE+hnw+q5wHNgvakscCNkQuwYG5MruMoKmV+NgtpY5HDHlK/SrExxnU5WP8FGBLJeg==)

</div>

---

**Пов'язані**

- [Посилання на API `<TransitionGroup>`](/api/built-in-components#transitiongroup)
