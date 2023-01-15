# Доступність {#accessibility}

Вебдоступність (також відома як a11y) відноситься до практики створення вебсайтів, які можуть використовуватися будь-ким — будь то особа з обмеженими можливостями, або хто має інтернет з повільним з’єднанням, застарілим чи несправним обладнанням, або просто знаходиться у несприятливому середовищі. Наприклад, додавання субтитрів до відео допоможе як користувачам із вадами слуху, так і користувачам, які перебувають у гучному середовищі й не чують свій телефон. Аналогічно, якщо переконатися, що ваш текст не надто низькоконтрастний, то це допоможе як користувачам з ослабленим зором, так і користувачам, які намагаються використовувати свій телефон при яскравому сонячному світлі.

Готові почати, але не знаєте з чого?

Ознайомтеся з [гідом планування та керування веб-доступністю](https://www.w3.org/WAI/planning-and-managing/) від [World Wide Web Consortium (W3C)](https://www.w3.org/)

## Посилання для переходу до основного контенту {#skip-link}

Ви повинні додати посилання у верхню частину кожної сторінки, щоб користувачі могли швидко перейти до області основного вмісту на ній і пропустити елементи, що повторюються, на веб-сторінках.

Зазвичай таке посилання розміщується у верхній частині розмітки головного компонента `App.vue`, оскільки воно повинно бути першим сфокусованим елементом на всіх сторінках:

```vue-html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
  </li>
</ul>
```

Приховувати посилання, доки воно не отримає фокус, можна за допомогою стилів:

```css
.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

При переході на іншу сторінку повертаємо фокус назад на посилання. Для цього викличемо відповідний метод на елементі через `ref` (за умови використання `vue-router`):

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

</div>

[Ознайомитись з документацією про реалізацію посилань для переходу до основного вмісту](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Структурування вмісту {#content-structure}

Один із найважливіших елементів доступності – розробка дизайну з прицілом на доступність. Дизайн повинен розглядати не лише колірний контраст, шрифт, розмір тексту та мову, але й те, як вміст має бути структурований у додатку.

### Заголовки {#headings}

Користувачі можуть переміщатися в додатку за допомогою заголовків. Наявність описових заголовків для кожного розділу вашого додатка полегшує користувачам передбачити вміст кожного розділу. Що стосується заголовків, є кілька рекомендованих практик доступності:

- Використовуйте вкладені заголовки в порядку їхньої черговості: `<h1>` - `<h6>`
- Не пропускайте заголовки всередині розділу
- Використовуйте теги заголовків замість візуальної стилізації тексту під нього

[Дізнатись докладніше про заголовки](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Main title</h1>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- Content -->
  </section>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- Content -->
    <h3>Section Subtitle</h3>
    <!-- Content -->
  </section>
</main>
```

### Орієнтири {#landmarks}

[Орієнтири](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) забезпечують програмний доступ до розділів додатку. Користувачі, які використовують допоміжні технології, можуть безпосередньо переходити до кожного розділу додатку, обминаючи решту вмісту. Для цього використовуйте [ARIA ролі](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) які допоможуть вам досягти цього.

| HTML            | ARIA роль            | Призначення орієнтиру                                                                                                 |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"        | Основний заголовок: заголовок сторінки                                                                                 |
| nav             | role="navigation"    | Колекція посилань для переміщення по сторінці або іншим сторінкам documents                           |
| main            | role="main"          | Основний або найважливіший вміст документа.                                                                     |
| footer          | role="contentinfo"   | Відомості про головний документ: виноски/авторські права/посилання на конфіденційність                           |
| aside           | role="complementary" | Підтримує основний вміст, але є відокремленим і значущим за власним вмістом                                    |
| _Not available_ | role="search"        | Розділ, що містить функціональність пошуку по додатку                                               |
| form            | role="form"          | Колекція елементів форми                                                                           |
| section         | role="region"        | Супутній вміст, який користувач, можливо, захоче вивчити. Для такого елемента потрібно вказати мітку |

:::tip Порада:
Рекомендується використовувати орієнтири HTML-елементів із надлишковими атрибутами ролей, щоб максимально підвищити сумісність із застарілими версіями [браузерів, які не підтримують семантичні елементи HTML5](https://caniuse.com/#feat=html5semantic).
:::

[Дізнатись докладніше про орієнтири](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## Семантичні форми {#semantic-forms}

При створенні форми можна використовувати наступні елементи: `<form>`, `<label>`, `<input>`, `<textarea>`, and `<button>`

Мітки зазвичай розміщуються зверху або зліва від полів форми:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Надіслати</button>
</form>
```

<!-- <common-codepen-snippet title="Simple Form" slug="dyNzzWZ" :height="368" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Зверніть увагу, яким чином ви можете включити `autocomplete='on'` в елемент форми, і це буде застосовано до всіх полів input у вашій формі. Ви також можете встановити різні [значення для атрибута autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) для кожного поля input.

### Мітки {#labels}

Надайте мітки, для опису полів форми та для створення зв'язку між елементами з атрибутами `for` і `id`:

```vue-html
<label for="name">Name</label>
<input type="text" name="name" id="name" v-model="name" />
```

<!-- <common-codepen-snippet title="Form Label" slug="XWpaaaj" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Якщо оглянути цей елемент через інструменти розробника в Chrome і перейти на вкладку Accessibility у розділі Elements, можна побачити, що поле отримує ім'я з його мітки:

![Інструменти розробника Chrome показують ім’я поля, отримане з його мітки](./images/AccessibleLabelChromeDevTools.png)

:::warning Увага:
Хоча ви, можливо, бачили мітки, де поля input знаходиться всередині, як це:

```vue-html
<label>
  Name:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

Явна вказівка мітки з відповідним id краще підтримується допоміжними технологіями.
:::

#### `aria-label`

Ви також можете дати полю input доступну назву за допомогою [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).

```vue-html
<label for="name">Name</label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

<!-- <common-codepen-snippet title="Form ARIA label" slug="NWdvvYQ" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Не соромтеся перевірити цей елемент в Chrome DevTools, щоб побачити, як змінилася доступна назва:

![Інструменти розробника Chrome показують доступну назву input з aria-label](./images/AccessibleARIAlabelDevTools.png)

#### `aria-labelledby`

Використання атрибуту [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) подібний до `aria-label`, за винятком того, що він використовується, якщо текст мітки видно на екрані. Він створює зв'язок між елементами з атрибутом id, при цьому допускається вказати кілька id:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Надіслати</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA labelledby" slug="MWJvvBe" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

![Інструменти розробника Chrome показують доступну назву input з aria-labelledby](./images/AccessibleARIAlabelledbyDevTools.png)

#### `aria-describedby`

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) використовується так само як `aria-labelledby`, за винятком надання опису з додатковою інформацією, яка може знадобитися користувачеві. Це можна використовувати для опису критеріїв для будь-якого input:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Full Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Please provide first and last name.</p>
  </div>
  <button type="submit">Надіслати</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA describedby" slug="gOgxxQE" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

Ви можете переглянути опис, переглянувши Chrome DevTools:

![Інструменти розробника Chrome показують доступну назву input з aria-labelledby і опис з aria-describedby](./images/AccessibleARIAdescribedby.png)

### Підказка всередині поля {#placeholder}

Намагайтеся обмежити використання підказок усередині поля, оскільки вони можуть заплутати багатьох користувачів.

Одна із проблем підказок усередині поля в тому, що за умовчанням вони не відповідають [критеріям колірного контрасту](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) Спроба виправити колірний контраст робить підказку схожу на попередньо заповнені дані в input полях. Подивіться на наступний приклад: підказка поля Last Name відповідає критеріям колірного контрасту, хоча вона не відрізняється від поля з підставленим значенням:

![Доступна підказка](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">Надіслати</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

Всю необхідну інформацію для заповнення найкраще показати поза полів форми.

### Інструкції {#instructions}

Додаючи інструкції для полів input, переконайтеся, що їх правильно пов'язано з input.
Ви можете надати додаткові інструкції та зв'язати кілька ідентифікаторів усередині [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). Це робить дизайн більш гнучким.

```vue-html
<fieldset>
  <legend>Використання aria-labelledby</legend>
  <label id="date-label" for="date">Поточна дата:</label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

Крім того, ви можете прикріпити інструкції до input за допомогою [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby):

```vue-html
<fieldset>
  <legend>Using aria-describedby</legend>
  <label id="dob" for="dob">Дата народження:</label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

<!-- <common-codepen-snippet title="Form Instructions" slug="WNREEqv" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Приховування вмісту {#hiding-content}

Зазвичай не рекомендується візуально приховувати мітки, навіть якщо input має доступну назву. Однак, якщо функціональність input можна зрозуміти з навколишнього вмісту, тоді ми можемо приховати візуальну мітку.

Розгляньмо це поле пошуку:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">Пошук: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Пошук</button>
</form>
```

Ми можемо це зробити, оскільки кнопка пошуку допоможе користувачам візуально визначити призначення поля input.

Ми можемо використовувати CSS, щоб візуально приховати елементи, але залишити їх доступними для допоміжних технологій:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

<!-- <common-codepen-snippet title="Form Search" slug="QWdMqWy" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

#### `aria-hidden="true"`

Додавання `aria-hidden="true"` приховає елемент від допоміжних технологій, але залишить його візуально доступним для інших користувачів. Не використовуйте його на елементах, які можна сфокусувати, а застосовувуйте тільки для декоративних, дублюючих або не відображених на екрані елементах.

```vue-html
<p>Це не приховано від програм зчитування з екрана.</p>
<p aria-hidden="true">Це приховано від програм зчитування з екрана.</p>
```

### Кнопки {#buttons}

Якщо ви використовуєте кнопки всередині форми, вам слід вказувати їх тип, щоб запобігти відправленню форми.
Ви можете також використовувати input для створення кнопок:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- Buttons -->
  <button type="button">Скасувати</button>
  <button type="submit">Надіслати</button>

  <!-- Input buttons -->
  <input type="button" value="Cancel" />
  <input type="submit" value="Submit" />
</form>
```

<!-- <common-codepen-snippet title="Form Buttons" slug="JjEyrYZ" :height="467" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Функціональні зображення {#functional-images}

За допомогою цієї техніки можна створювати функціональні зображення.

- Input поля

  - Ці зображення виконуватимуть функцію кнопки відправлення у формах

  ```vue-html
  <form role="search">
    <label for="search" class="hidden-visually">Пошук: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="Search"
    />
  </form>
  ```

- Іконки

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">Пошук: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Пошук</span>
  </button>
</form>
```

<!-- <common-codepen-snippet title="Functional Images" slug="jOyLGqM" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

## Стандарти {#standards}

Консорціум Всесвітньої павутини (W3C) Ініціатива веб-доступності (WAI) розробляє стандарти вебдоступності для різних компонентів:

- [Гід з доступності програм користувача (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - веббраузери та медіаплеєри, включаючи деякі аспекти допоміжних технологій
- [Гід з доступності засобів розробки авторського контенту (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - засоби розробки
- [Гід з доступності вебвмісту (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - вебвміст - використовуваному розробниками, програмами для створення вебсторінок та інструментів для оцінки доступності

### Гід з доступності веб-вмісту (WCAG) {#web-content accessibility-guidelines-wcag}

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) поширюється на [WCAG 2.0](https://www.w3.org/TR/WCAG20/) і дозволяє впроваджувати нові технології, враховуючи зміни в Інтернеті. W3C заохочує використання найновішої версії WCAG під час розробки або оновлення політик вебдоступності.

#### WCAG 2.1 Чотири основні керівні принципи (скорочено POUR): {#wcag-2.1-four-main-guiding-principles-abbreviated-as-pour}

- [Сприйнятливість](https://www.w3.org/TR/WCAG21/#perceivable)
  - Подана інформація має бути доступною для всіх користувачів
- [Керованість](https://www.w3.org/TR/WCAG21/#operable)
  - Компоненти інтерфейсу, елементи керування та навігації підтримують керування з клавіатури
- [Зрозумілість](https://www.w3.org/TR/WCAG21/#understandable)
  - Інформація та функціонування інтерфейсу мають бути зрозумілі всім користувачам
- [Надійність](https://www.w3.org/TR/WCAG21/#robust)
  - Робочий доступ до інформації незалежно від технології використовуваної користувачами

#### Ініціатива веб-доступності – Доступні багаті Інтернет-додатки (WAI-ARIA) {#web-accessibility-initiative-accessible-rich-internet-applications-wai-aria}

W3C's WAI-ARIA надає вказівки щодо створення динамічного вмісту та розширених елементів керування інтерфейсу користувача.

- [Доступні багаті Інтернет-додатки (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Авторська практика 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## Ресурси {#resources}

### Документація {#documentation}

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [Доступні багаті Інтернет-додатки (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Авторська практика 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### Допоміжні технології {#assistive-technologies}

- Програми для читання екрану
  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
- Програми для збільшення/зменшення області перегляду
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.zoomtext.com/)
  - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### Тестування {#testing}

- Автоматизовані інструменти
  - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- Інструменти для роботи з кольором
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- Інші корисні інструменти
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en…)
  - [Color Oracle](https://colororacle.org)
  - [Focus Indicator](https://chrome.google.com/webstore/detail/focus-indicator/heeoeadndnhebmfebjccbhmccmaoedlf?hl=en-US…)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US…)
  - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=en-US)
  - [Silktide Website Accessibility Simulator](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

### Користувачі {#users}

Згідно з Всесвітньою організацією охорони здоров'я, 15% населення світу має будь-яку форму інвалідності, 2-4% з них — важку форму. За оцінками ВООЗ, у світі налічується приблизно 1 мільярд інвалідів, що робить їх найбільшою групою меншин у світі.

Існує дуже багато інвалідностей, які можна розділити на чотири категорії:

- _[Візуальні](https://webaim.org/articles/visual/)_ - Таким користувачам можуть допомогти програми для читання з екрана, збільшення екрану, керування контрастністю екрана або дисплей Брайля..
- _[Слухові](https://webaim.org/articles/auditory/)_ - Таким користувачам можуть допомогти субтитри, розшифровки або відео з мовою жестів.
- _[Рухові](https://webaim.org/articles/motor/)_ - Таким користувачам можуть допомогти різні [допоміжні технології при рухових порушеннях](https://webaim.org/articles/motor/assistive): програми для розпізнавання голосу, відстеження очей, пристрої для простого керування, головні щуп-указки, пристрої для керування вказівником миші без рук, безрозмірні трекбол-миші, сенсорні клавіатури та інші допоміжні технології.
- _[Когнітивні](https://webaim.org/articles/cognitive/)_ - Таким користувачам можуть допомогти додаткові медіа, структурована організація вмісту, зрозумілий та простий стиль написання..

Перегляньте наступні посилання з WebAim для розуміння проблеми з боку користувачів:

- [Перспективи вебдоступності: досліди впливу і переваг для кожного](https://www.w3.org/WAI/perspective-videos/)
- [Історії вебкористувачів](https://www.w3.org/WAI/people-use-web/user-stories/)
