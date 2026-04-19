---
footer: false
---

# Giriş {#introduction}

:::info Vue 3 belgelerini okuyorsunuz!

- Vue 2 desteği **31 Aralık 2023** tarihinde sona erdi. [Vue 2 EOL](https://v2.vuejs.org/eol/) hakkında daha fazla bilgi edinin.
- Vue 2’den mi yükseltiyorsunuz? [Geçiş Kılavuzu](https://v3-migration.vuejs.org/)na göz atın.
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description"><span>VueMastery.com</span> üzerindeki video eğitimleriyle Vue’yu öğrenin</p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery logosu" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Vue nedir? {#what-is-vue}

Vue (/vjuː/ olarak okunur, **view** ile kafiye yapar), kullanıcı arayüzleri oluşturmak için bir JavaScript çatısıdır. Standart HTML, CSS ve JavaScript üzerine kurulur; her karmaşıklıkta kullanıcı arayüzlerini verimli şekilde geliştirmenize yardımcı olan bildirime dayalı, bileşen tabanlı bir programlama modeli sunar.

İşte minimal bir örnek:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Sayı: {{ count }}
  </button>
</div>
```

**Sonuç**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Sayı: {{ count }}
  </button>
</div>

Yukarıdaki örnek Vue’nun iki temel özelliğini gösterir:

- **Bildirime dayalı işleme**: Vue, JavaScript durumuna dayalı HTML çıktısını bildirimsel olarak tanımlamanıza izin veren bir şablon sözdizimiyle standart HTML’i genişletir.

- **Reaktivite**: Vue, JavaScript durumundaki değişiklikleri otomatik izler ve değişiklikler olduğunda DOM’u verimli şekilde günceller.

Henüz sorularınız olabilir — endişelenmeyin. Belgenin geri kalanında her ayrıntıyı ele alacağız. Şimdilik Vue’nun ne sunduğuna dair üst düzey bir anlayış edinmek için okumaya devam edin.

:::tip Ön koşullar
Belgenin geri kalanı HTML, CSS ve JavaScript’e temel düzeyde aşinalık varsayar. Ön uç geliştirmeye tamamen yeniyseniz, ilk adımınız olarak doğrudan bir çatıya atlamak en iyi fikir olmayabilir — önce temelleri kavrayıp sonra geri dönün! Gerekirse bilginizi [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) ve [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) için bu özetlerle kontrol edebilirsiniz. Diğer çatılarda deneyim yardımcı olur ancak zorunlu değildir.
:::

## İlerici çatı {#the-progressive-framework}

Vue, ön uç geliştirmede gereken yaygın özelliklerin çoğunu kapsayan bir çatı ve ekosistemdir. Ancak web son derece çeşitlidir — web üzerinde ürettiğimiz şeyler biçim ve ölçek olarak büyük farklılık gösterebilir. Bu düşünceyle Vue, esnek ve aşamalı olarak benimsenebilir olacak şekilde tasarlanmıştır. Kullanım senaryonuza bağlı olarak Vue farklı şekillerde kullanılabilir:

- Derleme adımı olmadan statik HTML’i geliştirmek
- Herhangi bir sayfada Web Bileşenleri olarak gömme
- Tek Sayfa Uygulaması (SPA)
- Fullstack / sunucu taraflı işleme (SSR)
- Jamstack / statik site üretimi (SSG)
- Masaüstü, mobil, WebGL ve hatta terminali hedefleme

Bu kavramlar gözünüzü korkutuyorsa endişelenmeyin! Öğretici ve kılavuz yalnızca temel HTML ve JavaScript bilgisi gerektirir; bunların hiçbirinde uzman olmadan takip edebilmelisiniz.

Vue’yu yığınınıza nasıl en iyi entegre edeceğinizi merak eden deneyimli bir geliştiriciyseniz veya bu terimlerin ne anlama geldiğini öğrenmek istiyorsanız, [Vue’yu Kullanma Şekilleri](/guide/extras/ways-of-using-vue) bölümünde daha ayrıntılı ele alıyoruz.

Esneklik ne olursa olsun, Vue’nun nasıl çalıştığına dair temel bilgi tüm bu kullanım durumlarında ortaktır. Şu an yeni başlıyor olsanız bile, yol boyunca edindiğiniz bilgi ileride daha iddialı hedeflere yöneldiğinizde de işinize yarar. Deneyimliyseniz, çözmeye çalıştığınız sorunlara göre Vue’yu en uygun şekilde kullanmayı seçebilir, aynı verimliliği koruyabilirsiniz. Bu yüzden Vue’ya “İlerici Çatı” diyoruz: sizinle birlikte büyüyen ve ihtiyaçlarınıza uyum sağlayan bir çatı.

## Tek dosya bileşenleri {#single-file-components}

Çoğu derleme aracı etkin Vue projesinde, Vue bileşenlerini **Tek Dosya Bileşeni** (aynı zamanda `*.vue` dosyaları, kısaca **SFC**) adı verilen HTML benzeri bir dosya biçiminde yazarız. Adından da anlaşılacağı gibi bir Vue SFC, bileşenin mantığını (JavaScript), şablonunu (HTML) ve stillerini (CSS) tek dosyada kapsüller. İşte önceki örnek, SFC biçiminde:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Sayı: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Sayı: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC, Vue’nun belirleyici bir özelliğidir ve **eğer** kullanım senaryonuz bir derleme kurulumunu gerektiriyorsa Vue bileşenleri yazmanın önerilen yoludur. [SFC’nin nasıl ve neden](/guide/scaling-up/sfc) olduğunu ayrı bir bölümde daha fazla öğrenebilirsiniz — şimdilik Vue’nun tüm derleme aracı kurulumunu sizin için halledeceğini bilmeniz yeterli.

## API stilleri {#api-styles}

Vue bileşenleri iki farklı API stiliyle yazılabilir: **Options API** ve **Composition API**.

### Options API {#options-api}

Options API ile bileşen mantığını `data`, `methods`, `mounted` gibi seçeneklerden oluşan bir nesne ile tanımlarız. Seçeneklerle tanımlanan özellikler, fonksiyonların içinde `this` ile erişilen bileşen örneğinde açığa çıkar:

```vue
<script>
export default {
  // data() ile dönen özellikler reaktif durum olur
  // ve `this` üzerinde açığa çıkar.
  data() {
    return {
      count: 0
    }
  },

  // methods, durumu değiştiren ve güncellemeleri tetikleyen fonksiyonlardır.
  // Şablonda olay işleyicisi olarak bağlanabilirler.
  methods: {
    increment() {
      this.count++
    }
  },

  // Yaşam döngüsü kancaları bileşen yaşam döngüsünün farklı aşamalarında çağrılır.
  // Bu fonksiyon bileşen takıldığında çağrılır.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Sayı: {{ count }}</button>
</template>
```

[Playground’da deneyin](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

Composition API ile bileşen mantığını içe aktarılan API fonksiyonlarıyla tanımlarız. SFC’lerde Composition API genellikle [`<script setup>`](/api/sfc-script-setup) ile kullanılır. `setup` özniteliği, Composition API’yi daha az kalıpla kullanmamızı sağlayan derleme zamanı dönüşümlerinin yapılması için Vue’ya bir ipucudur; örneğin `<script setup>` içinde içe aktarılanlar ve üst düzeyde tanımlanan değişkenler/fonksiyonlar şablonda doğrudan kullanılabilir.

İşte aynı bileşen, aynı şablonla, ancak Composition API ve `<script setup>` kullanılarak:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reaktif durum
const count = ref(0)

// durumu değiştiren ve güncellemeleri tetikleyen fonksiyonlar
function increment() {
  count.value++
}

// yaşam döngüsü kancaları
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Sayı: {{ count }}</button>
</template>
```

[Playground’da deneyin](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### Hangisini seçmeli? {#which-to-choose}

Her iki API stili de yaygın kullanım durumlarını tamamen karşılayabilir. Aynı altyapıyı güçlendiren farklı arayüzlerdir. Üstelik Options API, Composition API’nin üzerinde uygulanır! Temel kavramlar ve Vue bilgisi iki stil arasında paylaşılır.

Options API, “bileşen örneği” (`this`) kavramı etrafında döner ve OOP geçmişinden gelen kullanıcılar için sınıf tabanlı zihinsel modele genelde daha uyumludur. Reaktivite ayrıntılarını soyutlayıp kodu seçenek gruplarıyla düzenleyerek yeni başlayanlar için de daha anlaşılırdır.

Composition API, reaktif durum değişkenlerini doğrudan bir fonksiyon kapsamında tanımlamayı ve karmaşıklığı yönetmek için birden fazla fonksiyondan durumu bir araya getirmeyi merkeze alır. Daha serbest biçimlidir ve etkili kullanım için Vue’da reaktivitenin nasıl çalıştığını anlamayı gerektirir; karşılığında mantığı düzenlemek ve yeniden kullanmak için daha güçlü kalıplar sağlar.

İki stil arasındaki karşılaştırma ve Composition API’nin olası faydaları hakkında daha fazlası için [Composition API SSS](/guide/extras/composition-api-faq) bölümüne bakın.

Vue’ya yeniyseniz genel önerimiz:

- Öğrenirken, size daha kolay gelen stille ilerleyin. Çoğu temel kavram iki stil arasında ortaktır. Diğer stili her zaman sonra öğrenebilirsiniz.

- Üretimde:

  - Derleme aracı kullanmıyorsanız veya Vue’yu çoğunlukla düşük karmaşıklık senaryolarında (ör. aşamalı iyileştirme) kullanacaksanız Options API ile gidin.

  - Vue ile tam uygulamalar geliştirecekseniz Composition API + Tek Dosya Bileşeni ile gidin.

Öğrenme aşamasında yalnızca bir stile bağlı kalmak zorunda değilsiniz. Belgenin geri kalanı, uygun olduğunda her iki stilde kod örnekleri sunar; sol kenar çubuğunun üstündeki **API tercihi** anahtarlarıyla istediğiniz zaman aralarında geçiş yapabilirsiniz.

## Hâlâ sorularınız mı var? {#still-got-questions}

[SSS](/about/faq) sayfamıza göz atın.

## Öğrenme yolunuzu seçin {#pick-your-learning-path}

Geliştiricilerin öğrenme biçimleri farklıdır. Tercihinize uygun bir yol seçmekte özgürsünüz — mümkünse tüm içeriği gözden geçirmenizi yine de öneririz!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Öğreticiyi deneyin</p>
    <p class="next-steps-caption">Uygulamalı öğrenmeyi sevenler için.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Kılavuzu okuyun</p>
    <p class="next-steps-caption">Kılavuz, çatının her yönünü ayrıntılı şekilde anlatır.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Örneklere göz atın</p>
    <p class="next-steps-caption">Temel özellikler ve yaygın arayüz görevleri için örnekleri keşfedin.</p>
  </a>
</div>
